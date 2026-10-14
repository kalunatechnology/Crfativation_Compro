import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  rootStructuredData,
} from "@/lib/seo";
import { ContactModalProvider } from "@/components/ContactModal";

const arsenal = localFont({
  src: [
    {
      path: "../public/fonts/arsenal/Arsenal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/arsenal/Arsenal-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/arsenal/Arsenal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/arsenal/Arsenal-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-arsenal",
  display: "swap",
});

const plusJakarta = localFont({
  src: [
    {
      path: "../public/fonts/plus-jakarta-sans/PlusJakartaSans-Variable.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../public/fonts/plus-jakarta-sans/PlusJakartaSans-Italic-Variable.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "PT SINERGI MUDA ARSA (ARSALYNK)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/assets/hero-booth.webp",
        width: 1200,
        height: 630,
        alt: "Craftivation Exhibition Contractor - Desain dan Fabrikasi Booth Pameran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/hero-booth.webp"],
  },
  icons: {
    icon: [
      { url: "/assets/icon-craftivation.svg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/icon-craftivation.svg",
    apple: "/assets/icon-craftivation.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${arsenal.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}

