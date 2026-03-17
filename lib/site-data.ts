import type { Locale } from "./i18n";
import { media } from "./media";

export const siteUrl = "https://jamago.qa";

type LocalizedText = Record<Locale, string>;

type FAQ = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type Service = {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  inclusions: LocalizedText[];
  faq: FAQ[];
};

export type ProductCategory = {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  items: string[];
  bestFor: LocalizedText;
};

export type Industry = {
  slug: string;
  name: LocalizedText;
  checklist: LocalizedText[];
  typicalLayout: LocalizedText;
};

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  body: LocalizedText[];
};

export const navLabels: Record<
  Locale,
  {
    services: string;
    products: string;
    moi: string;
    industries: string;
    projects: string;
    blog: string;
    quote: string;
  }
> = {
  en: {
    services: "Services",
    products: "Products",
    moi: "MOI Approval",
    industries: "Industries",
    projects: "Projects",
    blog: "Blog",
    quote: "Get Quote",
  },
  ar: {
    services: "الخدمات",
    products: "المنتجات",
    moi: "اعتماد MOI",
    industries: "القطاعات",
    projects: "المشاريع",
    blog: "المدونة",
    quote: "طلب عرض سعر",
  },
};

export const services: Service[] = [
  {
    slug: "cctv-installation",
    name: { en: "CCTV Installation", ar: "تركيب كاميرات المراقبة" },
    summary: {
      en: "End-to-end CCTV design, supply, installation, testing, and handover in Doha.",
      ar: "تصميم وتوريد وتركيب واختبار وتسليم أنظمة CCTV بالكامل داخل الدوحة.",
    },
    inclusions: [
      {
        en: "Site survey, risk mapping, and camera placement diagrams",
        ar: "معاينة الموقع وتحليل المخاطر ومخططات توزيع الكاميرات",
      },
      {
        en: "IP/analog camera mix design with storage retention planning",
        ar: "تصميم مزيج كاميرات IP/Analog مع تخطيط فترة الاحتفاظ بالتسجيل",
      },
      {
        en: "Commissioning checklist and operator training",
        ar: "قائمة فحص التشغيل والتسليم مع تدريب المشغلين",
      },
    ],
    faq: [
      {
        question: {
          en: "Do you handle MOI compliance support?",
          ar: "هل تقدمون دعم الالتزام بمتطلبات MOI؟",
        },
        answer: {
          en: "Yes. We prepare layout and technical documentation aligned with sector requirements.",
          ar: "نعم. نجهز المخططات والوثائق الفنية بما يتوافق مع متطلبات كل قطاع.",
        },
      },
      {
        question: {
          en: "How long does a standard installation take?",
          ar: "كم يستغرق التركيب عادة؟",
        },
        answer: {
          en: "Most small and mid-size sites are completed in 2 to 7 working days after approval.",
          ar: "غالبا يتم إنجاز المواقع الصغيرة والمتوسطة خلال 2 إلى 7 أيام عمل بعد الموافقة.",
        },
      },
    ],
  },
  {
    slug: "cctv-maintenance-amc",
    name: { en: "CCTV Maintenance (AMC)", ar: "صيانة CCTV بعقد سنوي" },
    summary: {
      en: "Preventive and corrective maintenance contracts with SLA response windows.",
      ar: "عقود صيانة وقائية وتصحيحية مع مدد استجابة واضحة حسب SLA.",
    },
    inclusions: [
      { en: "Quarterly preventive inspections", ar: "زيارات صيانة وقائية ربع سنوية" },
      { en: "NVR health checks and firmware updates", ar: "فحص NVR وتحديثات البرمجيات" },
      { en: "Incident response and replacement planning", ar: "الاستجابة للأعطال وخطة الاستبدال" },
    ],
    faq: [
      {
        question: { en: "Do you cover third-party systems?", ar: "هل تغطون أنظمة منفذة من شركات أخرى؟" },
        answer: {
          en: "Yes, after technical audit and compatibility check.",
          ar: "نعم، بعد التدقيق الفني وفحص التوافق.",
        },
      },
      {
        question: { en: "Is remote monitoring included?", ar: "هل تشمل الصيانة المراقبة عن بعد؟" },
        answer: {
          en: "Remote diagnostics are available for supported devices.",
          ar: "التشخيص عن بعد متاح للأجهزة المدعومة.",
        },
      },
    ],
  },
  {
    slug: "access-control-biometric",
    name: { en: "Access Control (RFID & Biometric)", ar: "التحكم بالدخول (RFID والقياسات الحيوية)" },
    summary: {
      en: "Door controllers, RFID readers, biometrics, and centralized access software.",
      ar: "وحدات تحكم الأبواب وقارئات RFID وأنظمة البصمة مع برنامج إدارة مركزي.",
    },
    inclusions: [
      { en: "Role-based access groups", ar: "صلاحيات دخول حسب الأدوار" },
      { en: "Attendance and reporting integration", ar: "تكامل الحضور والانصراف والتقارير" },
      { en: "Emergency release and fail-safe checks", ar: "اختبارات الطوارئ ومسارات الفتح الآمن" },
    ],
    faq: [
      {
        question: { en: "Can you integrate with HR software?", ar: "هل يمكن الربط مع أنظمة الموارد البشرية؟" },
        answer: {
          en: "Yes, through API or scheduled export depending on platform support.",
          ar: "نعم، عبر API أو تصدير مجدول حسب المنصة.",
        },
      },
      {
        question: { en: "Do you offer visitor management?", ar: "هل توفرون نظام إدارة الزوار؟" },
        answer: {
          en: "Yes, including pre-registration workflows and badge printing.",
          ar: "نعم، مع تسجيل مسبق وطباعة بطاقات الزوار.",
        },
      },
    ],
  },
  {
    slug: "video-intercom-door-phone",
    name: { en: "Video Intercom & Door Phone", ar: "الانتركوم المرئي والهاتف الداخلي" },
    summary: {
      en: "Apartment, villa, and mixed-use intercom deployment with mobile app unlock.",
      ar: "تنفيذ أنظمة الانتركوم للفلل والمجمعات مع التحكم عبر تطبيق الجوال.",
    },
    inclusions: [
      { en: "Lobby door stations and indoor monitors", ar: "وحدات مدخل المبنى والشاشات الداخلية" },
      { en: "IP intercom network design", ar: "تصميم شبكة IP للانتركوم" },
      { en: "Integration with gate control", ar: "تكامل الانتركوم مع بوابات الدخول" },
    ],
    faq: [
      {
        question: { en: "Can residents answer calls remotely?", ar: "هل يمكن الرد عن بعد؟" },
        answer: {
          en: "Yes, supported systems provide encrypted mobile call forwarding.",
          ar: "نعم، الأنظمة المدعومة توفر تحويل المكالمة المشفر إلى الجوال.",
        },
      },
      {
        question: { en: "Do you support villa kits?", ar: "هل توفرون باقات فلل جاهزة؟" },
        answer: {
          en: "Yes, we provide complete villa kits with indoor monitor and door station.",
          ar: "نعم، نوفر باقات فلل كاملة تشمل الشاشة الداخلية ووحدة الباب.",
        },
      },
    ],
  },
  {
    slug: "intruder-alarm-systems",
    name: { en: "Intruder Alarm Systems", ar: "أنظمة الإنذار ضد التسلل" },
    summary: {
      en: "PIR sensors, contacts, sirens, and control panels for high-risk spaces.",
      ar: "حساسات حركة وأبواب وصفارات ولوحات تحكم للمواقع عالية الخطورة.",
    },
    inclusions: [
      { en: "Zone-based alarm architecture", ar: "تصميم الإنذار حسب المناطق" },
      { en: "Glass break and perimeter sensors", ar: "حساسات كسر الزجاج والمحيط" },
      { en: "Escalation workflow setup", ar: "إعداد مسار الاستجابة والتصعيد" },
    ],
    faq: [
      {
        question: { en: "Can alarms trigger camera recording?", ar: "هل يرتبط الإنذار بالتسجيل؟" },
        answer: {
          en: "Yes, we configure event-linked recording and notifications.",
          ar: "نعم، نفعّل تسجيلًا مرتبطا بالأحداث مع تنبيهات فورية.",
        },
      },
      {
        question: { en: "Do you provide panic buttons?", ar: "هل توفرون أزرار استغاثة؟" },
        answer: {
          en: "Yes, wired and wireless panic options are available.",
          ar: "نعم، تتوفر خيارات سلكية ولاسلكية.",
        },
      },
    ],
  },
  {
    slug: "gate-barriers-turnstiles",
    name: { en: "Gate Barriers & Turnstiles", ar: "بوابات الحواجز والبوابات الدوارة" },
    summary: {
      en: "Vehicle and pedestrian access automation for commercial compounds.",
      ar: "أتمتة دخول المركبات والأفراد للمجمعات والمواقع التجارية.",
    },
    inclusions: [
      { en: "Barrier, bollard, and speed gate deployment", ar: "تركيب الحواجز والمصدات والبوابات السريعة" },
      { en: "Loop detectors and long-range readers", ar: "حساسات أرضية وقارئات بعيدة المدى" },
      { en: "Integrated access logs", ar: "ربط سجلات الدخول مع نظام مركزي" },
    ],
    faq: [
      {
        question: { en: "Can barriers connect to access cards?", ar: "هل تربط الحواجز ببطاقات الدخول؟" },
        answer: {
          en: "Yes, with configurable whitelists and anti-passback rules.",
          ar: "نعم، مع قوائم سماح وقواعد منع التمرير المتكرر.",
        },
      },
      {
        question: { en: "Do you provide civil works too?", ar: "هل تشملون الأعمال المدنية؟" },
        answer: {
          en: "Civil readiness can be included with a turnkey package.",
          ar: "يمكن تضمين الأعمال المدنية ضمن باقة تسليم متكاملة.",
        },
      },
    ],
  },
  {
    slug: "structured-cabling-poe-network",
    name: { en: "Structured Cabling & PoE Network", ar: "التمديدات الهيكلية وشبكات PoE" },
    summary: {
      en: "Cat6/Cat6A and fiber-ready backbone for reliable camera and access networks.",
      ar: "بنية تحتية Cat6/Cat6A وجاهزية ألياف لضمان استقرار شبكات الأمن.",
    },
    inclusions: [
      { en: "Cable routing with labeling standards", ar: "تمديد وتنظيم الكابلات مع الترقيم" },
      { en: "PoE switch capacity planning", ar: "تخطيط أحمال وسعات سويتشات PoE" },
      { en: "Rack and patch panel documentation", ar: "توثيق الراك والباتش بانل" },
    ],
    faq: [
      {
        question: { en: "Do you certify cable links?", ar: "هل تقدمون اختبار واعتماد للوصلات؟" },
        answer: {
          en: "Yes, we provide test reports for delivered network links.",
          ar: "نعم، نقدم تقارير الاختبار للوصلات المسلمة.",
        },
      },
      {
        question: { en: "Can you upgrade existing racks?", ar: "هل يمكن تطوير الراك الحالي؟" },
        answer: {
          en: "Yes, phased upgrades are available with minimal downtime.",
          ar: "نعم، نوفر تطويرا مرحليا مع تقليل التوقف.",
        },
      },
    ],
  },
  {
    slug: "control-room-vms-analytics",
    name: { en: "Control Room, VMS & Analytics", ar: "غرف التحكم ونظام VMS والتحليلات" },
    summary: {
      en: "Video wall setup, VMS user roles, and analytics such as LPR and heatmaps.",
      ar: "تجهيز جدار عرض وغرف تحكم مع إدارة VMS وتحليلات مثل LPR والخرائط الحرارية.",
    },
    inclusions: [
      { en: "Video wall and decoder planning", ar: "تخطيط جدار العرض ووحدات فك التشفير" },
      { en: "Operator SOP workflows", ar: "إجراءات تشغيل موحدة للمشغلين" },
      { en: "People counting and license plate analytics", ar: "تحليلات عد الأشخاص وقراءة اللوحات" },
    ],
    faq: [
      {
        question: { en: "Which analytics can be enabled?", ar: "ما أنواع التحليلات المتاحة؟" },
        answer: {
          en: "LPR/ANPR, line crossing, loitering, occupancy, and heatmaps.",
          ar: "قراءة اللوحات، عبور الخط، التسكع، الإشغال، والخرائط الحرارية.",
        },
      },
      {
        question: { en: "Do you provide training?", ar: "هل تقدمون تدريبًا؟" },
        answer: {
          en: "Yes, we provide operator and admin training during handover.",
          ar: "نعم، نقدم تدريبًا للمشغلين والمسؤولين عند التسليم.",
        },
      },
    ],
  },
];

export const productCategories: ProductCategory[] = [
  {
    slug: "cctv-video-surveillance",
    name: { en: "CCTV & Video Surveillance", ar: "منتجات CCTV والمراقبة المرئية" },
    summary: {
      en: "Cameras, recorders, software licenses, and storage platforms for full surveillance systems.",
      ar: "كاميرات ومسجلات وتراخيص وبرمجيات تخزين لتكوين نظام مراقبة متكامل.",
    },
    items: [
      "IP cameras",
      "Analog HD cameras",
      "Wi-Fi cameras",
      "PTZ cameras",
      "Dome cameras",
      "Bullet cameras",
      "Turret cameras",
      "Fisheye and 360 cameras",
      "Thermal cameras",
      "Explosion-proof cameras",
      "NVR and DVR recorders",
      "VMS software and mobile apps",
      "Surveillance HDD, NAS, RAID storage",
      "PoE switches and SFP modules",
      "Video wall decoders and monitors",
      "Mounts, housings, junction boxes, surge protectors",
    ],
    bestFor: {
      en: "Best for villas, retail, warehouses, and multi-site monitoring.",
      ar: "مناسب للفلل والمتاجر والمستودعات والمراقبة متعددة المواقع.",
    },
  },
  {
    slug: "access-control-products",
    name: { en: "Access Control Products", ar: "منتجات التحكم بالدخول" },
    summary: {
      en: "Reader, lock, and controller hardware with software-led access governance.",
      ar: "قارئات وأقفال ووحدات تحكم مع إدارة صلاحيات عبر برنامج مركزي.",
    },
    items: [
      "RFID card readers",
      "PIN keypads",
      "Smart locks",
      "Magnetic locks and electric strikes",
      "Door controllers",
      "Access management software",
      "Fingerprint and facial terminals",
      "Palm or iris biometric options",
      "Time attendance terminals",
      "Visitor management systems",
    ],
    bestFor: {
      en: "Best for office towers, schools, gated sites, and mixed-use compounds.",
      ar: "مناسب للأبراج والمجمعات والمدارس والمواقع متعددة الاستخدام.",
    },
  },
  {
    slug: "perimeter-entry-products",
    name: { en: "Perimeter & Entry Products", ar: "منتجات المحيط ونقاط الدخول" },
    summary: {
      en: "Barrier systems and perimeter sensors for vehicle and pedestrian flow control.",
      ar: "أنظمة حواجز وحساسات محيط للتحكم بحركة المركبات والأفراد.",
    },
    items: [
      "Gate barriers",
      "Bollards",
      "Turnstiles",
      "Speed gates",
      "Loop detectors",
      "IR beams",
      "Fence sensors",
    ],
    bestFor: {
      en: "Best for compounds, logistics yards, and secure campuses.",
      ar: "مناسب للمجمعات والساحات اللوجستية والمرافق المؤمنة.",
    },
  },
  {
    slug: "intercom-products",
    name: { en: "Intercom Products", ar: "منتجات الانتركوم" },
    summary: {
      en: "Audio/video/IP intercom systems with villa kits and apartment entry control.",
      ar: "أنظمة انتركوم صوتية ومرئية وIP مع باقات فلل وتحكم بمداخل المباني.",
    },
    items: [
      "Audio intercom",
      "Video intercom",
      "IP intercom",
      "Villa intercom kits",
      "Door stations",
      "Indoor monitors",
    ],
    bestFor: {
      en: "Best for villas, apartment blocks, and residential compounds.",
      ar: "مناسب للفلل والعمارات السكنية والمجمعات.",
    },
  },
  {
    slug: "alarm-detection-products",
    name: { en: "Alarm & Detection Products", ar: "منتجات الإنذار والكشف" },
    summary: {
      en: "Intrusion detection hardware with event escalation and control panel logic.",
      ar: "معدات كشف التسلل مع أنظمة التصعيد ولوحات التحكم.",
    },
    items: [
      "PIR motion sensors",
      "Door and window contacts",
      "Glass-break sensors",
      "Sirens",
      "Control panels",
      "Panic buttons and key fobs",
    ],
    bestFor: {
      en: "Best for high-value stores, pharmacies, and after-hours protection.",
      ar: "مناسب للمتاجر عالية القيمة والصيدليات والحماية بعد ساعات العمل.",
    },
  },
  {
    slug: "power-infrastructure-products",
    name: { en: "Power & Infrastructure", ar: "منتجات الطاقة والبنية التحتية" },
    summary: {
      en: "Reliable power backup and passive infrastructure for always-on security systems.",
      ar: "حلول طاقة احتياطية وبنية سلبية تضمن استمرارية أنظمة الأمن.",
    },
    items: [
      "UPS systems",
      "Battery backup",
      "Racks and cabinets",
      "Patch panels",
      "Cat6 and Cat6A cables",
      "Fiber backbone accessories",
      "Conduits and trunking",
    ],
    bestFor: {
      en: "Best for projects requiring uptime, compliance, and clean cable management.",
      ar: "مناسب للمشاريع التي تتطلب استمرارية والتزاما تنظيميا وتنظيما احترافيا.",
    },
  },
];

export const industries: Industry[] = [
  {
    slug: "hotels-residential-complexes",
    name: { en: "Hotels & Residential Complexes", ar: "الفنادق والمجمعات السكنية" },
    checklist: [
      { en: "Lobby, elevator, corridor, and parking coverage map", ar: "مخطط تغطية اللوبي والمصاعد والممرات والمواقف" },
      { en: "Resident and visitor access zoning", ar: "تقسيم صلاحيات السكان والزوار" },
      { en: "Retention and privacy policy alignment", ar: "مواءمة سياسات الاحتفاظ والخصوصية" },
    ],
    typicalLayout: {
      en: "Typical design includes perimeter cameras, lift lobby views, and front-desk monitoring wall.",
      ar: "التصميم المعتاد يشمل كاميرات محيط وكاميرات لوبي المصاعد وجدار عرض في مكتب الاستقبال.",
    },
  },
  {
    slug: "banks-exchange-gold-shops",
    name: { en: "Banks, Exchange & Gold Shops", ar: "البنوك والصرافة ومحلات الذهب" },
    checklist: [
      { en: "Cash-point and counter coverage with high-detail lenses", ar: "تغطية نقاط النقد والكاونتر بعدسات عالية الدقة" },
      { en: "Dual recording redundancy and storage policy", ar: "ازدواجية التسجيل وسياسة التخزين" },
      { en: "Tamper alerts and alarm integration", ar: "تنبيهات العبث وربط الإنذار" },
    ],
    typicalLayout: {
      en: "High-security designs focus on teller zones, safe room entrances, and access event logging.",
      ar: "تركز التصاميم عالية الأمان على مناطق الكاشير ومداخل الخزنة وتوثيق أحداث الدخول.",
    },
  },
  {
    slug: "clubs-sports-cultural-facilities",
    name: { en: "Clubs, Sports & Cultural Facilities", ar: "الأندية والمنشآت الرياضية والثقافية" },
    checklist: [
      { en: "Audience flow analysis for gates and exits", ar: "تحليل تدفق الجمهور عند البوابات والمخارج" },
      { en: "Incident replay and evidence retention planning", ar: "تخطيط الاحتفاظ بالأدلة وسهولة الاسترجاع" },
      { en: "PA and control room coordination", ar: "تنسيق أنظمة النداء العام مع غرفة التحكم" },
    ],
    typicalLayout: {
      en: "Design emphasizes wide-angle coverage in public zones and controlled entry points.",
      ar: "يركز التصميم على تغطية واسعة للمناطق العامة مع نقاط دخول مضبوطة.",
    },
  },
  {
    slug: "shopping-entertainment-centers",
    name: { en: "Shopping & Entertainment Centers", ar: "مراكز التسوق والترفيه" },
    checklist: [
      { en: "Storefront, corridor, and loading bay coverage", ar: "تغطية واجهات المتاجر والممرات ومناطق التحميل" },
      { en: "People counting and queue insights", ar: "تحليلات عد الزوار وإدارة الطوابير" },
      { en: "Centralized VMS permissions", ar: "صلاحيات مركزية عبر نظام VMS" },
    ],
    typicalLayout: {
      en: "Mall deployments usually blend PTZ oversight with fixed cameras at tenant fronts.",
      ar: "تطبيقات المولات تمزج كاميرات PTZ للمناطق المفتوحة مع كاميرات ثابتة أمام المحلات.",
    },
  },
  {
    slug: "hospitals-clinics",
    name: { en: "Hospitals & Clinics", ar: "المستشفيات والعيادات" },
    checklist: [
      { en: "Public area monitoring with patient privacy controls", ar: "مراقبة المناطق العامة مع احترام خصوصية المرضى" },
      { en: "Emergency route and pharmacy area coverage", ar: "تغطية مسارات الطوارئ ومناطق الصيدلية" },
      { en: "Role-based viewing permissions", ar: "صلاحيات مشاهدة حسب الدور الوظيفي" },
    ],
    typicalLayout: {
      en: "Healthcare sites prioritize public safety zones while protecting sensitive treatment spaces.",
      ar: "تُعطى الأولوية لمناطق السلامة العامة مع حماية المساحات العلاجية الحساسة.",
    },
  },
  {
    slug: "warehouses-hazardous-precious-stores",
    name: { en: "Warehouses & High-Value Storage", ar: "المستودعات ومخازن المواد الثمينة" },
    checklist: [
      { en: "Perimeter detection and loading dock control", ar: "كشف محيط الموقع والتحكم بمنصات التحميل" },
      { en: "Thermal or low-light camera planning", ar: "تخطيط كاميرات حرارية أو منخفضة الإضاءة" },
      { en: "Inventory zone and access audit logs", ar: "تسجيل تدقيق الوصول لمناطق المخزون" },
    ],
    typicalLayout: {
      en: "Typical plans include yard perimeter coverage and reinforced access control at stock zones.",
      ar: "عادة تشمل الخطط تغطية محيط الساحة مع تعزيز التحكم في دخول مناطق المخزون.",
    },
  },
  {
    slug: "fuel-stations",
    name: { en: "Fuel Stations", ar: "محطات الوقود" },
    checklist: [
      { en: "Forecourt and dispenser coverage", ar: "تغطية ساحات التعبئة والمضخات" },
      { en: "Cash counter and convenience store coverage", ar: "تغطية الكاشير والمتجر الملحق" },
      { en: "Night monitoring and remote alerts", ar: "مراقبة ليلية وتنبيهات عن بعد" },
    ],
    typicalLayout: {
      en: "Fuel station systems combine forecourt visibility with cashier protection and perimeter watch.",
      ar: "أنظمة محطات الوقود تجمع بين رؤية ساحات التعبئة وحماية الكاشير ومراقبة المحيط.",
    },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "moi-cctv-approval-checklist-doha",
    title: {
      en: "MOI CCTV Approval Checklist for Doha Businesses",
      ar: "قائمة اعتماد MOI لكاميرات المراقبة في الدوحة",
    },
    description: {
      en: "Step-by-step checklist covering survey, layout, compliance files, and maintenance readiness.",
      ar: "خطوات عملية تشمل المعاينة والمخططات وملفات الالتزام وجاهزية الصيانة.",
    },
    date: "2026-03-15",
    body: [
      {
        en: "Start with a sector-based requirement review, then map cameras to critical points and blind spots.",
        ar: "ابدأ بمراجعة متطلبات القطاع ثم وزع الكاميرات على النقاط الحرجة ومناطق العمى.",
      },
      {
        en: "Prepare technical submittals: equipment specs, storage policy, network diagram, and maintenance scope.",
        ar: "جهز المستندات الفنية: مواصفات المعدات وسياسة التخزين ومخطط الشبكة ونطاق الصيانة.",
      },
      {
        en: "Run commissioning tests before final handover and keep records for audit and future renewals.",
        ar: "نفذ اختبارات التشغيل قبل التسليم النهائي واحتفظ بالسجلات للتدقيق والتجديد.",
      },
    ],
  },
  {
    slug: "cctv-storage-retention-guide",
    title: {
      en: "CCTV Storage Retention Guide: Days, Bitrate, and Capacity",
      ar: "دليل تخزين CCTV: أيام الاحتفاظ والبت ريت والسعة",
    },
    description: {
      en: "How to size NVR/NAS storage correctly with practical formulas and safety margins.",
      ar: "كيفية حساب سعة NVR/NAS بشكل صحيح بمعادلات عملية وهوامش أمان.",
    },
    date: "2026-03-10",
    body: [
      {
        en: "Storage sizing should combine bitrate planning with scene complexity and camera count growth.",
        ar: "حساب التخزين يجب أن يجمع بين البت ريت وتعقيد المشهد ونمو عدد الكاميرات مستقبلا.",
      },
      {
        en: "Plan redundancy for critical environments and keep separate archive policy for incidents.",
        ar: "خطط للازدواجية في البيئات الحرجة وحدد سياسة أرشفة منفصلة للحوادث.",
      },
      {
        en: "Review retention assumptions quarterly, especially for sites with seasonal traffic peaks.",
        ar: "راجع افتراضات الاحتفاظ كل ربع سنة خصوصا للمواقع ذات الذروة الموسمية.",
      },
    ],
  },
  {
    slug: "villa-smart-security-package-doha",
    title: {
      en: "Villa Smart Security Package in Doha: What to Include",
      ar: "باقة الأمن الذكي للفلل في الدوحة: ماذا تشمل؟",
    },
    description: {
      en: "A practical package model for villa owners: cameras, intercom, smart locks, and AMC.",
      ar: "نموذج عملي لمالكي الفلل يشمل الكاميرات والانتركوم والأقفال الذكية وعقد الصيانة.",
    },
    date: "2026-03-02",
    body: [
      {
        en: "A strong villa package starts with perimeter coverage and controlled visitor access.",
        ar: "الباقة القوية تبدأ بتغطية محيط الفيلا والتحكم في دخول الزوار.",
      },
      {
        en: "Add remote viewing and push alerts to support travel and after-hours monitoring.",
        ar: "أضف المراقبة عن بعد والتنبيهات الفورية لدعم السفر والمراقبة خارج أوقات التواجد.",
      },
      {
        en: "Bundle annual maintenance from day one to reduce downtime and protect equipment lifespan.",
        ar: "ادمج عقد الصيانة السنوي من البداية لتقليل الأعطال وحماية عمر المعدات.",
      },
    ],
  },
];

export const projects = [
  {
    slug: "retail-mall-control-room",
    image: media.retail,
    title: {
      en: "Retail Center Control Room Upgrade",
      ar: "تطوير غرفة التحكم لمركز تجاري",
    },
    outcome: {
      en: "Reduced incident response time by 37% with new VMS workflows.",
      ar: "خفض زمن الاستجابة للحوادث بنسبة 37% عبر مسارات VMS جديدة.",
    },
  },
  {
    slug: "villa-smart-security",
    image: media.villa,
    title: {
      en: "Villa Smart Security Package",
      ar: "تنفيذ باقة أمن ذكي لفيلا",
    },
    outcome: {
      en: "Integrated CCTV, intercom, smart lock, and mobile alerting in 4 days.",
      ar: "دمج CCTV والانتركوم والقفل الذكي والتنبيهات خلال 4 أيام.",
    },
  },
  {
    slug: "warehouse-perimeter-protection",
    image: media.warehouse,
    title: {
      en: "Warehouse Perimeter Protection",
      ar: "حماية محيط مستودع صناعي",
    },
    outcome: {
      en: "Added thermal perimeter detection and gate access logs for audits.",
      ar: "إضافة كشف حراري للمحيط وسجلات دخول البوابات لأغراض التدقيق.",
    },
  },
];

export const localIntentPages = [
  "cctv-installation-in-doha",
  "cctv-for-villa",
  "cctv-for-shop",
  "cctv-for-warehouse",
  "access-control-for-office",
];

export const comparisonTable = [
  {
    feature: "Best use-case",
    ip: "Scalable multi-site systems",
    analog: "Budget retrofit projects",
  },
  {
    feature: "Image detail",
    ip: "Higher analytics-ready detail",
    analog: "Adequate for basic monitoring",
  },
  {
    feature: "Network requirements",
    ip: "Structured cabling and PoE planning",
    analog: "Coax with simpler topology",
  },
  {
    feature: "Future expansion",
    ip: "Strong with VMS and AI modules",
    analog: "More limited than IP",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getProductBySlug = (slug: string): ProductCategory | undefined =>
  productCategories.find((product) => product.slug === slug);

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((industry) => industry.slug === slug);

export const getBlogBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
