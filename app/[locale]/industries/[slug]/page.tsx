import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getIndustryBySlug, industries, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => industries.map((industry) => ({ locale, slug: industry.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};

  return {
    title: `${industry.name[locale]} | MOI-Oriented Security Scope`,
    description: industry.typicalLayout[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/industries/${industry.slug}`,
      languages: {
        en: `${siteUrl}/en/industries/${industry.slug}`,
        ar: `${siteUrl}/ar/industries/${industry.slug}`,
      },
    },
  };
}

export default function IndustryDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const industry = getIndustryBySlug(params.slug);

  if (!industry) notFound();

  return (
    <>
      <section className="page-head card">
        <h1>{industry.name[locale]}</h1>
        <p>{industry.typicalLayout[locale]}</p>
        <Image src={media.warehouse} alt={industry.name[locale]} width={1100} height={560} sizes="(max-width: 880px) 98vw, 74vw" />
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "قائمة الفحص" : "Sector checklist"}</h2>
        <ul>
          {industry.checklist.map((item) => (
            <li key={item[locale]}>{item[locale]}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "العناصر المطلوبة في العرض الفني" : "What to include in your technical proposal"}</h2>
        <ol>
          <li>{locale === "ar" ? "مخطط توزيع الكاميرات ونقاط الدخول" : "Camera and access point placement map"}</li>
          <li>{locale === "ar" ? "مواصفات الأجهزة وسعة التخزين" : "Device specifications and retention storage scope"}</li>
          <li>{locale === "ar" ? "خطة الصيانة والاستجابة للأعطال" : "Maintenance response and SLA plan"}</li>
        </ol>
      </section>
    </>
  );
}
