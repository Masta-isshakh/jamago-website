import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SchemaScript } from "@/components/SchemaScript";
import { getProductBySlug, productCategories, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productCategories.map((category) => ({ locale, slug: category.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const category = getProductBySlug(params.slug);
  if (!category) return {};

  return {
    title: `${category.name[locale]} | Jamago Catalog`,
    description: category.summary[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${category.slug}`,
      languages: {
        en: `${siteUrl}/en/products/${category.slug}`,
        ar: `${siteUrl}/ar/products/${category.slug}`,
      },
    },
  };
}

export default function ProductCategoryPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const category = getProductBySlug(params.slug);

  if (!category) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: category.name[locale],
    description: category.summary[locale],
    brand: {
      "@type": "Brand",
      name: "Jamago Security",
    },
    category: "Security Systems",
  };

  return (
    <>
      <section className="page-head card">
        <h1>{category.name[locale]}</h1>
        <p>{category.summary[locale]}</p>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "قائمة المنتجات" : "Product list"}</h2>
        <Image src={media.cctvOutdoor} alt={category.name[locale]} width={780} height={380} sizes="(max-width: 880px) 98vw, 62vw" />
        <ul>
          {category.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "توصية التركيب" : "Recommended installation"}</h2>
        <p>{category.bestFor[locale]}</p>
        <p>
          {locale === "ar"
            ? "نوفر بدائل فنية حسب الميزانية واشتراطات الموقع ومتطلبات الصيانة."
            : "We provide practical alternatives by budget, site conditions, and maintenance requirements."}
        </p>
      </section>
      <section className="card">
        <h2>{locale === "ar" ? "FAQ تقني" : "Technical FAQ"}</h2>
        <article className="faq-item">
          <h3>{locale === "ar" ? "هل هذا مناسب للتركيب الخارجي؟" : "Is this suitable for outdoor use?"}</h3>
          <p>{locale === "ar" ? "يعتمد على تصنيف الحماية IP وحرارة الموقع." : "Depends on IP rating and site heat conditions."}</p>
        </article>
        <article className="faq-item">
          <h3>{locale === "ar" ? "هل يتوافق مع VMS؟" : "Is it VMS compatible?"}</h3>
          <p>{locale === "ar" ? "نحدد التوافق قبل التوريد ضمن ورقة المواصفات." : "Compatibility is confirmed before supply in the spec sheet."}</p>
        </article>
      </section>
      <SchemaScript data={productSchema} />
    </>
  );
}
