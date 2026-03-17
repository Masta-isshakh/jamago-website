"use client";

import { type FormEvent, useCallback, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { MapPicker } from "./MapPicker";

type RequestServiceButtonProps = {
  locale: "en" | "ar";
  serviceSlug: string;
  serviceName: string;
};

type RequestState = "idle" | "submitting" | "success" | "error";

export function RequestServiceButton({ locale, serviceSlug, serviceName }: RequestServiceButtonProps) {
  const client = useMemo(() => generateClient<any>(), []);
  const [open, setOpen] = useState(false);
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const copy =
    locale === "ar"
      ? {
          request: "اطلب الخدمة",
          title: "طلب خدمة",
          close: "إغلاق",
          submit: "إرسال الطلب",
          name: "الاسم الكامل",
          phone: "رقم الهاتف",
          email: "البريد الإلكتروني (اختياري)",
          location: "الموقع",
          selectFromMap: "تحديد من الخريطة",
          buildingNumber: "رقم المبنى",
          notes: "ملاحظات إضافية",
          success: "تم إرسال الطلب بنجاح. سيتواصل معك فريقنا قريبًا.",
          error: "تعذر إرسال الطلب. حاول مرة أخرى.",
          pleaseWait: "جاري الإرسال...",
        }
      : {
          request: "Request Service",
          title: "Service Request Form",
          close: "Close",
          submit: "Submit Request",
          name: "Full Name",
          phone: "Phone Number",
          email: "Email (Optional)",
          location: "Location",
          selectFromMap: "Select from Map",
          buildingNumber: "Building Number",
          notes: "Additional Notes",
          success: "Request submitted successfully. Our team will contact you soon.",
          error: "Unable to submit request. Please try again.",
          pleaseWait: "Submitting...",
        };

  const resetForm = useCallback(() => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setBuildingNumber("");
    setNotes("");
    setLocationLabel("");
    setLatitude(null);
    setLongitude(null);
    setRequestState("idle");
    setErrorMessage("");
    setShowMap(false);
  }, []);

  const handleMapLocationSelect = useCallback((lat: number, lon: number, label: string) => {
    setLatitude(lat);
    setLongitude(lon);
    setLocationLabel(label);
    setShowMap(false);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("submitting");
    setErrorMessage("");

    try {
      // Validate required fields
      if (!fullName.trim()) {
        throw new Error("Full name is required");
      }
      if (!phoneNumber.trim()) {
        throw new Error("Phone number is required");
      }
      if (!buildingNumber.trim()) {
        throw new Error("Building number is required");
      }

      console.log("Submitting request with data:", {
        serviceSlug,
        serviceName,
        fullName,
        phoneNumber,
        email,
        buildingNumber,
        locationLabel,
        latitude,
        longitude,
        notes,
      });

      const response = await client.models.ServiceRequest.create(
        {
          serviceSlug,
          serviceName,
          fullName,
          phoneNumber,
          email: email.trim() || undefined,
          buildingNumber,
          locationLabel: locationLabel || undefined,
          latitude: latitude ?? undefined,
          longitude: longitude ?? undefined,
          notes: notes || undefined,
          status: "NEW",
        },
        {
          authorizationMode: "apiKey",
        } as any
      );

      console.log("Request created successfully:", response);
      setRequestState("success");
      setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 1400);
    } catch (error: any) {
      console.error("Submit error:", error);
      const msg = error?.message || error?.toString() || "Unknown error occurred";
      setErrorMessage(msg);
      setRequestState("error");
    }
  };

  return (
    <>
      <button type="button" className="service-request-btn" onClick={() => setOpen(true)}>
        {copy.request}
      </button>

      {open ? (
        <div className="request-modal-backdrop" role="dialog" aria-modal="true" aria-label={copy.title}>
          <div className="request-modal-card">
            <div className="request-modal-header">
              <div>
                <h2 className="request-modal-title">{copy.title}</h2>
                <p className="request-modal-subtitle">
                  {locale === "ar" ? "ملء النموذج أدناه لطلب الخدمة" : "Fill out the form below to request our service"}
                </p>
              </div>
              <button
                type="button"
                className="request-modal-close"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
              >
                {copy.close}
              </button>
            </div>

            {!showMap ? (
              <form className="request-modal-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-group">
                    <span className="form-label">{copy.name}</span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="form-input"
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">{copy.phone}</span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder={locale === "ar" ? "أدخل رقم الهاتف" : "Enter your phone number"}
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label className="form-group">
                    <span className="form-label">{copy.email}</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      className="form-input"
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">{copy.buildingNumber}</span>
                    <input
                      type="text"
                      required
                      value={buildingNumber}
                      onChange={(e) => setBuildingNumber(e.target.value)}
                      placeholder={locale === "ar" ? "أدخل رقم المبنى" : "Enter building number"}
                      className="form-input"
                    />
                  </label>
                </div>

                <label className="form-group full-width">
                  <span className="form-label">{copy.location}</span>
                  <div className="location-input-group">
                    <input
                      type="text"
                      value={locationLabel}
                      onChange={(e) => setLocationLabel(e.target.value)}
                      placeholder={locale === "ar" ? "الموقع أو الإحداثيات" : "Location or coordinates"}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="location-map-btn"
                    >
                      {copy.selectFromMap}
                    </button>
                  </div>
                  {latitude && longitude && (
                    <span className="location-display">
                      📍 {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </span>
                  )}
                </label>

                <label className="form-group full-width">
                  <span className="form-label">{copy.notes}</span>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={locale === "ar" ? "أضف ملاحظات إضافية" : "Add any additional notes"}
                    className="form-textarea"
                  />
                </label>

                <button type="submit" className="form-submit-btn" disabled={requestState === "submitting"}>
                  {requestState === "submitting" ? copy.pleaseWait : copy.submit}
                </button>

                {requestState === "success" && (
                  <div className="request-state success">
                    ✓ {copy.success}
                  </div>
                )}
                {requestState === "error" && (
                  <div className="request-state error">
                    ✕ {errorMessage || copy.error}
                  </div>
                )}
              </form>
            ) : (
              <div className="map-picker-wrapper">
                <MapPicker locale={locale} onLocationSelect={handleMapLocationSelect} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
