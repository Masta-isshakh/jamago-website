import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { comparisonTable, productCategories, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title:
      locale === "ar"
        ? "كتالوج منتجات الأمن والمراقبة"
        : "Security Product Catalog | CCTV, Access, Intercom",
    description:
      locale === "ar"
        ? "كتالوج منتجات قابل للزحف مع المقارنات والمواصفات والتوصيات حسب الاستخدام."
        : "Crawlable security product catalog with comparisons, specifications, and use-case recommendations.",
    alternates: {
      canonical: `${siteUrl}/${locale}/products`,
      languages: {
        en: `${siteUrl}/en/products`,
        ar: `${siteUrl}/ar/products`,
      },
    },
  };
}

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "كتالوج المنتجات الأمنية" : "Security Product Catalog"}</h1>
        <p>
          {locale === "ar"
            ? "تصنيف المنتجات حسب النوع والاستخدام مع ربط واضح بخدمات التركيب والصيانة."
            : "Category-first product architecture with clear links to installation and maintenance services."}
        </p>
      </section>

      <section className="cards-grid">
        {productCategories.map((category) => (
          <article key={category.slug} className="card">
            <Image src={media.cctvOutdoor} alt={category.name[locale]} width={560} height={300} sizes="(max-width: 880px) 98vw, 30vw" />
            <h2>{category.name[locale]}</h2>
            <p>{category.summary[locale]}</p>
            <p className="muted">{category.bestFor[locale]}</p>
            <ul>
              {category.items.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={withLocale(locale, `/products/${category.slug}`)} className="inline-link">
              {locale === "ar" ? "تفاصيل الفئة" : "View category details"}
            </Link>
          </article>
        ))}
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "مرشحات سريعة حسب الاستخدام" : "Quick filters by use-case"}</h2>
        <div className="chips">
          <a>{locale === "ar" ? "فيلا" : "Villa"}</a>
          <a>{locale === "ar" ? "متجر" : "Shop"}</a>
          <a>{locale === "ar" ? "مستودع" : "Warehouse"}</a>
          <a>{locale === "ar" ? "خارجي (حرارة/غبار)" : "Outdoor (heat/dust)"}</a>
        </div>
      </section>

      <section className="card content-grid">
        <article>
          <h2>{locale === "ar" ? "مخططات مواصفات فنية" : "Spec-sheet style technical block"}</h2>
          <p>
            {locale === "ar"
              ? "كتل مرئية للمواصفات تساعد العميل على اتخاذ القرار بسرعة دون تعقيد."
              : "Visual specification blocks to speed technical decision-making for buyers."}
          </p>
        </article>
        <Image src={media.accessControl} alt="Specification and coverage visual" width={620} height={340} sizes="(max-width: 880px) 98vw, 46vw" />
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "مقارنة سريعة: IP vs Analog" : "Quick Comparison: IP vs Analog"}</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{locale === "ar" ? "المعيار" : "Feature"}</th>
                <th>IP</th>
                <th>Analog</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.ip}</td>
                  <td>{row.analog}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
