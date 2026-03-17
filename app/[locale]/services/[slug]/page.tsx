import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SchemaScript } from "@/components/SchemaScript";
import { getServiceBySlug, siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  const serviceSlugs = [
    "cctv-installation",
    "cctv-maintenance-amc",
    "access-control-biometric",
    "video-intercom-door-phone",
    "intruder-alarm-systems",
    "gate-barriers-turnstiles",
    "structured-cabling-poe-network",
    "control-room-vms-analytics",
  ];

  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: `${service.name[locale]} | Jamago Doha`,
    description: service.summary[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/services/${service.slug}`,
      languages: {
        en: `${siteUrl}/en/services/${service.slug}`,
        ar: `${siteUrl}/ar/services/${service.slug}`,
      },
    },
    openGraph: {
      title: `${service.name[locale]} | Jamago Doha`,
      description: service.summary[locale],
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name[locale],
    description: service.summary[locale],
    provider: {
      "@type": "LocalBusiness",
      name: "Jamago Security Systems",
      areaServed: "Doha",
    },
    areaServed: "Doha",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/${locale}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name[locale],
        item: `${siteUrl}/${locale}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <section className="page-head card">
        <h1>{service.name[locale]}</h1>
        <p>{service.summary[locale]}</p>
        <Image src={media.controlRoom} alt={service.name[locale]} width={1200} height={620} sizes="(max-width: 880px) 98vw, 70vw" />
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "يشمل" : "What is included"}</h2>
        <ul>
          {service.inclusions.map((item) => (
            <li key={item[locale]}>{item[locale]}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "كيف ننفذ" : "Delivery timeline"}</h2>
        <ol>
          <li>{locale === "ar" ? "معاينة الموقع وتجميع المتطلبات" : "Site survey and requirement capture"}</li>
          <li>{locale === "ar" ? "تصميم المخطط واعتماده" : "Layout design and approval package"}</li>
          <li>{locale === "ar" ? "التركيب والتهيئة والاختبار" : "Installation, configuration, and testing"}</li>
          <li>{locale === "ar" ? "التسليم والتدريب وعقد الصيانة" : "Handover, training, and AMC activation"}</li>
        </ol>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions"}</h2>
        {service.faq.map((item) => (
          <article key={item.question[locale]} className="faq-item">
            <h3>{item.question[locale]}</h3>
            <p>{item.answer[locale]}</p>
          </article>
        ))}
      </section>

      <SchemaScript data={serviceSchema} />
      <SchemaScript data={faqSchema} />
      <SchemaScript data={breadcrumbSchema} />
    </>
  );
}
