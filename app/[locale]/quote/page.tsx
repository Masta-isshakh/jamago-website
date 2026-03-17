import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { siteUrl } from "@/lib/site-data";
import { isLocale, type Locale } from "@/lib/i18n";

const QuoteWizard = dynamic(
  () => import("@/components/QuoteWizard").then((module) => module.QuoteWizard),
  {
    ssr: false,
    loading: () => <section className="card">Loading form...</section>,
  },
);

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "طلب عرض سعر أنظمة أمنية" : "Request Security System Quote",
    description:
      locale === "ar"
        ? "ابدأ طلبك خطوة بخطوة: نوع العقار، مناطق التغطية، متطلبات الالتزام، وبيانات التواصل."
        : "Step-by-step quote request for property type, coverage areas, compliance needs, and contact details.",
    alternates: {
      canonical: `${siteUrl}/${locale}/quote`,
      languages: {
        en: `${siteUrl}/en/quote`,
        ar: `${siteUrl}/ar/quote`,
      },
    },
  };
}

export default function QuotePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "طلب عرض سعر" : "Get a Quote"}</h1>
        <p>
          {locale === "ar"
            ? "مسار واضح: معاينة، تصميم، مستندات، تركيب، اختبار، تسليم، وصيانة."
            : "Clear flow: survey, design, paperwork, installation, testing, handover, and maintenance."}
        </p>
      </section>
      <QuoteWizard locale={locale} />
      <section className="card timeline">
        <h2>{locale === "ar" ? "ماذا يحدث بعد إرسال الطلب؟" : "What happens next?"}</h2>
        <ol>
          <li>{locale === "ar" ? "تأكيد الطلب وتحديد موعد المعاينة" : "Request confirmation and survey scheduling"}</li>
          <li>{locale === "ar" ? "إعداد التصور الفني وعرض السعر" : "Technical design and quotation"}</li>
          <li>{locale === "ar" ? "تنفيذ التركيب والتشغيل" : "Installation and commissioning"}</li>
          <li>{locale === "ar" ? "التسليم وتفعيل عقد الصيانة" : "Handover and AMC activation"}</li>
        </ol>
      </section>
    </>
  );
}
