import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, siteUrl } from "@/lib/site-data";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "مدونة الأمن والامتثال" : "Security and Compliance Blog",
    description:
      locale === "ar"
        ? "محتوى متجدد حول اعتماد MOI، التخزين، اختيار الكاميرات، والتصميم الفني."
        : "Fresh content on MOI approval, storage planning, camera selection, and technical design.",
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        ar: `${siteUrl}/ar/blog`,
      },
    },
  };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "المدونة" : "Blog"}</h1>
        <p>
          {locale === "ar"
            ? "مقالات عملية توضح قرارات التصميم والامتثال بعيدا عن النصوص التسويقية العامة."
            : "People-first technical guides that help buyers make design and compliance decisions."}
        </p>
      </section>
      <section className="cards-grid">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card">
            <h2>{post.title[locale]}</h2>
            <p>{post.description[locale]}</p>
            <p className="muted">{post.date}</p>
            <Link href={withLocale(locale, `/blog/${post.slug}`)} className="inline-link">
              {locale === "ar" ? "اقرأ المقال" : "Read article"}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
