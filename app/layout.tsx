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
  DEFAULT_OG_IMAGE,
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
  category: "business",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/hero-booth.webp"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/assets/icon-craftivation.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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

