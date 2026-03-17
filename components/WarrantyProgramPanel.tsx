"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Locale } from "@/lib/i18n";

type WarrantyProgramPanelProps = {
  locale: Locale;
};

type WarrantyRequestItem = {
  id: string;
  requestReference: string;
  warrantyId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyMonths: number;
  installationAddress?: string;
  notes?: string;
  startDate: string;
  endDate: string;
  status?: "NEW" | "REVIEWED" | "APPROVED" | "REJECTED" | "FULFILLED";
  emailDeliveryStatus?: "PENDING" | "SENT" | "FAILED";
  resendEmail?: boolean;
  adminNotes?: string;
  createdAt?: string;
};

type WarrantyCardItem = {
  id: string;
  warrantyId: string;
  requestReference: string;
  productName: string;
  serialNumber: string;
  startDate: string;
  endDate: string;
  status?: "ACTIVE" | "EXPIRED" | "VOID";
  emailDeliveryStatus?: "PENDING" | "SENT" | "FAILED";
  lastStatusCheckAt?: string;
  createdAt?: string;
};

type PublicView = "menu" | "request" | "check";

type RequestFormState = {
  fullName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyMonths: string;
  installationAddress: string;
  notes: string;
};

const requestStatuses: Array<NonNullable<WarrantyRequestItem["status"]>> = [
  "NEW",
  "REVIEWED",
  "APPROVED",
  "REJECTED",
  "FULFILLED",
];

const cardStatuses: Array<NonNullable<WarrantyCardItem["status"]>> = ["ACTIVE", "EXPIRED", "VOID"];

function addMonths(dateIso: string, months: number) {
  const date = new Date(dateIso);
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result.toISOString().slice(0, 10);
}

function generateRequestReference() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `WR-${stamp}-${rand}`;
}

function generateWarrantyId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `JW-${Date.now().toString(36).toUpperCase()}-${rand}`;
}

function getCardStatus(endDate: string): NonNullable<WarrantyCardItem["status"]> {
  const now = new Date();
  const end = new Date(endDate);
  return end.getTime() >= now.getTime() ? "ACTIVE" : "EXPIRED";
}

export function WarrantyProgramPanel({ locale }: WarrantyProgramPanelProps) {
  const client = useMemo(() => generateClient<any>(), []);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [publicView, setPublicView] = useState<PublicView>("menu");
  const [requestState, setRequestState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [requestError, setRequestError] = useState("");
  const [createdWarrantyId, setCreatedWarrantyId] = useState("");
  const [createdRequestReference, setCreatedRequestReference] = useState("");
  const [checkWarrantyId, setCheckWarrantyId] = useState("");
  const [checkResult, setCheckResult] = useState<WarrantyCardItem | null>(null);
  const [checkState, setCheckState] = useState<"idle" | "checking" | "not_found" | "found">("idle");
  const [checkError, setCheckError] = useState("");

  const [requests, setRequests] = useState<WarrantyRequestItem[]>([]);
  const [cards, setCards] = useState<WarrantyCardItem[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);

  const [form, setForm] = useState<RequestFormState>({
    fullName: "",
    phoneNumber: "",
    email: "",
    productName: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyMonths: "12",
    installationAddress: "",
    notes: "",
  });

  const copy =
    locale === "ar"
      ? {
          title: "برنامج الضمان",
          subtitle: "طلب بطاقة ضمان جديدة أو التحقق من صلاحية الضمان باستخدام رقم الضمان.",
          requestNew: "طلب بطاقة ضمان جديدة",
          checkValidity: "تحقق من صلاحية الضمان",
          back: "رجوع",
          submit: "إرسال طلب الضمان",
          submitting: "جاري الإرسال...",
          fullName: "الاسم الكامل",
          phoneNumber: "رقم الهاتف",
          email: "البريد الإلكتروني",
          productName: "اسم المنتج",
          serialNumber: "الرقم التسلسلي",
          purchaseDate: "تاريخ الشراء",
          warrantyMonths: "مدة الضمان (بالأشهر)",
          installationAddress: "عنوان التركيب",
          notes: "ملاحظات",
          warrantyIdLabel: "رقم الضمان",
          checkBtn: "تحقق",
          notFound: "لم يتم العثور على بطاقة ضمان بهذا الرقم.",
          adminPanel: "لوحة إدارة الضمان",
          requestList: "طلبات بطاقات الضمان",
          cardList: "بطاقات الضمان",
          requestReference: "مرجع الطلب",
          status: "الحالة",
          emailStatus: "حالة البريد",
          startDate: "تاريخ البداية",
          endDate: "تاريخ النهاية",
          extendOneYear: "تمديد سنة",
          markEmailSent: "تأكيد إرسال البريد",
          emailReady: "تم إنشاء رقم الضمان. سيتم إرسال البريد الإلكتروني تلقائيًا بعد ربط خدمة SES.",
          resendEmailBtn: "إعادة إرسال البريد",
          valid: "الضمان ساري",
          expired: "الضمان منتهي",
          void: "الضمان ملغي",
          manageHint: "يمكنك إدارة الحالة، تواريخ الصلاحية، وحالة إرسال البريد من هذه الصفحة.",
        }
      : {
          title: "Warranty Program",
          subtitle:
            "Request a new warranty card or verify an existing warranty by entering your warranty ID.",
          requestNew: "Request New Warranty Card",
          checkValidity: "Check Warranty Validity",
          back: "Back",
          submit: "Submit Warranty Request",
          submitting: "Submitting...",
          fullName: "Full Name",
          phoneNumber: "Phone Number",
          email: "Email Address",
          productName: "Product Name",
          serialNumber: "Serial Number",
          purchaseDate: "Purchase Date",
          warrantyMonths: "Warranty Period (Months)",
          installationAddress: "Installation Address",
          notes: "Notes",
          warrantyIdLabel: "Warranty ID",
          checkBtn: "Check",
          notFound: "No warranty card found with this ID.",
          adminPanel: "Warranty Admin Panel",
          requestList: "Warranty Requests",
          cardList: "Warranty Cards",
          requestReference: "Request Reference",
          status: "Status",
          emailStatus: "Email Status",
          startDate: "Start Date",
          endDate: "End Date",
          extendOneYear: "Extend +12 Months",
          markEmailSent: "Mark Email as Sent",
          emailReady:
            "Warranty ID has been generated. Email delivery is ready once AWS SES sender identity is configured.",
          resendEmailBtn: "Resend Email",
          valid: "Warranty is Active",
          expired: "Warranty has Expired",
          void: "Warranty is Void",
          manageHint: "You can manage status, validity dates, and email-delivery state directly from this page.",
        };

  const loadAdminData = useCallback(async () => {
    setAdminLoading(true);
    try {
      const [requestRes, cardRes] = await Promise.all([
        client.models.WarrantyRequest.list({ limit: 500 }),
        client.models.WarrantyCard.list({ limit: 500 }),
      ]);

      const sortedRequests = [...(requestRes.data as WarrantyRequestItem[])].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });

      const sortedCards = [...(cardRes.data as WarrantyCardItem[])].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });

      setRequests(sortedRequests);
      setCards(sortedCards);
    } finally {
      setAdminLoading(false);
    }
  }, [client]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.accessToken?.payload?.["cognito:groups"] as string[] | undefined) ?? [];
        const admin = groups.includes("ADMIN");
        if (!mounted) return;
        setIsAdmin(admin);
        if (admin) {
          await loadAdminData();
        }
      } catch {
        if (!mounted) return;
        setIsAdmin(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [loadAdminData]);

  const onChangeForm = <K extends keyof RequestFormState>(key: K, value: RequestFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitWarrantyRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("submitting");
    setRequestError("");
    setCreatedWarrantyId("");
    setCreatedRequestReference("");

    try {
      const warrantyMonths = Number(form.warrantyMonths);
      if (!Number.isFinite(warrantyMonths) || warrantyMonths < 1) {
        throw new Error("Warranty period must be at least 1 month.");
      }
      if (!form.purchaseDate) {
        throw new Error("Purchase date is required.");
      }

      const requestReference = generateRequestReference();
      const warrantyId = generateWarrantyId();
      const startDate = form.purchaseDate;
      const endDate = addMonths(form.purchaseDate, warrantyMonths);
      const cardStatus = getCardStatus(endDate);

      await client.models.WarrantyRequest.create(
        {
          requestReference,
          warrantyId,
          fullName: form.fullName.trim(),
          phoneNumber: form.phoneNumber.trim(),
          email: form.email.trim(),
          productName: form.productName.trim(),
          serialNumber: form.serialNumber.trim(),
          purchaseDate: form.purchaseDate,
          warrantyMonths,
          installationAddress: form.installationAddress.trim() || undefined,
          notes: form.notes.trim() || undefined,
          startDate,
          endDate,
          status: "NEW",
          emailDeliveryStatus: "PENDING",
        },
        { authMode: "apiKey" } as any,
      );

      await client.models.WarrantyCard.create(
        {
          warrantyId,
          requestReference,
          productName: form.productName.trim(),
          serialNumber: form.serialNumber.trim(),
          startDate,
          endDate,
          status: cardStatus,
          emailDeliveryStatus: "PENDING",
          lastStatusCheckAt: new Date().toISOString(),
        },
        { authMode: "apiKey" } as any,
      );

      setCreatedWarrantyId(warrantyId);
      setCreatedRequestReference(requestReference);
      setRequestState("success");
      setForm({
        fullName: "",
        phoneNumber: "",
        email: "",
        productName: "",
        serialNumber: "",
        purchaseDate: "",
        warrantyMonths: "12",
        installationAddress: "",
        notes: "",
      });

      if (isAdmin) {
        await loadAdminData();
      }
    } catch (error: any) {
      setRequestError(error?.message || "Unable to submit warranty request.");
      setRequestState("error");
    }
  };

  const checkWarranty = async () => {
    setCheckState("checking");
    setCheckError("");
    setCheckResult(null);

    try {
      const trimmed = checkWarrantyId.trim();
      if (!trimmed) {
        throw new Error("Please enter a valid warranty ID.");
      }

      const { data } = await client.models.WarrantyCard.list(
        {
          filter: {
            warrantyId: {
              eq: trimmed,
            },
          },
          limit: 1,
        },
        { authMode: "apiKey" } as any,
      );

      if (!data.length) {
        setCheckState("not_found");
        return;
      }

      const card = data[0] as WarrantyCardItem;
      const normalizedStatus = getCardStatus(card.endDate);

      if (normalizedStatus !== card.status) {
        try {
          await client.models.WarrantyCard.update(
            {
              id: card.id,
              status: normalizedStatus,
              lastStatusCheckAt: new Date().toISOString(),
            },
            isAdmin ? undefined : ({ authMode: "apiKey" } as any),
          );
          card.status = normalizedStatus;
        } catch {
          // Ignore update failures for public checks.
        }
      }

      setCheckResult(card);
      setCheckState("found");
    } catch (error: any) {
      setCheckError(error?.message || "Unable to verify warranty at the moment.");
      setCheckState("idle");
    }
  };

  const updateRequestStatus = async (id: string, status: NonNullable<WarrantyRequestItem["status"]>) => {
    await client.models.WarrantyRequest.update({ id, status } as any);
    await loadAdminData();
  };

  const updateCardStatus = async (id: string, status: NonNullable<WarrantyCardItem["status"]>) => {
    await client.models.WarrantyCard.update({ id, status, lastStatusCheckAt: new Date().toISOString() } as any);
    await loadAdminData();
  };

  const markEmailSent = async (request: WarrantyRequestItem) => {
    await client.models.WarrantyRequest.update({
      id: request.id,
      emailDeliveryStatus: "SENT",
      status: request.status === "NEW" ? "REVIEWED" : request.status,
    } as any);

    const matching = cards.find((card) => card.requestReference === request.requestReference);
    if (matching) {
      await client.models.WarrantyCard.update({
        id: matching.id,
        emailDeliveryStatus: "SENT",
        lastStatusCheckAt: new Date().toISOString(),
      } as any);
    }

    await loadAdminData();
  };

  const resendEmail = async (request: WarrantyRequestItem) => {
    await client.models.WarrantyRequest.update({
      id: request.id,
      resendEmail: true,
      emailDeliveryStatus: "PENDING",
    } as any);
    await loadAdminData();
  };

  const extendCardOneYear = async (card: WarrantyCardItem) => {
    const newEndDate = addMonths(card.endDate, 12);
    await client.models.WarrantyCard.update({
      id: card.id,
      endDate: newEndDate,
      status: "ACTIVE",
      lastStatusCheckAt: new Date().toISOString(),
    } as any);

    const relatedRequest = requests.find((item) => item.requestReference === card.requestReference);
    if (relatedRequest) {
      await client.models.WarrantyRequest.update({
        id: relatedRequest.id,
        endDate: newEndDate,
      } as any);
    }

    await loadAdminData();
  };

  return (
    <section className="card warranty-program-card">
      <div className="warranty-head">
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </div>

      {!isAdmin ? (
        <div className="warranty-public-zone">
          {publicView === "menu" ? (
            <div className="warranty-option-grid">
              <button type="button" className="warranty-option-tile" onClick={() => setPublicView("request")}>
                <strong>{copy.requestNew}</strong>
                <span>{locale === "ar" ? "إنشاء رقم ضمان ومتابعته بسهولة" : "Get a generated warranty ID and start tracking instantly"}</span>
              </button>
              <button type="button" className="warranty-option-tile" onClick={() => setPublicView("check")}>
                <strong>{copy.checkValidity}</strong>
                <span>{locale === "ar" ? "أدخل رقم الضمان لمعرفة الصلاحية الحالية" : "Enter warranty ID to verify current status and expiry"}</span>
              </button>
            </div>
          ) : null}

          {publicView === "request" ? (
            <div className="warranty-flow-block">
              <button type="button" className="warranty-back-btn" onClick={() => setPublicView("menu")}>
                {copy.back}
              </button>

              <form className="warranty-form" onSubmit={submitWarrantyRequest}>
                <div className="warranty-form-grid">
                  <label>
                    <span>{copy.fullName}</span>
                    <input required value={form.fullName} onChange={(event) => onChangeForm("fullName", event.target.value)} />
                  </label>

                  <label>
                    <span>{copy.phoneNumber}</span>
                    <input required value={form.phoneNumber} onChange={(event) => onChangeForm("phoneNumber", event.target.value)} />
                  </label>

                  <label>
                    <span>{copy.email}</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => onChangeForm("email", event.target.value)}
                    />
                  </label>

                  <label>
                    <span>{copy.productName}</span>
                    <input required value={form.productName} onChange={(event) => onChangeForm("productName", event.target.value)} />
                  </label>

                  <label>
                    <span>{copy.serialNumber}</span>
                    <input required value={form.serialNumber} onChange={(event) => onChangeForm("serialNumber", event.target.value)} />
                  </label>

                  <label>
                    <span>{copy.purchaseDate}</span>
                    <input
                      type="date"
                      required
                      value={form.purchaseDate}
                      onChange={(event) => onChangeForm("purchaseDate", event.target.value)}
                    />
                  </label>

                  <label>
                    <span>{copy.warrantyMonths}</span>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      required
                      value={form.warrantyMonths}
                      onChange={(event) => onChangeForm("warrantyMonths", event.target.value)}
                    />
                  </label>

                  <label>
                    <span>{copy.installationAddress}</span>
                    <input value={form.installationAddress} onChange={(event) => onChangeForm("installationAddress", event.target.value)} />
                  </label>
                </div>

                <label>
                  <span>{copy.notes}</span>
                  <textarea rows={3} value={form.notes} onChange={(event) => onChangeForm("notes", event.target.value)} />
                </label>

                <button type="submit" className="warranty-submit-btn" disabled={requestState === "submitting"}>
                  {requestState === "submitting" ? copy.submitting : copy.submit}
                </button>

                {requestState === "success" ? (
                  <div className="warranty-feedback success">
                    <strong>{copy.warrantyIdLabel}: {createdWarrantyId}</strong>
                    <p>{copy.requestReference}: {createdRequestReference}</p>
                    <p>{copy.emailReady}</p>
                  </div>
                ) : null}

                {requestState === "error" ? <div className="warranty-feedback error">{requestError}</div> : null}
              </form>
            </div>
          ) : null}

          {publicView === "check" ? (
            <div className="warranty-flow-block">
              <button type="button" className="warranty-back-btn" onClick={() => setPublicView("menu")}>
                {copy.back}
              </button>

              <div className="warranty-check-wrap">
                <label>
                  <span>{copy.warrantyIdLabel}</span>
                  <input value={checkWarrantyId} onChange={(event) => setCheckWarrantyId(event.target.value.toUpperCase())} placeholder="JW-..." />
                </label>
                <button type="button" className="warranty-submit-btn" onClick={checkWarranty} disabled={checkState === "checking"}>
                  {checkState === "checking" ? "..." : copy.checkBtn}
                </button>

                {checkState === "not_found" ? <div className="warranty-feedback error">{copy.notFound}</div> : null}
                {checkError ? <div className="warranty-feedback error">{checkError}</div> : null}

                {checkState === "found" && checkResult ? (
                  <div className="warranty-check-result">
                    <h3>{copy.warrantyIdLabel}: {checkResult.warrantyId}</h3>
                    <p><strong>{copy.startDate}:</strong> {checkResult.startDate}</p>
                    <p><strong>{copy.endDate}:</strong> {checkResult.endDate}</p>
                    <p>
                      <strong>{copy.status}:</strong>{" "}
                      {checkResult.status === "ACTIVE" ? copy.valid : checkResult.status === "EXPIRED" ? copy.expired : copy.void}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="warranty-admin-zone">
          <div className="warranty-admin-head">
            <h2>{copy.adminPanel}</h2>
            <p>{copy.manageHint}</p>
          </div>

          {adminLoading ? <p>Loading...</p> : null}

          <div className="warranty-admin-grid">
            <article className="warranty-admin-card">
              <h3>{copy.requestList}</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{copy.requestReference}</th>
                      <th>{copy.warrantyIdLabel}</th>
                      <th>{locale === "ar" ? "العميل" : "Customer"}</th>
                      <th>{locale === "ar" ? "المنتج" : "Product"}</th>
                      <th>{copy.status}</th>
                      <th>{copy.emailStatus}</th>
                      <th>{locale === "ar" ? "إجراء" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.requestReference}</td>
                        <td>{request.warrantyId}</td>
                        <td>
                          <strong>{request.fullName}</strong>
                          <p className="muted">{request.email}</p>
                        </td>
                        <td>
                          <strong>{request.productName}</strong>
                          <p className="muted">SN: {request.serialNumber}</p>
                        </td>
                        <td>
                          <select
                            value={request.status ?? "NEW"}
                            onChange={(event) =>
                              updateRequestStatus(request.id, event.target.value as NonNullable<WarrantyRequestItem["status"]>)
                            }
                          >
                            {requestStatuses.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>{request.emailDeliveryStatus ?? "PENDING"}</td>
                        <td>
                          <div className="warranty-action-group">
                            <button type="button" onClick={() => markEmailSent(request)}>
                              {copy.markEmailSent}
                            </button>
                            <button
                              type="button"
                              className="warranty-resend-btn"
                              onClick={() => resendEmail(request)}
                            >
                              {copy.resendEmailBtn}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="warranty-admin-card">
              <h3>{copy.cardList}</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{copy.warrantyIdLabel}</th>
                      <th>{locale === "ar" ? "المنتج" : "Product"}</th>
                      <th>{copy.startDate}</th>
                      <th>{copy.endDate}</th>
                      <th>{copy.status}</th>
                      <th>{locale === "ar" ? "إجراء" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id}>
                        <td>{card.warrantyId}</td>
                        <td>
                          <strong>{card.productName}</strong>
                          <p className="muted">SN: {card.serialNumber}</p>
                        </td>
                        <td>{card.startDate}</td>
                        <td>{card.endDate}</td>
                        <td>
                          <select
                            value={card.status ?? "ACTIVE"}
                            onChange={(event) =>
                              updateCardStatus(card.id, event.target.value as NonNullable<WarrantyCardItem["status"]>)
                            }
                          >
                            {cardStatuses.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button type="button" onClick={() => extendCardOneYear(card)}>
                            {copy.extendOneYear}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
