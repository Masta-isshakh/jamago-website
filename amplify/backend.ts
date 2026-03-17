import { defineBackend } from "@aws-amplify/backend";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { warrantyEmailFunction } from "./functions/warranty-email/resource.js";

const backend = defineBackend({
  auth,
  data,
  warrantyEmailFunction,
});

const warrantyRequestTable = backend.data.resources.tables["WarrantyRequest"];
const emailFn = backend.warrantyEmailFunction.resources.lambda;

warrantyRequestTable.grantStreamRead(emailFn);

emailFn.addEventSource(
  new DynamoEventSource(warrantyRequestTable, {
    startingPosition: StartingPosition.LATEST,
    batchSize: 5,
    retryAttempts: 2,
  }),
);

emailFn.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["ses:SendEmail", "ses:SendRawEmail"],
    resources: ["*"],
  }),
);
