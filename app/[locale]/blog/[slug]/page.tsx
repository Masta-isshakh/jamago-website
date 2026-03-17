import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, blogPosts, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const post = getBlogBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title[locale]} | Jamago Blog`,
    description: post.description[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${post.slug}`,
      languages: {
        en: `${siteUrl}/en/blog/${post.slug}`,
        ar: `${siteUrl}/ar/blog/${post.slug}`,
      },
    },
  };
}

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const post = getBlogBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="card article">
      <p className="eyebrow">{post.date}</p>
      <h1>{post.title[locale]}</h1>
      <Image src={media.engineer} alt={post.title[locale]} width={1200} height={650} sizes="(max-width: 880px) 98vw, 76vw" />
      <p>{post.description[locale]}</p>
      {post.body.map((paragraph) => (
        <p key={paragraph[locale]}>{paragraph[locale]}</p>
      ))}
      <p className="muted">
        {locale === "ar"
          ? "كتب بواسطة مهندس أنظمة أمنية - تمت المراجعة من مدير مشاريع."
          : "Written by Security Systems Engineer - reviewed by Project Delivery Manager."}
      </p>
    </article>
  );
}
