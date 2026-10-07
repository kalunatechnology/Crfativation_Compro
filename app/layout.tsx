import type { Metadata } from "next";
import { Arsenal, Jost, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const arsenal = Arsenal({
  variable: "--font-arsenal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Craftivation | Exhibition Contractor",
  description:
    "Craftivation membantu brand merancang dan mengeksekusi booth, exhibition, dan brand activation untuk kebutuhan komersial.",
  icons: {
    icon: "/assets/logo-white.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${arsenal.variable} ${jost.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
