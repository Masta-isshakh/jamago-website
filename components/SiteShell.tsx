"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { href: withLocale(locale), label: locale === "ar" ? "الرئيسية" : "Home" },
      { href: withLocale(locale, "/services"), label: nav.services },
      { href: withLocale(locale, "/products"), label: nav.products },
      { href: withLocale(locale, "/warranty-program"), label: nav.warranty },
      { href: withLocale(locale, "/moi-approval"), label: nav.moi },
      { href: withLocale(locale, "/industries"), label: nav.industries },
      { href: withLocale(locale, "/projects"), label: nav.projects },
      { href: withLocale(locale, "/blog"), label: nav.blog },
    ],
    [locale, nav.blog, nav.industries, nav.moi, nav.products, nav.projects, nav.services, nav.warranty],
  );

  // Close menu on route change and lock body scroll while open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const getNavLinkClassName = (href: string) => {
    const classes = ["site-nav-link"];
    if (pathname === href) {
      classes.push("is-active");
    }
    return classes.join(" ");
  };

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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={getNavLinkClassName(item.href)}>
                {item.label}
              </Link>
            ))}
            <AdminRequestsNavLink
              locale={locale}
              className="site-nav-link admin-requests-link"
              activeClassName="is-active"
              currentPath={pathname}
            />
          </nav>

          <div className="desktop-nav-actions">
            <Link href={withLocale(altLocale)} className="locale-switch">
              {localeLabel[altLocale]}
            </Link>
            <Link href={withLocale(locale, "/quote")} className="cta-link">
              {nav.quote}
            </Link>
          </div>

          <div className="mobile-nav">
            {/* Hamburger toggle */}
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="mobile-nav-toggle-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* Backdrop */}
            {mobileMenuOpen && (
              <div
                className="mobile-drawer-backdrop"
                aria-hidden="true"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Side drawer */}
            <div
              id="mobile-nav-drawer"
              className={`mobile-drawer${mobileMenuOpen ? " is-open" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "ar" ? "قائمة التنقل" : "Navigation menu"}
            >
              <div className="mobile-drawer-header">
                <Link href={withLocale(locale)} className="mobile-drawer-brand" onClick={() => setMobileMenuOpen(false)}>
                  <span className="mobile-drawer-brand-mark">J</span>
                </Link>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  aria-label={locale === "ar" ? "إغلاق" : "Close"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mobile-drawer-search-wrap">
                <input
                  className="mobile-drawer-search"
                  type="text"
                  placeholder={locale === "ar" ? "بحث" : "Search"}
                  aria-label={locale === "ar" ? "بحث" : "Search"}
                />
              </div>

              <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
                {navItems.map((item) => {
                  const hasChildren =
                    item.href === withLocale(locale, "/products") || item.href === withLocale(locale, "/services");
                  return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-drawer-link${pathname === item.href ? " is-active" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mobile-drawer-link-label">{item.label}</span>
                    {hasChildren ? <span className="mobile-drawer-link-arrow" aria-hidden="true">⌄</span> : null}
                  </Link>
                );})}
                <AdminRequestsNavLink
                  locale={locale}
                  className="mobile-drawer-link"
                  activeClassName="is-active"
                  currentPath={pathname}
                />
              </nav>

              <div className="mobile-drawer-footer">
                <Link
                  href="tel:+97455551234"
                  className="mobile-drawer-footer-link"
                >
                  <span className="mobile-drawer-footer-icon" aria-hidden="true">☎</span>
                  <span>{locale === "ar" ? "اتصال" : "Contact"}</span>
                </Link>
                <Link
                  href="mailto:info@jamago.qa"
                  className="mobile-drawer-footer-link"
                >
                  <span className="mobile-drawer-footer-icon" aria-hidden="true">✉</span>
                  <span>{locale === "ar" ? "البريد" : "Email"}</span>
                </Link>
                <Link
                  href={withLocale(locale, "/blog")}
                  className="mobile-drawer-footer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer-footer-icon" aria-hidden="true">?</span>
                  <span>FAQ</span>
                </Link>
              </div>
            </div>
          </div>
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
