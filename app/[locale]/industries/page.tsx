import type { Metadata } from "next";
import Link from "next/link";
import { industries, siteUrl } from "@/lib/site-data";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "حلول الأنظمة الأمنية حسب القطاع" : "Sector Security Compliance Solutions",
    description:
      locale === "ar"
        ? "صفحات قطاعية للفنادق والبنوك والمراكز التجارية والمستشفيات والمستودعات ومحطات الوقود."
        : "Sector-specific compliance pages for hotels, banks, malls, healthcare, warehouses, and fuel stations.",
    alternates: {
      canonical: `${siteUrl}/${locale}/industries`,
      languages: {
        en: `${siteUrl}/en/industries`,
        ar: `${siteUrl}/ar/industries`,
      },
    },
  };
}

export default function IndustriesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "القطاعات" : "Industries"}</h1>
        <p>
          {locale === "ar"
            ? "قوائم فحص ومتطلبات ونماذج توزيع كاميرات لكل نوع نشاط."
            : "High-converting sector pages with checklists, layout patterns, and compliance-focused scope."}
        </p>
      </section>
      <section className="cards-grid">
        {industries.map((industry) => (
          <article key={industry.slug} className="card">
            <h2>{industry.name[locale]}</h2>
            <p>{industry.typicalLayout[locale]}</p>
            <ul>
              {industry.checklist.map((item) => (
                <li key={item[locale]}>{item[locale]}</li>
              ))}
            </ul>
            <Link href={withLocale(locale, `/industries/${industry.slug}`)} className="inline-link">
              {locale === "ar" ? "عرض الصفحة القطاعية" : "Open sector page"}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
