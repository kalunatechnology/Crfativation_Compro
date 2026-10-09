import type { Metadata } from "next";
import Image from "next/image";
import HomepageMotion from "@/components/HomepageMotion";
import HomepageNavbar from "@/components/HomepageNavbar";
import ProjectsGallery from "@/components/ProjectsGallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Project & Portofolio | Craftivation Exhibition Contractor",
  description:
    "Jelajahi berbagai proyek booth, exhibition, dan brand activation Craftivation. Portofolio ditampilkan langsung dari database proyek aktif.",
  openGraph: {
    title: "Project & Portofolio Craftivation",
    description: "Solusi booth Craftivation untuk beragam brand.",
    type: "website",
  },
};

const expertise = [
  {
    title: "Material tepat guna dan berkualitas tinggi",
    image: "/assets/project-material.svg",
    alt: "Detail struktur dan material booth yang dirancang dengan presisi",
  },
  {
    title: "Profesional, cekatan dan bertanggungjawab",
    image: "/assets/project-professional.svg",
    alt: "Tim kontraktor bekerja pada proses fabrikasi booth",
  },
  {
    title: "Instalasi dan pengiriman tepat waktu",
    image: "/assets/project-installation.svg",
    alt: "Tim profesional bekerja mengerjakan instalasi",
  },
] as const;

/** Dedicated project.svg page; the gallery uses the exact API/SQLite collection
 * used by the homepage, not six duplicated records from the reference mockup.
 */
export default function ProjectsPage() {
  return (
    <>
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
          <div className="projectsExpertise__track" role="region" aria-label="Geser untuk melihat keunggulan Craftivation" tabIndex={0}>
            {expertise.map((item, index) => (
              <article className="projectsExpertise__card" key={item.title} data-home-reveal="card">
                <Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 650px) 72vw, 380px" />
                <span className="projectsExpertise__shade" aria-hidden="true" />
                <h2>{item.title}</h2>
              </article>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
