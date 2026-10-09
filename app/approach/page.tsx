import type { Metadata } from "next";
import HomepageMotion from "@/components/HomepageMotion";
import HomepageNavbar from "@/components/HomepageNavbar";
import ApproachJourney from "@/components/ApproachJourney";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pendekatan Kami | Craftivation Exhibition Contractor",
  description:
    "Kenali, Kreasi, Implikasi. Pelajari proses konsultasi, konsep, fabrikasi, dan instalasi booth Craftivation serta pilihan Modular, Versatile, dan Enterprise.",
  openGraph: {
    title: "Pendekatan Kami | Craftivation",
    description: "Kenali. Kreasi. Implikasi — cara Craftivation membangun booth untuk brand Anda.",
    type: "website",
  },
};

/**
 * Dedicated approach.svg page. The Hub on homepage stays unchanged.
 * No pinned scroll: every step has its own source-derived illustration
 * and short, GIF-like entrance triggered by natural scrolling.
 */
export default function ApproachPage() {
  return (
    <>
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
