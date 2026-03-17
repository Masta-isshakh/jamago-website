import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  ServiceRequest: a
    .model({
      serviceSlug: a.string().required(),
      serviceName: a.string().required(),
      fullName: a.string().required(),
      phoneNumber: a.string().required(),
      email: a.email(),
      locationLabel: a.string(),
      latitude: a.float(),
      longitude: a.float(),
      buildingNumber: a.string().required(),
      notes: a.string(),
      status: a.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"]),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["create"]),
      allow.group("ADMIN").to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
