import type { Metadata } from "next";
import { WarrantyProgramPanel } from "@/components/WarrantyProgramPanel";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-data";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;

  return {
    title: locale === "ar" ? "برنامج الضمان" : "Warranty Program",
    description:
      locale === "ar"
        ? "طلب بطاقة ضمان جديدة والتحقق من صلاحيتها مع تتبع رقم الضمان."
        : "Request a new warranty card and verify warranty validity using a warranty ID.",
    alternates: {
      canonical: `${siteUrl}/${locale}/warranty-program`,
      languages: {
        en: `${siteUrl}/en/warranty-program`,
        ar: `${siteUrl}/ar/warranty-program`,
      },
    },
  };
}

export default function WarrantyProgramPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  return <WarrantyProgramPanel locale={locale} />;
}
