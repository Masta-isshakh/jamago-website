import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RequestServiceButton } from "@/components/RequestServiceButton";
import { SchemaScript } from "@/components/SchemaScript";
import { services, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const title =
    locale === "ar"
      ? "خدمات الأنظمة الأمنية في الدوحة"
      : "Security Installation Services in Doha";
  const description =
    locale === "ar"
      ? "تركيب CCTV، التحكم بالدخول، الانتركوم، الصيانة، وغرف التحكم مع دعم الالتزام."
      : "CCTV, access control, intercom, AMC maintenance, and control room services with compliance support.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/services`,
      languages: {
        en: `${siteUrl}/en/services`,
        ar: `${siteUrl}/ar/services`,
      },
    },
  };
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const isArabic = locale === "ar";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/${locale}/services` },
    ],
  };

  return (
    <>
      <section className="services-showcase" aria-label="Services showcase">
        <h1>{isArabic ? "خدماتنا" : "Our Services"}</h1>

        <div className="services-visual-wrap">
          <Image
            src={media.controlRoom}
            alt={isArabic ? "خلفية الخدمات" : "Services visual background"}
            fill
            sizes="(max-width: 880px) 98vw, 86vw"
            priority
            className="services-visual-bg"
          />
          <div className="services-visual-mask" />
        </div>

        <div className="services-overlay-grid">
          {services.map((service) => (
            <article key={service.slug} className="service-overlay-card">
              <div className="service-overlay-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18v12H3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M8 10h8M8 14h6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

              <Link href={withLocale(locale, `/services/${service.slug}`)} className="service-overlay-link">
                <h2>{service.name[locale]}</h2>
                <p>{service.summary[locale]}</p>
              </Link>

              <RequestServiceButton
                locale={locale}
                serviceSlug={service.slug}
                serviceName={service.name[locale]}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "لماذا هذا ليس محتوى تسويقي عام؟" : "Why this beats generic marketing pages"}</h2>
        <ul>
          <li>{locale === "ar" ? "خطوات تنفيذ واضحة من المعاينة حتى التسليم" : "Clear execution path from survey to handover"}</li>
          <li>{locale === "ar" ? "توصيات تقنية مرتبطة فعليا بنوع الموقع" : "Technical recommendations tied to real site types"}</li>
          <li>{locale === "ar" ? "أسئلة شائعة مرئية ومدعومة بترميز FAQ" : "Visible FAQs paired with valid FAQ schema"}</li>
        </ul>
      </section>
      <SchemaScript data={breadcrumbSchema} />
    </>
  );
}
