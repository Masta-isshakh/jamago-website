import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { siteUrl } from "@/lib/site-data";
import { media } from "@/lib/media";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

const RetentionCalculator = dynamic(
  () => import("@/components/RetentionCalculator").then((module) => module.RetentionCalculator),
  {
    ssr: false,
    loading: () => <section className="card">Loading calculator...</section>,
  },
);

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "دليل اعتماد MOI للأنظمة الأمنية" : "MOI Approval and Compliance Guide",
    description:
      locale === "ar"
        ? "مركز امتثال يشرح الموافقات، المستندات، الفحص، وعقود الصيانة لأنظمة CCTV في الدوحة."
        : "Compliance center covering approvals, documentation, inspection readiness, and maintenance contracts.",
    alternates: {
      canonical: `${siteUrl}/${locale}/moi-approval`,
      languages: {
        en: `${siteUrl}/en/moi-approval`,
        ar: `${siteUrl}/ar/moi-approval`,
      },
    },
  };
}

export default function MoiApprovalPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <section className="page-head card">
        <h1>{locale === "ar" ? "مركز الالتزام واعتماد MOI" : "MOI Compliance Center"}</h1>
        <p>
          {locale === "ar"
            ? "شرح عملي لما يلزم قبل التركيب وأثناء الفحص وبعد التسليم مع روابط للصفحات القطاعية."
            : "Practical guidance for pre-installation requirements, inspection readiness, and post-handover maintenance."}
        </p>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "مسار التنفيذ" : "Implementation funnel"}</h2>
        <Image src={media.controlRoom} alt="Implementation and camera planning diagram" width={980} height={420} sizes="(max-width: 880px) 98vw, 68vw" />
        <ol>
          <li>{locale === "ar" ? "معاينة الموقع وتحليل المخاطر" : "Site survey and risk mapping"}</li>
          <li>{locale === "ar" ? "إعداد المخططات والمواصفات" : "Technical layout and specification file"}</li>
          <li>{locale === "ar" ? "توريد وتركيب واختبار" : "Supply, installation, and commissioning"}</li>
          <li>{locale === "ar" ? "التسليم والتدريب" : "Handover and operator training"}</li>
          <li>{locale === "ar" ? "تشغيل عقد الصيانة السنوي" : "AMC maintenance activation"}</li>
        </ol>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "نماذج قطاعات جاهزة" : "Sector checklist templates"}</h2>
        <div className="chips">
          <Link href={withLocale(locale, "/industries/hotels-residential-complexes")}>Hotels & Residential</Link>
          <Link href={withLocale(locale, "/industries/banks-exchange-gold-shops")}>Banks & Exchange</Link>
          <Link href={withLocale(locale, "/industries/shopping-entertainment-centers")}>Shopping & Entertainment</Link>
          <Link href={withLocale(locale, "/industries/hospitals-clinics")}>Hospitals & Clinics</Link>
          <Link href={withLocale(locale, "/industries/warehouses-hazardous-precious-stores")}>Warehouses</Link>
          <Link href={withLocale(locale, "/industries/fuel-stations")}>Fuel Stations</Link>
        </div>
      </section>

      <section className="card">
        <h2>{locale === "ar" ? "تحميل قوائم الفحص" : "Download compliance checklists"}</h2>
        <div className="chips">
          <a href="/checklists/moi-cctv-checklist-en.txt" download>
            MOI CCTV Checklist (EN)
          </a>
          <a href="/checklists/moi-cctv-checklist-ar.txt" download>
            قائمة جاهزية CCTV (AR)
          </a>
        </div>
      </section>

      <RetentionCalculator locale={locale} />

      <section className="card">
        <h2>{locale === "ar" ? "ملاحظات قانونية ومهنية" : "Compliance and legal notes"}</h2>
        <ul>
          <li>
            {locale === "ar"
              ? "يجب أن تتوافق جميع الادعاءات الخاصة بالاعتماد والترخيص مع البيانات الرسمية المعلنة."
              : "All claims about approval and licensing must match official published records."}
          </li>
          <li>
            {locale === "ar"
              ? "لا نستخدم روابط أو ممارسات مخالفة لإرشادات محركات البحث."
              : "No manipulative link schemes are used; authority is built through real project assets."}
          </li>
          <li>
            {locale === "ar"
              ? "يتم تحديث هذه الصفحة دوريا عند صدور تعليمات جديدة."
              : "This page is maintained and refreshed as regulations and guidance evolve."}
          </li>
          <li>
            {locale === "ar"
              ? "مرجع قانوني: قانون رقم 9 لسنة 2011 المتعلق بتنظيم استخدام كاميرات وأجهزة المراقبة الأمنية."
              : "Legal reference: Law No. 9 of 2011 regulating the use of security and surveillance devices."}
          </li>
        </ul>
        <div className="chips">
          <a href="https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/securitysystems" target="_blank" rel="noreferrer">
            MOI Security Systems Department
          </a>
          <a href="https://www.almeezan.qa/LawArticles.aspx?LawTreeSectionID=9916&language=en&lawId=2660" target="_blank" rel="noreferrer">
            Law No. 9 of 2011
          </a>
        </div>
      </section>
    </>
  );
}
