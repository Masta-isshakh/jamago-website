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
  WarrantyRequest: a
    .model({
      requestReference: a.string().required(),
      warrantyId: a.string().required(),
      fullName: a.string().required(),
      phoneNumber: a.string().required(),
      email: a.email().required(),
      productName: a.string().required(),
      serialNumber: a.string().required(),
      purchaseDate: a.date().required(),
      warrantyMonths: a.integer().required(),
      installationAddress: a.string(),
      notes: a.string(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      status: a.enum(["NEW", "REVIEWED", "APPROVED", "REJECTED", "FULFILLED"]),
      emailDeliveryStatus: a.enum(["PENDING", "SENT", "FAILED"]),
      adminNotes: a.string(),
      resendEmail: a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["create"]),
      allow.group("ADMIN").to(["create", "read", "update", "delete"]),
    ]),
  WarrantyCard: a
    .model({
      warrantyId: a.string().required(),
      requestReference: a.string().required(),
      productName: a.string().required(),
      serialNumber: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      status: a.enum(["ACTIVE", "EXPIRED", "VOID"]),
      emailDeliveryStatus: a.enum(["PENDING", "SENT", "FAILED"]),
      lastStatusCheckAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
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
