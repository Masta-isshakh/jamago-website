"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type HiddenLoginEntryProps = {
  locale: Locale;
};

export function HiddenLoginEntry({ locale }: HiddenLoginEntryProps) {
  const pathname = usePathname();

  if (pathname === "/en" || pathname === "/ar") {
    return null;
  }

  return (
    <Link href={withLocale(locale, "/auth")} className="staff-login-link" aria-label="Staff login entry">
      Staff Login
    </Link>
  );
}
