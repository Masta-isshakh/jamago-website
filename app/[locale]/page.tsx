import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScript } from "@/components/SchemaScript";
import { blogPosts, navLabels, projects, siteUrl } from "@/lib/site-data";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const title =
    locale === "ar"
      ? "انظمة الامن في الدوحة | توريد وتركيب وصيانة"
      : "Security Systems in Doha | Supply, Installation and Maintenance";
  const description =
    locale === "ar"
      ? "حلول CCTV والتحكم بالدخول والانتركوم مع دعم الالتزام ومتطلبات MOI في الدوحة."
      : "CCTV, access control, intercom, and maintenance contracts with MOI compliance support in Doha.";
  const canonical = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      siteName: "Jamago Security Systems",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-7 7 5.97 5.97 0 0 1-.5-.03c-3-.33-5.5-2.5-5.5-5.97" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function LocaleHome({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const nav = navLabels[locale];
  const ar = locale === "ar";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jamago Security Systems",
    url: `${siteUrl}/${locale}`,
    telephone: "+97455551234",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Doha",
      addressLocality: "Doha",
      addressCountry: "QA",
    },
    areaServed: "Doha",
    openingHours: "Sun-Thu 08:00-18:00",
    sameAs: [],
  };

  return (
    <>
      <section className="hero-sect hero-home" aria-label="Hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="eyebrow">{ar ? "خبرة في قطر منذ 2015" : "Trusted Security Partner - Doha, Qatar"}</span>
            <h1>{ar ? "حلول امنية فريدة وموثوقة في الدوحة" : "Unique & Trusted Security Solutions in Doha"}</h1>
            <p>
              {ar
                ? "توريد وتركيب وصيانة انظمة CCTV والتحكم بالدخول والانتركوم مع دعم متطلبات MOI."
                : "Supply, installation, and maintenance of CCTV, access control, and intercom systems with full MOI compliance support."}
            </p>
            <ul className="trust-bullets">
              {(ar
                ? [
                    "دعم الالتزام بمتطلبات MOI حسب القطاع",
                    "معاينة موقع خلال 24 ساعة",
                    "عقود صيانة سنوية مع SLA واضح",
                  ]
                : [
                    "MOI compliance support by sector",
                    "Site survey response within 24 hours",
                    "Annual maintenance contracts with defined SLA",
                  ]
              ).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="cta-row">
              <Link href={withLocale(locale, "/quote")} className="btn btn-primary">
                {nav.quote}
              </Link>
              <span className="play-cta">
                <span className="play-btn" aria-hidden="true" />
                {ar ? "كيف نعمل" : "How It Works"}
              </span>
            </div>
            <p className="trust-strip">
              {ar
                ? "شركاء تقنيون - ضمان سنتين - مشاريع منجزة في قطر"
                : "Technology partners - 2-year warranty - Proven projects across Qatar"}
            </p>
          </div>
        </div>
        <section className="feature-bar" aria-label="Core services quick view">
          <div className="feature-bar-grid">
            <div className="feature-item">
              <div className="feature-icon"><LockIcon /></div>
              <div className="feature-item-text">
                <h3>{ar ? "التحكم بالدخول" : "Access Control"}</h3>
                <p>{ar ? "انظمة تحكم بالدخول ببطاقات وبيومترية لكل الاحجام." : "Card and biometric access systems for every premises size."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><BellIcon /></div>
              <div className="feature-item-text">
                <h3>{ar ? "انظمة الانذار" : "Alarm Systems"}</h3>
                <p>{ar ? "حلول كشف الحرائق والانذار المبكر وحماية الموظفين." : "Fire detection, intruder alarms, and early-warning protection."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><CameraIcon /></div>
              <div className="feature-item-text">
                <h3>{ar ? "مراقبة CCTV" : "CCTV Surveillance"}</h3>
                <p>{ar ? "كاميرات IP بدقة عالية مع تسجيل مستمر وعرض عن بعد." : "High-definition IP cameras with continuous recording and remote viewing."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="section-white" aria-labelledby="services-heading">
        <div className="inner">
          <div className="section-head">
            <span className="eyebrow dark">{ar ? "شريكك الموثوق في قطر" : "A Trusted Partner For Security Around The Globe"}</span>
            <h2 id="services-heading">{ar ? "حماية اعمالك بحلولنا المتكاملة" : "Protect Your Business With Our Unique Solutions"}</h2>
            <p>{ar ? "خبرة متخصصة في تصميم وتنفيذ انظمة الامن لكل القطاعات." : "Specialized expertise in designing and deploying security systems for every sector."}</p>
          </div>

          <div className="service-cards">
            <article className="service-card">
              <div className="service-card-body">
                <div className="service-icon"><BuildingIcon /></div>
                <h3>{ar ? "امن الاعمال المتطور" : "Smarter Business Security"}</h3>
                <p>{ar ? "ربط تام بين الكاميرات والتحكم بالدخول لمراقبة شاملة واحترافية." : "Seamless integration of cameras and access control for comprehensive commercial protection."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
              <div className="service-card-img"><div className="service-card-img-placeholder">{ar ? "صورة الخدمة" : "Service image"}</div></div>
            </article>

            <article className="service-card">
              <div className="service-card-body">
                <div className="service-icon"><FlameIcon /></div>
                <h3>{ar ? "كشف الحريق والسلامة" : "Fire Detection & Life Safety"}</h3>
                <p>{ar ? "تصميم وتنفيذ انظمة انذار الحريق وسلامة الارواح بالمواصفات القطرية." : "Design and installation of fire alarm and life safety systems to Qatar Civil Defence specifications."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
              <div className="service-card-img"><div className="service-card-img-placeholder">{ar ? "صورة الخدمة" : "Service image"}</div></div>
            </article>

            <article className="service-card">
              <div className="service-card-body">
                <div className="service-icon"><HomeIcon /></div>
                <h3>{ar ? "الامن المنزلي الذكي" : "Smart Home Systems"}</h3>
                <p>{ar ? "كاميرات وانتركوم واقفال ذكية مع تحكم عن بعد وتنبيهات فورية." : "CCTV, intercom, and smart locks with remote access and real-time mobile alerts."}</p>
                <Link href={withLocale(locale, "/services")} className="read-more">{ar ? "اقرا المزيد" : "Read More"}</Link>
              </div>
              <div className="service-card-img"><div className="service-card-img-placeholder">{ar ? "صورة الخدمة" : "Service image"}</div></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-alt" aria-labelledby="efficiency-heading">
        <div className="inner">
          <div className="split-layout">
            <div className="split-text">
              <span className="eyebrow dark">{ar ? "قيمة حقيقية" : "Real Business Value"}</span>
              <h2 id="efficiency-heading">{ar ? "خفض التكاليف وزيادة كفاءة عملياتك" : "Reduce Cost And Increase Your Total Work Efficiency"}</h2>
              <p>{ar ? "الانظمة الامنية الحديثة لا تحمي فقط بل تحسن الكفاءة التشغيلية وتقلل الخسائر." : "Modern security does not only protect, it improves operational efficiency and reduces losses."}</p>
              <ul className="check-list">
                {(ar
                  ? [
                      "مراقبة على مدار الساعة مع تنبيهات فورية",
                      "سجلات دخول دقيقة لكل نقطة",
                      "تقارير وتحليلات بصرية متقدمة",
                      "دعم فني سريع مع SLA مضمون",
                    ]
                  : [
                      "24/7 live monitoring with instant alerts",
                      "Precise access logs at every entry point",
                      "Advanced analytics and visual reports",
                      "Fast technical support with guaranteed SLA",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={withLocale(locale, "/services")} className="btn btn-primary">{ar ? "كيف نعمل" : "How It Works"}</Link>
            </div>
            <div className="split-img-wrap">
              <div className="split-img-placeholder">{ar ? "ضع صورتك هنا" : "Your image here"}</div>
              <div className="split-img-accent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar" aria-label="Key metrics">
        <div className="stats-grid">
          <div className="stat-item"><strong>500+</strong><span>{ar ? "مشروع منجز" : "Projects Completed"}</span></div>
          <div className="stat-item"><strong>24h</strong><span>{ar ? "سرعة الاستجابة" : "Survey Response"}</span></div>
          <div className="stat-item"><strong>2Y</strong><span>{ar ? "ضمان الانظمة" : "System Warranty"}</span></div>
          <div className="stat-item"><strong>99.9%</strong><span>{ar ? "استمرارية المراقبة" : "Monitoring Uptime"}</span></div>
        </div>
      </section>

      <section className="section-white" aria-labelledby="testi-heading">
        <div className="inner">
          <div className="section-head">
            <span className="eyebrow dark">{ar ? "اراء عملائنا" : "What Our Clients Say"}</span>
            <h2 id="testi-heading">{ar ? "شركاء يثقون بنا" : "Clients Who Trust Jamago"}</h2>
          </div>
          <div className="testi-grid">
            <article className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p>{ar ? "فريق احترافي، واضح في التوصيات، والتسليم كان حسب الجدول مع تدريب ممتاز." : "Professional team, clear recommendations, and on-time delivery with solid operator training."}</p>
              <div className="testi-author"><div className="testi-avatar">C</div><div className="testi-author-info"><strong>{ar ? "مدير مرافق" : "Facility Manager"}</strong><span>{ar ? "مجمع سكني، الدوحة" : "Residential Complex, Doha"}</span></div></div>
            </article>
            <article className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p>{ar ? "التصميم الفني دقيق جدا وتحسنت الرؤية في النقاط الحساسة بشكل ملحوظ." : "The technical design was precise and significantly improved visibility at critical points."}</p>
              <div className="testi-author"><div className="testi-avatar">R</div><div className="testi-author-info"><strong>{ar ? "مدير عمليات" : "Operations Manager"}</strong><span>{ar ? "متجر تجزئة، الدوحة" : "Retail Store, Doha"}</span></div></div>
            </article>
            <article className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p>{ar ? "عقد الصيانة فعال والاستجابة للاعطال سريعة وموثقة." : "The maintenance contract is reliable with fast, documented response every single time."}</p>
              <div className="testi-author"><div className="testi-avatar">W</div><div className="testi-author-info"><strong>{ar ? "مشرف مستودع" : "Warehouse Supervisor"}</strong><span>{ar ? "مستودع لوجستي، الدوحة" : "Logistics Warehouse, Doha"}</span></div></div>
            </article>
          </div>
        </div>
      </section>

      <div className="partners-strip" aria-label="Trust badges">
        <div className="partners-inner">
          <span className="partner-label">{ar ? "موثوق به من قبل" : "Trusted by"}</span>
          <div className="partner-chips">
            {["Doha Projects", "ISO Practice", "2-Year Warranty", "AMC SLA", "MOI Ready"].map((label) => (
              <span key={label} className="partner-chip">{label}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="section-blue" aria-labelledby="checklist-heading">
        <div className="inner">
          <div className="checklist-layout">
            <div>
              <span className="eyebrow">{ar ? "نظام مراقبة شامل" : "Complete Surveillance System"}</span>
              <h2 id="checklist-heading">{ar ? "راقب كل شيء بمنظومة حماية متكاملة" : "Keep An Eye On Everything With Your Video Security"}</h2>
              <p>{ar ? "حلول امنية متكاملة تناسب المتاجر والمكاتب والمستودعات والفلل." : "Complete security solutions tailored for retail, offices, warehouses, and villas."}</p>
              <div className="check-2col">
                {(ar
                  ? [
                      "مراقبة امنية على مدار الساعة",
                      "اجهزة كشف الحريق والتنبيه",
                      "مراقبة منظومة الامن عن بعد",
                      "ذكاء اصطناعي وكشف الحركة",
                      "تحكم في الدخول بالبطاقة والبيومتري",
                      "تسجيل وحفظ الفيديو بجودة عالية",
                      "ضمان عمر التجهيزات مدى الحياة",
                      "حماية ميسورة التكلفة للجميع",
                    ]
                  : [
                      "Security Monitoring Equipment 24/7",
                      "Fire Detection and Alarm Systems",
                      "Live Stream From Any Mobile Device",
                      "Smart Motion Detection and AI Alerts",
                      "Card and Biometric Access Control",
                      "High-Definition Video Recording",
                      "Lifetime Equipment Warranty Available",
                      "Easy and Cost-Effective Protection",
                    ]
                ).map((item) => (
                  <div key={item} className="check-item">{item}</div>
                ))}
              </div>
            </div>
            <div className="checklist-img-placeholder">{ar ? "ضع صورتك هنا" : "Your image here"}</div>
          </div>
        </div>
      </section>

      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="cta-banner-inner">
          <div>
            <h2 id="cta-heading">{ar ? "من اجهزة الاستشعار الى تطبيقات الجوال والكاميرات نؤمن كل خدماتك" : "From Door and Window Sensors to Mobile Apps and Cameras, We Secure All Business Services"}</h2>
            <p>{ar ? "نقدم حلولا امنية متكاملة تناسب كل مشروع وكل ميزانية في قطر." : "End-to-end security tailored to every project size and budget across Qatar."}</p>
            <div className="cta-feature-grid">
              {(ar
                ? [
                    "تركيب CCTV داخلي وخارجي",
                    "تحكم بالدخول ببطاقات وبيومتري",
                    "صيانة سنوية مع استجابة مضمونة",
                    "دعم الالتزام بمتطلبات MOI",
                    "انتركوم وهاتف بوابة",
                    "تركيب جدار الحماية والشبكات",
                  ]
                : [
                    "Indoor and Outdoor CCTV Installation",
                    "Card and Biometric Access Control",
                    "Annual Maintenance with SLA",
                    "MOI Compliance Support",
                    "Intercom and Gate Phone Systems",
                    "Network and Infrastructure Setup",
                  ]
              ).map((item) => (
                <div key={item} className="cta-feature-item"><span className="cta-check" aria-hidden="true" />{item}</div>
              ))}
            </div>
            <div className="cta-row">
              <Link href={withLocale(locale, "/quote")} className="btn btn-primary">{ar ? "احصل على استشارة مجانية" : "Get a Free Consultation"}</Link>
              <a href="https://wa.me/97455551234" className="btn btn-ghost">WhatsApp</a>
            </div>
          </div>
          <div className="cta-banner-img"><div className="cta-banner-img-placeholder">{ar ? "ضع صورتك هنا" : "Your image here"}</div></div>
        </div>
      </section>

      <section className="section-alt" aria-labelledby="projects-heading">
        <div className="inner">
          <div className="section-head">
            <span className="eyebrow dark">{ar ? "اعمالنا المنجزة" : "Our Portfolio"}</span>
            <h2 id="projects-heading">{ar ? "مشاريع فعلية في الدوحة" : "Real Project Snapshots in Doha"}</h2>
          </div>
          <div className="cards-grid">
            {projects.map((project) => (
              <article key={project.slug} className="mini-card">
                <div style={{height:"190px",background:"var(--bg-1)",borderRadius:"10px",border:"1px dashed var(--line)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",fontSize:"0.8rem"}}>{ar ? "صورة المشروع" : "Project image"}</div>
                <h3>{project.title[locale]}</h3>
                <p>{project.outcome[locale]}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href={withLocale(locale, "/projects")} className="btn btn-primary">{ar ? "استعرض كل المشاريع" : "View All Projects"}</Link>
          </div>
        </div>
      </section>

      <section className="section-white" aria-label="Solution pages">
        <div className="inner">
          <div className="section-head">
            <span className="eyebrow dark">{ar ? "حلول محلية" : "Local Solutions"}</span>
            <h2>{ar ? "حلول لكل احتياج في الدوحة" : "Security Solutions For Every Need in Doha"}</h2>
          </div>
          <div className="chips" style={{ justifyContent: "center" }}>
            <Link href={withLocale(locale, "/solutions/cctv-installation-in-doha")}>CCTV Installation in Doha</Link>
            <Link href={withLocale(locale, "/solutions/cctv-for-villa")}>CCTV for Villa</Link>
            <Link href={withLocale(locale, "/solutions/cctv-for-shop")}>CCTV for Shop</Link>
            <Link href={withLocale(locale, "/solutions/cctv-for-warehouse")}>CCTV for Warehouse</Link>
            <Link href={withLocale(locale, "/solutions/access-control-for-office")}>Access Control for Office</Link>
          </div>
        </div>
      </section>

      <section className="section-alt" aria-labelledby="blog-heading">
        <div className="inner">
          <div className="section-head">
            <span className="eyebrow dark">{ar ? "مقالات ومحتوى تقني" : "Security Insights"}</span>
            <h2 id="blog-heading">{ar ? "اخر التحديثات والمقالات" : "Fresh Technical Content"}</h2>
          </div>
          <div className="cards-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={withLocale(locale, `/blog/${post.slug}`)} className="mini-card">
                <div style={{height:"160px",background:"var(--bg-1)",borderRadius:"10px",border:"1px dashed var(--line)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",fontSize:"0.8rem"}}>{ar ? "صورة المقالة" : "Post image"}</div>
                <h3>{post.title[locale]}</h3>
                <p>{post.description[locale]}</p>
                <span className="read-more">{ar ? "اقرا المزيد" : "Read More"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SchemaScript data={localBusinessSchema} />
    </>
  );
}
