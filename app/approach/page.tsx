import type { Metadata } from "next";
import HomepageMotion from "@/components/HomepageMotion";
import HomepageNavbar from "@/components/HomepageNavbar";
import ApproachJourney from "@/components/ApproachJourney";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { SITE_URL, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pendekatan Kerja | Craftivation Exhibition Contractor",
  description:
    "Kenali, Kreasi, Implikasi. Pelajari proses konsultasi, konsep, fabrikasi, dan instalasi booth Craftivation serta pilihan Modular, Versatile, dan Enterprise.",
  alternates: {
    canonical: `${SITE_URL}/approach`,
  },
  openGraph: {
    title: "Pendekatan Kerja | Craftivation Exhibition Contractor",
    description: "Kenali. Kreasi. Implikasi — alur kerja terstruktur Craftivation untuk menghadirkan booth pameran berdaya pikat tinggi.",
    url: `${SITE_URL}/approach`,
    type: "website",
    images: ["/assets/hero-booth.webp"],
  },
};

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: "Pendekatan Kerja", path: "/approach" },
]);

/**
 * Dedicated approach.svg page. The Hub on homepage stays unchanged.
 * No pinned scroll: every step has its own source-derived illustration
 * and short, GIF-like entrance triggered by natural scrolling.
 */
export default function ApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
      <HomepageMotion />
      <HomepageNavbar variant="approach" />
      <main className="homepage approachPage">
        <ApproachJourney />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
