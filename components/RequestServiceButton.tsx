"use client";

import { type FormEvent, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/data";

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
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

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
          currentLocation: "استخدام موقعي الحالي",
          buildingNumber: "رقم المبنى",
          notes: "ملاحظات إضافية",
          success: "تم إرسال الطلب بنجاح. سيتواصل معك فريقنا قريبًا.",
          error: "تعذر إرسال الطلب. حاول مرة أخرى.",
        }
      : {
          request: "Request",
          title: "Service Request",
          close: "Close",
          submit: "Submit Request",
          name: "Full Name",
          phone: "Phone Number",
          email: "Email (optional)",
          location: "Location",
          currentLocation: "Use my current location",
          buildingNumber: "Building Number",
          notes: "Additional notes",
          success: "Request submitted successfully. Our team will contact you soon.",
          error: "Unable to submit request. Please try again.",
        };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationLabel(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
      },
      () => {
        setLocationLabel("");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  const resetForm = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setBuildingNumber("");
    setNotes("");
    setLocationLabel("");
    setLatitude(null);
    setLongitude(null);
    setRequestState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("submitting");

    try {
      await client.models.ServiceRequest.create({
        serviceSlug,
        serviceName,
        fullName,
        phoneNumber,
        email: email || undefined,
        buildingNumber,
        locationLabel: locationLabel || undefined,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        notes: notes || undefined,
        status: "NEW",
      } as any);

      setRequestState("success");
      setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 1400);
    } catch {
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
            <div className="request-modal-head">
              <h3>{copy.title}</h3>
              <button type="button" onClick={() => { setOpen(false); resetForm(); }}>
                {copy.close}
              </button>
            </div>

            <form className="request-modal-form" onSubmit={handleSubmit}>
              <label>
                {copy.name}
                <input required value={fullName} onChange={(event) => setFullName(event.target.value)} />
              </label>

              <label>
                {copy.phone}
                <input required value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
              </label>

              <label>
                {copy.email}
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>

              <label>
                {copy.location}
                <div className="request-location-row">
                  <input value={locationLabel} onChange={(event) => setLocationLabel(event.target.value)} placeholder="Google map pin / coordinates" />
                  <button type="button" onClick={handleCurrentLocation}>
                    {copy.currentLocation}
                  </button>
                </div>
              </label>

              <label>
                {copy.buildingNumber}
                <input required value={buildingNumber} onChange={(event) => setBuildingNumber(event.target.value)} />
              </label>

              <label>
                {copy.notes}
                <textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
              </label>

              <button type="submit" className="service-request-submit" disabled={requestState === "submitting"}>
                {requestState === "submitting" ? "..." : copy.submit}
              </button>

              {requestState === "success" ? <p className="request-state success">{copy.success}</p> : null}
              {requestState === "error" ? <p className="request-state error">{copy.error}</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
