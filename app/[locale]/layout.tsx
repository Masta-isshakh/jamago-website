import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return <SiteShell locale={params.locale as Locale}>{children}</SiteShell>;
}
