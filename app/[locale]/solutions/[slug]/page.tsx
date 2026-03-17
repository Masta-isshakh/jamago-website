import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { localIntentPages, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, locales, type Locale } from "@/lib/i18n";

const titles: Record<string, Record<Locale, string>> = {
  "cctv-installation-in-doha": {
    en: "CCTV Installation in Doha",
    ar: "تركيب CCTV في الدوحة",
  },
  "cctv-for-villa": {
    en: "CCTV for Villa",
    ar: "كاميرات مراقبة للفلل",
  },
  "cctv-for-shop": {
    en: "CCTV for Shop",
    ar: "كاميرات مراقبة للمتاجر",
  },
  "cctv-for-warehouse": {
    en: "CCTV for Warehouse",
    ar: "كاميرات مراقبة للمستودعات",
  },
  "access-control-for-office": {
    en: "Access Control for Office",
    ar: "التحكم بالدخول للمكاتب",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => localIntentPages.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const title = titles[params.slug]?.[locale];
  if (!title) return {};

  return {
    title: `${title} | Jamago Doha`,
    description:
      locale === "ar"
        ? "صفحة تفصيلية محلية تشمل نطاق العمل والزمن المتوقع وعوامل التسعير والأسئلة الشائعة."
        : "Local-intent page with scope, timelines, pricing drivers, and practical FAQs.",
    alternates: {
      canonical: `${siteUrl}/${locale}/solutions/${params.slug}`,
      languages: {
        en: `${siteUrl}/en/solutions/${params.slug}`,
        ar: `${siteUrl}/ar/solutions/${params.slug}`,
      },
    },
  };
}

export default function LocalIntentPage({ params }: { params: { locale: string; slug: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const title = titles[params.slug]?.[locale];

  if (!title) notFound();

  return (
    <>
      <section className="page-head card">
        <h1>{title}</h1>
        <p>
          {locale === "ar"
            ? "محتوى مخصص لاحتياج محلي فعلي، وليس صفحة مكررة: صور مرجعية، أحجام باقات، زمن التنفيذ، وعوامل التكلفة."
            : "Substantial local page with package sizes, implementation timing, pricing drivers, and practical FAQs."}
        </p>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "أحجام الباقات الشائعة" : "Typical package sizes"}</h2>
        <Image src={media.villa} alt={title} width={780} height={390} sizes="(max-width: 880px) 98vw, 62vw" />
        <ul>
          <li>{locale === "ar" ? "باقة صغيرة: 4-8 كاميرات" : "Small package: 4-8 cameras"}</li>
          <li>{locale === "ar" ? "باقة متوسطة: 9-24 كاميرا" : "Mid package: 9-24 cameras"}</li>
          <li>{locale === "ar" ? "باقة كبيرة: 25+ كاميرا مع غرفة تحكم" : "Large package: 25+ cameras with control room"}</li>
        </ul>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "عوامل التسعير" : "Pricing drivers"}</h2>
        <ul>
          <li>{locale === "ar" ? "نوع الكاميرات والعدسات" : "Camera and lens type"}</li>
          <li>{locale === "ar" ? "متطلبات التخزين وفترة الاحتفاظ" : "Storage retention requirements"}</li>
          <li>{locale === "ar" ? "التمديدات والبنية التحتية الحالية" : "Cabling and existing infrastructure state"}</li>
          <li>{locale === "ar" ? "مستوى التكامل مع الأنظمة الأخرى" : "Integration level with access/intercom/alarm"}</li>
        </ul>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "الجدول الزمني المعتاد" : "Typical timeline"}</h2>
        <ol>
          <li>{locale === "ar" ? "اليوم 1: المعاينة" : "Day 1: site survey"}</li>
          <li>{locale === "ar" ? "اليوم 2-3: التصميم والعرض" : "Day 2-3: design and quotation"}</li>
          <li>{locale === "ar" ? "اليوم 4-6: التركيب والاختبار" : "Day 4-6: installation and testing"}</li>
          <li>{locale === "ar" ? "اليوم 7: التسليم والتدريب" : "Day 7: handover and training"}</li>
        </ol>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "الأسئلة الشائعة" : "FAQs"}</h2>
        <article className="faq-item">
          <h3>{locale === "ar" ? "هل يشمل السعر التركيب؟" : "Does pricing include installation?"}</h3>
          <p>{locale === "ar" ? "نعم، مع تفاصيل واضحة في عرض السعر." : "Yes, with a clear installation scope in the quotation."}</p>
        </article>
        <article className="faq-item">
          <h3>{locale === "ar" ? "هل يمكن التوسع لاحقا؟" : "Can this be expanded later?"}</h3>
          <p>{locale === "ar" ? "نعم، يتم التخطيط للتوسع من البداية." : "Yes, expansion readiness is included in early design."}</p>
        </article>
      </section>
    </>
  );
}
