import { defineFunction } from "@aws-amplify/backend";

export const warrantyEmailFunction = defineFunction({
  name: "warranty-email-trigger",
  entry: "./handler.ts",
  timeoutSeconds: 30,
  memoryMB: 256,
  environment: {
    WARRANTY_FROM_EMAIL: "info@jamago.qa",
  },
});
