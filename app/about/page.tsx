import type { Metadata } from "next";
import Image from "next/image";
import HomepageNavbar from "@/components/HomepageNavbar";
import HomepageMotion from "@/components/HomepageMotion";
import AboutSection from "@/components/AboutSection";
import AboutValuesSection from "@/components/AboutValuesSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { buildPageMetadata, buildPageGraph } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tentang Kami",
  description:
    "Kenali Craftivation, kontraktor pameran profesional yang menghadirkan desain, fabrikasi, instalasi, dan brand experience dengan presisi.",
  path: "/about",
  ogDescription:
    "Craftivation membangun lebih dari sekedar booth. Mewujudkan pengalaman presisi untuk brand Anda.",
});

const pageGraph = buildPageGraph({
  path: "/about",
  type: "AboutPage",
  name: "Tentang Kami | Craftivation Exhibition Contractor",
  description:
    "Profil Craftivation, kontraktor pameran profesional di bawah PT Sinergi Muda Arsa.",
  breadcrumbs: [{ name: "Tentang Kami", path: "/about" }],
});

/**
 * About page matching the provided 1440 × 3512 aboutus.svg:
 * burgundy hero / original white about-artboard / values slider / CTA / footer.
 * Existing shared components stay wired to their current assets and features.
 */
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageGraph).replace(/</g, "\\u003c"),
        }}
      />
      <HomepageMotion />
      <HomepageNavbar variant="about" />
      <main className="homepage aboutPage" id="about-page">
        <section id="about-top" className="aboutHero" aria-labelledby="about-hero-title">
          <div className="aboutHero__shell">
            <div className="aboutHero__collage" aria-label="Suasana pengalaman brand yang menjadi inspirasi Craftivation">
              <div className="aboutHero__photo">
                <Image
                  src="/assets/about-hero-source.svg"
                  alt="Suasana pengalaman brand dan aktivitas pengunjung di area komersial"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 900px) 90vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="aboutHero__copy">
              <BreadcrumbNav
                items={[{ name: "Tentang Kami", href: "/about" }]}
                theme="dark"
                className="mb-3"
              />
              <p className="font-[family-name:var(--font-arsenal)] text-[13px] md:text-[15px] tracking-[0.2em] uppercase text-[#E6C6D6] font-bold mb-1">
                Tentang Kami
              </p>
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
