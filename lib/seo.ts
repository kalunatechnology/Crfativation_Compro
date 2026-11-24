import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.craftivation.com";

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
    href: "/contact",
    description:
      "Konsultasikan proyek booth pameran Anda bersama tim ahli Craftivation via WhatsApp +62 823-2230-8719, email, atau kunjungi kantor dan workshop kami.",
  },
] as const;

/**
 * Tanggal pembaruan konten situs (satu sumber untuk sitemap, dateModified JSON-LD, dll.).
 * Ubah hanya saat konten benar-benar berubah agar sinyal freshness akurat.
 */
export const SITE_LAST_MODIFIED = "2026-10-22";

export const DEFAULT_OG_IMAGE = {
  url: "/assets/hero-booth.webp",
  width: 1200,
  height: 630,
  alt: "Craftivation Exhibition Contractor - Desain dan Fabrikasi Booth Pameran",
};

const absoluteUrl = (path: string) =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

/**
 * Metadata per halaman yang lengkap. Next.js mengganti (bukan menggabung) objek
 * openGraph/twitter dari layout, jadi siteName, locale, gambar, dan twitter card
 * harus diulang di setiap halaman. Helper ini menjamin semuanya konsisten.
 * `title` pendek: template layout menambahkan " | Craftivation".
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const fullTitle = ogTitle ?? `${title} | Craftivation Exhibition Contractor`;
  const fullDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: { "id-ID": absoluteUrl(path), "x-default": absoluteUrl(path) },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title: fullTitle,
      description: fullDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Membangun Schema BreadcrumbList terstandar untuk Google Search Console & SERP.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const all: BreadcrumbItem[] = [{ name: "Beranda", path: "/" }, ...items];
  const current = items[items.length - 1];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(current ? { "@id": `${absoluteUrl(current.path)}#breadcrumb` } : {}),
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Satu @graph per halaman: WebPage (atau subtipe: AboutPage, ContactPage,
 * CollectionPage) + BreadcrumbList, saling terhubung lewat @id ke entitas
 * WebSite & Organization di layout. Memberi Google konteks hierarki situs.
 */
export function buildPageGraph({
  path,
  name,
  description,
  type = "WebPage",
  breadcrumbs,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  breadcrumbs: BreadcrumbItem[];
}) {
  const url = absoluteUrl(path);
  const { "@context": _ctx, ...breadcrumb } = buildBreadcrumbJsonLd(breadcrumbs);
  void _ctx;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "id-ID",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@id": `${SITE_URL}/#localbusiness` },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        significantLink: SITE_NAVIGATION_ITEMS.map((item) => `${SITE_URL}${item.href}`),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
        },
        dateModified: SITE_LAST_MODIFIED,
      },
      breadcrumb,
    ],
  };
}

/**
 * Schema.org @graph structured data standar Enterprise (arsitektur Arsalynk & Kaluna)
 * Menggunakan stable @id linkers: SiteNavigationElement, ItemList, WebSite, Organization, LocalBusiness, dan WebPage hasPart.
 */
export const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. ItemList Navigasi Utama (Memberi sinyal eksplisit urutan Sitelinks di Google SERP)
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#navigation-list`,
      name: "Navigasi Utama Craftivation",
      description: "Pilar navigasi dan layanan resmi Craftivation Exhibition Contractor",
      numberOfItems: SITE_NAVIGATION_ITEMS.length,
      itemListElement: SITE_NAVIGATION_ITEMS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: {
          "@type": "SiteNavigationElement",
          "@id": `${SITE_URL}${item.href}#navigation`,
          name: item.name,
          url: `${SITE_URL}${item.href}`,
          description: item.description,
        },
      })),
    },

    // 2. Individual SiteNavigationElement (Mendukung crawler Google yang membaca node langsung)
    ...SITE_NAVIGATION_ITEMS.map((item) => ({
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}${item.href}#navigation`,
      name: item.name,
      url: `${SITE_URL}${item.href}`,
      description: item.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    })),

    // 3. WebSite Entity (Dengan hasPart deklarasi Sitelinks yang terhubung ke @id WebPage)
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: [
        "Craftivation Exhibition Contractor",
        "Craftivation Indonesia",
        "craftivation.com",
      ],
      description: SITE_DESCRIPTION,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      about: [
        { "@id": `${SITE_URL}/#organization` },
        { "@id": `${SITE_URL}/#localbusiness` },
      ],
      mainEntity: {
        "@id": `${SITE_URL}/#navigation-list`,
      },
      hasPart: SITE_NAVIGATION_ITEMS.map((item) => ({
        "@type": "WebPage",
        "@id": `${SITE_URL}${item.href}#webpage`,
        name: item.name,
        url: `${SITE_URL}${item.href}`,
        description: item.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      })),
    },

    // 4. LocalBusiness Entity (Google Business Profile & Rich Results Synchronization)
    {
      "@type": ["LocalBusiness", "GeneralContractor", "ProfessionalService"],
      "@id": `${SITE_URL}/#localbusiness`,
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
        url: `${SITE_URL}/icon.png`,
        contentUrl: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        caption: "Craftivation Exhibition Contractor",
      },
      image: `${SITE_URL}/assets/hero-booth.webp`,
      description: SITE_DESCRIPTION,
      telephone: "+62 823-2230-8719",
      email: "corporate@craftivation.com",
      priceRange: "$$$",
      currenciesAccepted: "IDR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      hasMap: "https://www.google.com/maps/search/?api=1&query=Menara+Rajawali+Mega+Kuningan+Jakarta",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Menara Rajawali 26th Floor, Jl. DR. Ide Anak Agung Gde Agung",
        addressLocality: "Jakarta Selatan",
        addressRegion: "DKI Jakarta",
        postalCode: "12950",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.2289,
        longitude: 106.8283,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:30",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/craftivation.io",
        "https://www.threads.com/@craftivation.io",
        "https://www.linkedin.com/company/craftivationio/",
        "https://www.facebook.com/share/1A1biMXH2d/?mibextid=wwXIfr",
        "https://maps.app.goo.gl/wMhkBfd8HkyLqMyDA",
      ],
      parentOrganization: {
        "@id": `${SITE_URL}/#organization`,
      },
      department: [
        {
          "@type": ["LocalBusiness", "GeneralContractor"],
          "@id": `${SITE_URL}/#production-workshop`,
          name: "Craftivation Production Workshop",
          url: `${SITE_URL}/contact`,
          telephone: "+62 823-2230-8719",
          image: `${SITE_URL}/assets/hero-booth.webp`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kavling Tiga Belas, Jl. Djaman Nairin, Sasak Panjang, Tajurhalang",
            addressLocality: "Bogor",
            addressRegion: "Jawa Barat",
            postalCode: "16936",
            addressCountry: "ID",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -6.4674,
            longitude: 106.7481,
          },
          hasMap: "https://maps.app.goo.gl/wMhkBfd8HkyLqMyDA",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:30",
              closes: "18:00",
            },
          ],
        },
      ],
    },

    // 5. Organization Entity (Entity Knowledge Graph & Induk Arsalynk)
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
        url: `${SITE_URL}/icon.png`,
        contentUrl: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        caption: "Craftivation Exhibition Contractor",
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/hero-booth.webp`,
        width: 1200,
        height: 630,
      },
      description: SITE_DESCRIPTION,
      email: "corporate@craftivation.com",
      telephone: "+62 823-2230-8719",
      sameAs: [
        "https://www.instagram.com/craftivation.io",
        "https://www.threads.com/@craftivation.io",
        "https://www.linkedin.com/company/craftivationio/",
        "https://www.facebook.com/share/1A1biMXH2d/?mibextid=wwXIfr",
        "https://maps.app.goo.gl/wMhkBfd8HkyLqMyDA",
      ],
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
          email: "corporate@craftivation.com",
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
      address: [
        {
          "@type": "PostalAddress",
          name: "Business Office",
          streetAddress: "Menara Rajawali 26th Floor, Jl. DR. Ide Anak Agung Gde Agung",
          addressLocality: "Jakarta Selatan",
          addressRegion: "DKI Jakarta",
          postalCode: "12950",
          addressCountry: "ID",
        },
        {
          "@type": "PostalAddress",
          name: "Production Workshop",
          streetAddress: "Kavling Tiga Belas, Jl. Djaman Nairin, Sasak Panjang, Tajurhalang",
          addressLocality: "Bogor",
          addressRegion: "Jawa Barat",
          postalCode: "16936",
          addressCountry: "ID",
        },
      ],
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
  ],
};

/**
 * Structured data khusus homepage: WebPage root. Sebelumnya berada di rootStructuredData
 * sehingga ikut tercetak di semua halaman dengan URL beranda (salah).
 */
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [
        { "@id": `${SITE_URL}/#organization` },
        { "@id": `${SITE_URL}/#localbusiness` },
      ],
      mainEntity: { "@id": `${SITE_URL}/#localbusiness` },
      inLanguage: "id-ID",
      significantLink: SITE_NAVIGATION_ITEMS.map((item) => `${SITE_URL}${item.href}`),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
      },
      dateModified: SITE_LAST_MODIFIED,
      hasPart: SITE_NAVIGATION_ITEMS.map((item) => ({
        "@type": "WebPage",
        "@id": `${SITE_URL}${item.href}#webpage`,
        name: item.name,
        url: `${SITE_URL}${item.href}`,
        description: item.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      })),
    },
  ],
};
