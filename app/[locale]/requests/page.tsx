import type { Metadata } from "next";
import { AdminRequestsBoard } from "@/components/AdminRequestsBoard";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-data";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  return {
    title: locale === "ar" ? "إدارة الطلبات" : "Request Management",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/requests`,
    },
  };
}

export default function RequestsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  return <AdminRequestsBoard locale={locale} />;
}
