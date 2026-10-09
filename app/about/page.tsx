import type { Metadata } from "next";
import Image from "next/image";
import HomepageNavbar from "@/components/HomepageNavbar";
import HomepageMotion from "@/components/HomepageMotion";
import AboutSection from "@/components/AboutSection";
import AboutValuesSection from "@/components/AboutValuesSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami | Craftivation Exhibition Contractor",
  description:
    "Kenali Craftivation, kontraktor pameran profesional yang menghadirkan desain, fabrikasi, instalasi, dan brand experience dengan presisi.",
  openGraph: {
    title: "Tentang Kami | Craftivation",
    description: "Craftivation membangun lebih dari sekedar booth.",
    type: "website",
  },
};

/**
 * About page matching the provided 1440 × 3512 aboutus.svg:
 * burgundy hero / original white about-artboard / values slider / CTA / footer.
 * Existing shared components stay wired to their current assets and features.
 */
export default function AboutPage() {
  return (
    <>
      <HomepageMotion />
      <HomepageNavbar variant="about" />
      <main className="homepage aboutPage" id="about-page">
        <section id="about-top" className="aboutHero" aria-labelledby="about-hero-title">
          <div className="aboutHero__shell">
            <div className="aboutHero__collage" aria-label="Suasana pengalaman brand yang menjadi inspirasi Craftivation">
              <div className="aboutHero__photo aboutHero__photo--top">
                <Image
                  src="/assets/about-hero-source.svg"
                  alt="Pengunjung berinteraksi di area komersial dengan meja dan kursi"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 860px) 90vw, 585px"
                />
              </div>
              <div className="aboutHero__photo aboutHero__photo--bottom">
                <Image
                  src="/assets/about-hero-source.svg"
                  alt="Aktivitas pengunjung dan bar kopi dalam sebuah ruang brand"
                  fill
                  unoptimized
                  sizes="(max-width: 860px) 90vw, 585px"
                />
              </div>
            </div>
            <div className="aboutHero__copy">
              <h1 id="about-hero-title">Craftivation membangun<br className="aboutHero__desktopBreak" /> lebih dari sekedar booth.</h1>
              <p>Kami mewujudkan pengalaman yang tak terungkap dari sebuah brand.</p>
            </div>
          </div>
        </section>

        <AboutSection />
        <AboutValuesSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
