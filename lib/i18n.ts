export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const localeLabel: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const withLocale = (locale: Locale, path = ""): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
};
