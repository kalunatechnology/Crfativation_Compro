import HomepageNavbar from "@/components/HomepageNavbar";
import HeroSection from "@/components/HeroSection";
import HubSection from "@/components/HubSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/** Composed homepage; interaction stays inside its section components. */
export default function Home() {
  return (
    <>
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
