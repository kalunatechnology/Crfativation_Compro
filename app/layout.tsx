import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

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
  title: "Craftivation | Exhibition Contractor",
  description:
    "Craftivation membantu brand merancang dan mengeksekusi booth, exhibition, dan brand activation untuk kebutuhan komersial.",
  icons: {
    icon: "/assets/icon-craftivation.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${arsenal.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
