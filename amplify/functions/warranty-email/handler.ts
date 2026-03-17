import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

type WarrantyRequestImage = {
  id?: string;
  requestReference?: string;
  warrantyId?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  productName?: string;
  serialNumber?: string;
  purchaseDate?: string;
  warrantyMonths?: number;
  startDate?: string;
  endDate?: string;
  status?: "NEW" | "REVIEWED" | "APPROVED" | "REJECTED" | "FULFILLED";
  emailDeliveryStatus?: "PENDING" | "SENT" | "FAILED";
};

const ses = new SESv2Client({ region: process.env.AWS_REGION });

function parseDynamoImage(image: Record<string, any>): WarrantyRequestImage {
  const parseValue = (value: any): any => {
    if (!value || typeof value !== "object") return undefined;
    if ("S" in value) return value.S;
    if ("N" in value) return Number(value.N);
    if ("BOOL" in value) return value.BOOL;
    if ("NULL" in value) return null;
    return undefined;
  };

  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(image)) {
    out[key] = parseValue(value);
  }
  return out as WarrantyRequestImage;
}

async function sendWarrantyEmail(payload: WarrantyRequestImage) {
  const toAddress = payload.email;
  const fromAddress = process.env.WARRANTY_FROM_EMAIL;

  if (!toAddress || !fromAddress) {
    throw new Error("Missing email addresses for SES send.");
  }

  const subject = `Your Jamago Warranty ID: ${payload.warrantyId ?? "N/A"}`;
  const textBody = [
    `Hello ${payload.fullName ?? "Customer"},`,
    "",
    "Your warranty request has been received.",
    `Warranty ID: ${payload.warrantyId ?? "N/A"}`,
    `Request Reference: ${payload.requestReference ?? "N/A"}`,
    `Product: ${payload.productName ?? "N/A"}`,
    `Serial Number: ${payload.serialNumber ?? "N/A"}`,
    `Warranty Start Date: ${payload.startDate ?? "N/A"}`,
    `Warranty End Date: ${payload.endDate ?? "N/A"}`,
    "",
    "You can use this Warranty ID on the Warranty Program page to check validity anytime.",
    "",
    "Regards,",
    "Jamago Security Systems",
  ].join("\n");

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#10233f;max-width:620px;margin:auto;border:1px solid #dce7f4;border-radius:12px;padding:20px;background:#ffffff;">
      <h2 style="margin:0 0 12px 0;color:#0f4db3;">Jamago Warranty Confirmation</h2>
      <p>Hello ${payload.fullName ?? "Customer"},</p>
      <p>Your warranty request has been successfully received.</p>
      <table style="width:100%;border-collapse:collapse;margin:14px 0;">
        <tr><td style="padding:6px 0;font-weight:700;">Warranty ID</td><td style="padding:6px 0;">${payload.warrantyId ?? "N/A"}</td></tr>
        <tr><td style="padding:6px 0;font-weight:700;">Request Reference</td><td style="padding:6px 0;">${payload.requestReference ?? "N/A"}</td></tr>
        <tr><td style="padding:6px 0;font-weight:700;">Product</td><td style="padding:6px 0;">${payload.productName ?? "N/A"}</td></tr>
        <tr><td style="padding:6px 0;font-weight:700;">Serial Number</td><td style="padding:6px 0;">${payload.serialNumber ?? "N/A"}</td></tr>
        <tr><td style="padding:6px 0;font-weight:700;">Start Date</td><td style="padding:6px 0;">${payload.startDate ?? "N/A"}</td></tr>
        <tr><td style="padding:6px 0;font-weight:700;">End Date</td><td style="padding:6px 0;">${payload.endDate ?? "N/A"}</td></tr>
      </table>
      <p>Use your <strong>Warranty ID</strong> on the Warranty Program page to check validity at any time.</p>
      <p style="margin-top:20px;">Regards,<br/>Jamago Security Systems</p>
    </div>
  `;

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: fromAddress,
      Destination: {
        ToAddresses: [toAddress],
      },
      Content: {
        Simple: {
          Subject: { Data: subject },
          Body: {
            Text: { Data: textBody },
            Html: { Data: htmlBody },
          },
        },
      },
    }),
  );
}

export const handler = async (event: any) => {
  for (const record of event.Records) {
    if (record.eventName !== "INSERT" || !record.dynamodb?.NewImage) {
      continue;
    }

    const payload = parseDynamoImage(record.dynamodb.NewImage as Record<string, any>);
    if (!payload.id || !payload.warrantyId) {
      continue;
    }

    try {
      await sendWarrantyEmail(payload);
    } catch (error) {
      console.error("Warranty email pipeline error", error);
    }
  }
};
