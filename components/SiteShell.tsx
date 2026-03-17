import Link from "next/link";
import type { ReactNode } from "react";
import { AdminRequestsNavLink } from "@/components/AdminRequestsNavLink";
import { HiddenLoginEntry } from "@/components/HiddenLoginEntry";
import { localeLabel, withLocale } from "@/lib/i18n";
import { navLabels } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const nav = navLabels[locale];
  const altLocale: Locale = locale === "en" ? "ar" : "en";

  return (
    <div className={`site-shell ${locale}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* ── NAVBAR ── */}
      <header className="top-nav" role="banner">
        <div className="top-nav-inner">
          <Link href={withLocale(locale)} className="brand">
            <span className="brand-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L4 5.5V11c0 4.97 3.44 9.32 8 10.93C16.56 20.32 20 15.97 20 11V5.5L12 2Z"
                  fill="rgba(255,255,255,0.18)"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="brand-text">
              <strong>Jamago Security</strong>
              <span>{locale === "ar" ? "أنظمة الأمن - الدوحة" : "CCTV & Security – Doha"}</span>
            </span>
          </Link>

          <nav aria-label="Primary navigation">
            <Link href={withLocale(locale)}>{locale === "ar" ? "الرئيسية" : "Home"}</Link>
            <Link href={withLocale(locale, "/services")}>{nav.services}</Link>
            <Link href={withLocale(locale, "/products")}>{nav.products}</Link>
            <Link href={withLocale(locale, "/warranty-program")}>{nav.warranty}</Link>
            <Link href={withLocale(locale, "/moi-approval")}>{nav.moi}</Link>
            <Link href={withLocale(locale, "/industries")}>{nav.industries}</Link>
            <Link href={withLocale(locale, "/projects")}>{nav.projects}</Link>
            <Link href={withLocale(locale, "/blog")}>{nav.blog}</Link>
            <AdminRequestsNavLink locale={locale} />
          </nav>

          <Link href={withLocale(altLocale)} className="locale-switch">
            {localeLabel[altLocale]}
          </Link>
          <Link href={withLocale(locale, "/quote")} className="cta-link">
            {nav.quote}
          </Link>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main>{children}</main>

      {/* ── FOOTER ── */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          {/* Brand column */}
          <div className="footer-brand">
            <strong>Jamago Security Systems</strong>
            <p>
              {locale === "ar"
                ? "توريد وتركيب وصيانة أنظمة الأمن في الدوحة مع دعم الالتزام بمتطلبات MOI."
                : "Security systems supply, installation, and maintenance in Doha with full MOI compliance support."}
            </p>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>{locale === "ar" ? "الخدمات" : "Services"}</h4>
            <Link href={withLocale(locale, "/services")}>{nav.services}</Link>
            <Link href={withLocale(locale, "/moi-approval")}>{nav.moi}</Link>
            <Link href={withLocale(locale, "/industries")}>{locale === "ar" ? "القطاعات" : "Industries"}</Link>
            <Link href={withLocale(locale, "/solutions/cctv-installation-in-doha")}>
              {locale === "ar" ? "تركيب CCTV في الدوحة" : "CCTV Installation Doha"}
            </Link>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4>{locale === "ar" ? "المنتجات" : "Products"}</h4>
            <Link href={withLocale(locale, "/products")}>{locale === "ar" ? "الكاميرات" : "IP Cameras"}</Link>
            <Link href={withLocale(locale, "/products")}>{locale === "ar" ? "التحكم بالدخول" : "Access Control"}</Link>
            <Link href={withLocale(locale, "/products")}>{locale === "ar" ? "الانتركوم" : "Intercom Systems"}</Link>
            <Link href={withLocale(locale, "/projects")}>{nav.projects}</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{locale === "ar" ? "تواصل معنا" : "Contact"}</h4>
            <p>Doha, Qatar</p>
            <a href="tel:+97455551234">+974 5555 1234</a>
            <a href="mailto:info@jamago.qa">info@jamago.qa</a>
            <a href="https://wa.me/97455551234">WhatsApp</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} Jamago Security Systems. All rights reserved.</p>
            <div className="footer-bottom-right">
              <p>
                {locale === "ar"
                  ? "شركة أنظمة أمن جاماغو – الدوحة، قطر"
                  : "Serving the Doha, Qatar security market."}
              </p>
              <HiddenLoginEntry locale={locale} />
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="mobile-sticky-cta">
        <a href="tel:+97455551234">{locale === "ar" ? "اتصل" : "Call"}</a>
        <a href="https://wa.me/97455551234">WhatsApp</a>
        <Link href={withLocale(locale, "/quote")}>{nav.quote}</Link>
      </div>
    </div>
  );
}
