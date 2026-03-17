"use client";

import { useState } from "react";

type QuoteWizardProps = {
  locale: "en" | "ar";
};

export function QuoteWizard({ locale }: QuoteWizardProps) {
  const [step, setStep] = useState(1);

  const copy =
    locale === "ar"
      ? {
          title: "طلب عرض سعر",
          next: "التالي",
          back: "السابق",
          submit: "إرسال",
          done: "تم استلام طلبك. سنتواصل معك خلال 24 ساعة.",
        }
      : {
          title: "Request a Quote",
          next: "Next",
          back: "Back",
          submit: "Submit",
          done: "Your request has been received. We will contact you within 24 hours.",
        };

  return (
    <section className="card wizard">
      <h2>{copy.title}</h2>
      {step <= 4 ? (
        <>
          <div className="wizard-step">Step {step} / 4</div>
          {step === 1 && (
            <label>
              {locale === "ar" ? "نوع العقار" : "Property type"}
              <select>
                <option>{locale === "ar" ? "فيلا" : "Villa"}</option>
                <option>{locale === "ar" ? "متجر" : "Shop"}</option>
                <option>{locale === "ar" ? "مستودع" : "Warehouse"}</option>
                <option>{locale === "ar" ? "مكتب" : "Office"}</option>
              </select>
            </label>
          )}
          {step === 2 && (
            <label>
              {locale === "ar" ? "المناطق المطلوبة للمراقبة" : "Areas to cover"}
              <textarea rows={4} placeholder={locale === "ar" ? "مداخل، مواقف، مخازن..." : "Entrances, parking, stock rooms..."} />
            </label>
          )}
          {step === 3 && (
            <label>
              {locale === "ar" ? "المتطلبات النظامية" : "Compliance requirements"}
              <select>
                <option>{locale === "ar" ? "MOI موافقة جديدة" : "New MOI approval"}</option>
                <option>{locale === "ar" ? "تجديد وصيانة" : "Renewal and maintenance"}</option>
                <option>{locale === "ar" ? "غير متأكد" : "Not sure"}</option>
              </select>
            </label>
          )}
          {step === 4 && (
            <label>
              {locale === "ar" ? "بيانات التواصل" : "Contact details"}
              <input type="text" placeholder={locale === "ar" ? "الاسم ورقم الجوال" : "Name and mobile number"} />
            </label>
          )}
          <div className="wizard-actions">
            <button type="button" onClick={() => setStep((value) => Math.max(1, value - 1))}>
              {copy.back}
            </button>
            {step < 4 ? (
              <button type="button" onClick={() => setStep((value) => Math.min(4, value + 1))}>
                {copy.next}
              </button>
            ) : (
              <button type="button" onClick={() => setStep(5)}>
                {copy.submit}
              </button>
            )}
          </div>
        </>
      ) : (
        <p>{copy.done}</p>
      )}
    </section>
  );
}
