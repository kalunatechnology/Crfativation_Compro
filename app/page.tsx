import type { Metadata } from "next";
import HomepageNavbar from "@/components/HomepageNavbar";
import HomepageMotion from "@/components/HomepageMotion";
import HeroSection from "@/components/HeroSection";
import HubSection from "@/components/HubSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, homeStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    languages: { "id-ID": SITE_URL, "x-default": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};


/** Composed homepage; interaction stays inside its section components. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomepageMotion />
      <HomepageNavbar />
      <main className="homepage">
        <HeroSection />
        <HubSection />
        <ProcessSection />
        <PortfolioSection />
        <AboutSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
