import type { Metadata } from "next";
import Image from "next/image";
import { projects, siteUrl } from "@/lib/site-data";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "مشاريع أمنية منفذة" : "Security Projects and Case Studies",
    description:
      locale === "ar"
        ? "دراسات حالة توضح النتائج التشغيلية مع صور ومخرجات قابلة للقياس."
        : "Case studies with real outcomes, implementation notes, and technical proof assets.",
    alternates: {
      canonical: `${siteUrl}/${locale}/projects`,
      languages: {
        en: `${siteUrl}/en/projects`,
        ar: `${siteUrl}/ar/projects`,
      },
    },
  };
}

export default function ProjectsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "المشاريع" : "Projects"}</h1>
        <p>
          {locale === "ar"
            ? "نماذج مشاريع حقيقية مع شرح موجز للأثر التشغيلي بعد التنفيذ."
            : "Real installations with concise impact summaries and commissioning outcomes."}
        </p>
      </section>
      <section className="cards-grid">
        {projects.map((project) => (
          <article key={project.slug} className="card">
            <Image src={project.image} alt={project.title[locale]} width={920} height={500} sizes="(max-width: 880px) 98vw, 47vw" />
            <h2>{project.title[locale]}</h2>
            <p>{project.outcome[locale]}</p>
            <ul>
              <li>{locale === "ar" ? "قبل: تغطية غير متوازنة" : "Before: uneven camera coverage"}</li>
              <li>{locale === "ar" ? "بعد: تغطية محسنة وتقارير أوضح" : "After: optimized coverage and clearer reporting"}</li>
              <li>{locale === "ar" ? "فحص تشغيل موثق" : "Documented commissioning checklist"}</li>
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
