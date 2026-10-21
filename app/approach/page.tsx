import type { Metadata } from "next";
import HomepageMotion from "@/components/HomepageMotion";
import HomepageNavbar from "@/components/HomepageNavbar";
import ApproachJourney from "@/components/ApproachJourney";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { buildPageMetadata, buildPageGraph } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pendekatan Kerja",
  description:
    "Kenali, Kreasi, Implikasi. Pelajari proses konsultasi, konsep, fabrikasi, dan instalasi booth Craftivation serta pilihan Modular, Versatile, dan Enterprise.",
  path: "/approach",
  ogDescription:
    "Kenali. Kreasi. Implikasi — alur kerja terstruktur Craftivation untuk menghadirkan booth pameran berdaya pikat tinggi.",
});

const pageGraph = buildPageGraph({
  path: "/approach",
  name: "Pendekatan Kerja | Craftivation Exhibition Contractor",
  description:
    "Metodologi Kenali, Kreasi, dan Implikasi Craftivation untuk booth Modular, Versatile, dan Enterprise.",
  breadcrumbs: [{ name: "Pendekatan Kerja", path: "/approach" }],
});

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
          __html: JSON.stringify(pageGraph).replace(/</g, "\\u003c"),
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
