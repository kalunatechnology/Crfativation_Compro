import type { Metadata } from "next";
import Image from "next/image";
import HomepageMotion from "@/components/HomepageMotion";
import HomepageNavbar from "@/components/HomepageNavbar";
import ProjectsGallery from "@/components/ProjectsGallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { SITE_URL, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portofolio Proyek | Craftivation Exhibition Contractor",
  description:
    "Jelajahi berbagai proyek booth, exhibition, dan brand activation Craftivation. Portofolio kontraktor pameran profesional di Indonesia.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Portofolio Proyek | Craftivation Exhibition Contractor",
    description: "Solusi booth Craftivation untuk beragam brand terkemuka.",
    url: `${SITE_URL}/projects`,
    type: "website",
    images: ["/assets/hero-booth.webp"],
  },
};

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: "Portofolio Proyek", path: "/projects" },
]);

const expertise = [
  {
    title: "Material tepat guna dan berkualitas tinggi",
    image: "/assets/project-material.svg",
    alt: "Detail struktur dan material booth yang dirancang dengan presisi",
  },
  {
    title: "Profesional, cekatan dan bertanggungjawab",
    image: "/assest/Photo 1.png",
    alt: "Pekerja tim instalasi Craftivation",
  },
  {
    title: "Instalasi dan tepat waktu",
    image: "/assest/Photo 2.png",
    alt: "Proses fabrikasi dan instalasi presisi oleh tim Craftivation",
  },
] as const;

/** Dedicated project.svg page; the gallery uses the exact API/SQLite collection
 * used by the homepage, not six duplicated records from the reference mockup.
 */
export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
      <HomepageMotion />
      <HomepageNavbar variant="projects" />
      <main className="homepage projectsPage">
        <section className="projectsHero" id="projects-top" aria-labelledby="projects-hero-title">
          <div className="projectsHero__shell">
            <div className="projectsHero__copy">
              <h1 id="projects-hero-title">Solusi booth Craftivation<br /> untuk beragam brandmu</h1>
              <p>DIPERCAYA OLEH LEBIH DARI PULUHAN BRAND</p>
            </div>
            <div className="projectsHero__art">
              <div className="projectsHero__hex">
                <Image
                  src="/assets/project-hero.svg"
                  alt="Konsep booth Craftivation dengan display produk dan lantai kayu"
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 850px) 87vw, 560px"
                  className="projectsHero__visual"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="projectsBanner" aria-label="Partner booth untuk brand Anda">
          <Image
            src="/assets/project-banner.svg"
            alt="Ruang exhibition dengan pengunjung dan instalasi display produk"
            fill
            unoptimized
            sizes="100vw"
            className="projectsBanner__image"
          />
          <div className="projectsBanner__shade" aria-hidden="true" />
          <p>Partner untuk optimalkan booth brandmu</p>
        </section>

        <ProjectsGallery />

        <section className="projectsExpertise" aria-label="Keunggulan Craftivation">
          <div className="projectsExpertise__track" role="region" aria-label="Keunggulan Craftivation" tabIndex={0}>
            {[0, 1, 2, 3].map((groupIndex) => (
              <div
                className="projectsExpertise__group"
                key={groupIndex}
                aria-hidden={groupIndex > 0 ? "true" : undefined}
              >
                {expertise.map((item, index) => (
                  <article className="projectsExpertise__card" key={`${item.title}-${index}`}>
                    <Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 650px) 72vw, 380px" />
                    <span className="projectsExpertise__shade" aria-hidden="true" />
                    <h2>{item.title}</h2>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
