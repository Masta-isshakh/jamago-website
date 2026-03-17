import { defineBackend } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Function as LambdaFunction,
  StartingPosition,
} from "aws-cdk-lib/aws-lambda";
import { DynamoEventSource, SqsDlq } from "aws-cdk-lib/aws-lambda-event-sources";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { warrantyEmailFunction } from "./functions/warranty-email/resource.js";

const backend = defineBackend({ auth, data, warrantyEmailFunction });

const warrantyRequestTable = backend.data.resources.tables["WarrantyRequest"];
const warrantyCardTable = backend.data.resources.tables["WarrantyCard"];

// Cast to concrete Function to access addEnvironment (IFunction interface omits it)
const emailFn = backend.warrantyEmailFunction.resources.lambda as unknown as LambdaFunction;

// Inject DynamoDB table names as Lambda environment variables
emailFn.addEnvironment("WARRANTY_REQUEST_TABLE", warrantyRequestTable.tableName);
emailFn.addEnvironment("WARRANTY_CARD_TABLE", warrantyCardTable.tableName);

// DDB stream read + write-back permissions for email status updates
warrantyRequestTable.grantStreamRead(emailFn);
warrantyRequestTable.grantWriteData(emailFn);
warrantyCardTable.grantReadWriteData(emailFn); // Scan by warrantyId + UpdateItem

// Dead-letter queue: captures events that exhaust all retry attempts
const customStack = backend.createStack("WarrantyEmailCustomResources");
const deadLetterQueue = new Queue(customStack, "WarrantyEmailDlq", {
  retentionPeriod: Duration.days(14),
});

emailFn.addEventSource(
  new DynamoEventSource(warrantyRequestTable, {
    startingPosition: StartingPosition.LATEST,
    batchSize: 5,
    retryAttempts: 3,
    bisectBatchOnError: true, // split failing batch in half to isolate bad record
    reportBatchItemFailures: true, // partial batch success
    onFailure: new SqsDlq(deadLetterQueue),
  }),
);

emailFn.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["ses:SendEmail", "ses:SendRawEmail"],
    resources: ["*"],
  }),
);

