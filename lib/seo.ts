export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.craftivation.id";

export const SITE_NAME = "Craftivation";

export const SITE_TITLE =
  "Craftivation | Kontraktor Pameran, Desain & Fabrikasi Booth Exhibition";

export const SITE_DESCRIPTION =
  "Craftivation adalah kontraktor pameran profesional di Indonesia yang membantu brand merancang dan mengeksekusi booth, exhibition, dan brand activation presisi tinggi dari konsep hingga instalasi.";

export const SITE_KEYWORDS = [
  "Craftivation",
  "Kontraktor Booth Pameran",
  "Exhibition Contractor Indonesia",
  "Jasa Pembuatan Booth Pameran",
  "Booth Design and Fabrication",
  "Stand Exhibition Jakarta",
  "Kontraktor Pameran Bogor",
  "Brand Activation Indonesia",
  "Custom Booth Exhibition",
  "Modular Booth Pameran",
  "Event Contractor Indonesia",
  "Fabrikasi Booth Pameran",
  "Desain Booth 3D",
  "Vendor Pameran Indonesia",
];

/**
 * 4 Pilar Navigasi Utama Craftivation (Target Sitelinks Google SERP)
 * Deskripsi ditulis ringkas (110–140 karakter) agar Google dapat menampilkannya
 * secara utuh sebagai snippet 2-baris di bawah judul sitelink di SERP (seperti Arsalynk).
 */
export const SITE_NAVIGATION_ITEMS = [
  {
    name: "Portofolio Proyek",
    href: "/projects",
    description:
      "Eksplorasi portofolio desain dan fabrikasi booth pameran komersial, exhibition stand, dan brand activation presisi tinggi dari Craftivation.",
  },
  {
    name: "Pendekatan Kerja",
    href: "/approach",
    description:
      "Pelajari metodologi Kenali, Kreasi, dan Implikasi Craftivation dalam merancang booth Modular, Versatile, hingga Enterprise berstandar tinggi.",
  },
  {
    name: "Tentang Kami",
    href: "/about",
    description:
      "Profil Craftivation sebagai kontraktor pameran terpercaya di bawah PT Sinergi Muda Arsa yang mewujudkan pengalaman tak terungkap dari sebuah brand.",
  },
  {
    name: "Hubungi Kami",
    href: "/#contact",
    description:
      "Jadwalkan konsultasi proyek booth pameran Anda bersama tim ahli Craftivation via WhatsApp +62 823-2230-8719 atau email resmi.",
  },
] as const;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Membangun Schema BreadcrumbList terstandar untuk Google Search Console & SERP.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const all: BreadcrumbItem[] = [{ name: "Beranda", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * Schema.org @graph structured data standar Enterprise (arsitektur Arsalynk & Kaluna)
 * Menggunakan stable @id linkers: SiteNavigationElement, WebSite, Organization, dan WebPage hasPart.
 */
export const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. SiteNavigationElement (Memberi sinyal struktur Sitelinks Google SERP)
    ...SITE_NAVIGATION_ITEMS.map((item) => ({
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}${item.href}#navigation`,
      name: item.name,
      url: `${SITE_URL}${item.href}`,
      description: item.description,
    })),

    // 2. WebSite Entity (Dengan hasPart deklarasi Sitelinks)
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: [
        "Craftivation Exhibition Contractor",
        "Craftivation Indonesia",
        "craftivation.id",
      ],
      description: SITE_DESCRIPTION,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      hasPart: SITE_NAVIGATION_ITEMS.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: `${SITE_URL}${item.href}`,
        description: item.description,
      })),
    },

    // 3. Organization Entity (Entity Knowledge Graph & Induk Arsalynk)
    {
      "@type": ["Organization", "Corporation"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Craftivation (Unit PT Sinergi Muda Arsa)",
      alternateName: [
        "Craftivation Exhibition Contractor",
        "Craftivation Indonesia",
      ],
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/assets/logo-black.svg`,
        contentUrl: `${SITE_URL}/assets/logo-black.svg`,
        width: 374,
        height: 77,
        caption: "Craftivation Exhibition Contractor",
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/hero-booth.webp`,
        width: 1200,
        height: 630,
      },
      description: SITE_DESCRIPTION,
      email: "craftivation.studio@gmail.com",
      telephone: "+62 823-2230-8719",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+62 823-2230-8719",
          contactType: "customer service",
          areaServed: "ID",
          availableLanguage: ["Indonesian", "English"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:30",
            closes: "18:00",
          },
        },
        {
          "@type": "ContactPoint",
          email: "craftivation.studio@gmail.com",
          contactType: "sales",
          areaServed: "ID",
          availableLanguage: ["Indonesian", "English"],
        },
      ],
      parentOrganization: {
        "@type": "Organization",
        "@id": "https://www.arsalynk.com/#organization",
        name: "Arsalynk",
        legalName: "PT Sinergi Muda Arsa",
        url: "https://www.arsalynk.com/",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogor",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      knowsAbout: SITE_KEYWORDS,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Craftivation Exhibition",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Modular Booth Exhibition",
              description:
                "Paket booth praktis dan minimalis untuk kebutuhan jangka pendek brand Anda.",
              url: `${SITE_URL}/approach`,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Versatile Booth Exhibition",
              description:
                "Paket booth lengkap dan fungsional yang fleksibel menyesuaikan kebutuhan brand Anda.",
              url: `${SITE_URL}/approach`,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Exhibition & Brand Activation",
              description:
                "Solusi custom booth pameran skala besar dan aktivasi brand berdampak tinggi.",
              url: `${SITE_URL}/approach`,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          },
        ],
      },
    },

    // 4. WebPage Root Entity
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "id-ID",
      hasPart: SITE_NAVIGATION_ITEMS.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: `${SITE_URL}${item.href}`,
        description: item.description,
      })),
    },
  ],
};
