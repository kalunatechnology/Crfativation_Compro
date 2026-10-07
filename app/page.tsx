"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const processSteps = [
  {
    step: "01",
    title: "Kenali",
    kicker: "Kami memahami kebutuhan sebelum menciptakan ruang.",
    description:
      "Kami mengenali karakter brand, tujuan aktivasi, kebutuhan pengunjung, serta konteks venue untuk membentuk arah desain yang tepat sejak awal.",
    visual: "discover",
  },
  {
    step: "02",
    title: "Kreasi",
    kicker: "Ruang dirancang agar brand terasa, bukan sekadar terlihat.",
    description:
      "Setiap gagasan diterjemahkan menjadi desain booth yang fungsional, proporsional, dan kuat secara visual—mulai dari layout, material, hingga pengalaman pengunjung.",
    visual: "create",
  },
  {
    step: "03",
    title: "Implikasi",
    kicker: "Kami wujudkan rancangan menjadi pengalaman yang siap digunakan.",
    description:
      "Produksi, instalasi, dan quality control kami jalankan secara terukur agar hasil akhir tetap sesuai desain dan siap mendukung aktivitas brand di lapangan.",
    visual: "implement",
  },
];

const portfolioItems = [
  {
    number: "01",
    title: "Mid-Century Coffeebooth",
    category: "Commercial Food & Beverage",
    image: "/assets/portfolio-coffeebooth.webp",
    alt: "Mid-Century Coffeebooth di area komersial mall",
  },
  {
    number: "02",
    title: "Gamefinity Brand Activation",
    category: "Brand Activation & Gaming",
    image: "/assets/portfolio-gamefinity.webp",
    alt: "Booth dan brand activation Gamefinity outdoor",
  },
  {
    number: "03",
    title: "Exhibition Project",
    category: "Trade Show & Expo",
    image: "/assets/portfolio-exhibition.webp",
    alt: "Booth exhibition dengan display produk komersial",
  },
];

function ProcessIllustration({ type }: { type: string }) {
  const image =
    type === "discover"
      ? "/assets/portfolio-exhibition.webp"
      : type === "create"
        ? "/assets/portfolio-coffeebooth.webp"
        : "/assets/portfolio-gamefinity.webp";

  if (type === "discover") {
    return (
      <svg
        className="processIso"
        viewBox="0 0 320 250"
        role="img"
        aria-label="Ilustrasi ruang isometrik tahap kenali"
      >
        <defs>
          <linearGradient id="floorGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ececec" />
            <stop offset="100%" stopColor="#cfcfcf" />
          </linearGradient>
        </defs>
        <polygon points="160,24 274,90 274,175 160,241 46,175 46,90" fill="none" stroke="#8f8f8f" strokeWidth="1.2" />
        <polygon points="46,175 160,109 274,175 160,241" fill="url(#floorGradient)" />
        <line x1="160" y1="24" x2="160" y2="109" stroke="#8f8f8f" strokeWidth="1.2" />
        <line x1="46" y1="90" x2="160" y2="109" stroke="#8f8f8f" strokeWidth="1.2" opacity="0" />
        <line x1="46" y1="90" x2="46" y2="175" stroke="#8f8f8f" strokeWidth="1.2" />
        <line x1="274" y1="90" x2="274" y2="175" stroke="#8f8f8f" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg
      className="processIso"
      viewBox="0 0 320 250"
      role="img"
      aria-label={type === "create" ? "Ilustrasi konsep booth" : "Ilustrasi implementasi booth"}
    >
      <defs>
        <clipPath id={"processClip-" + type}>
          <polygon points="42,86 158,22 278,88 278,176 160,242 42,177" />
        </clipPath>
        <linearGradient id={"processShade-" + type} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d1d1d" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5a170f" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g clipPath={"url(#processClip-" + type + ")"}>
        <image href={image} x="20" y="0" width="290" height="250" preserveAspectRatio="xMidYMid slice" />
        <rect x="20" y="0" width="290" height="250" fill={"url(#processShade-" + type + ")"} />
      </g>
      <polygon points="42,86 158,22 278,88 278,176 160,242 42,177" fill="none" stroke="#6f6f6f" strokeWidth="1.1" />
      <line x1="42" y1="177" x2="160" y2="242" stroke="#6f6f6f" strokeWidth="1.1" />
      <line x1="160" y1="242" x2="278" y2="176" stroke="#6f6f6f" strokeWidth="1.1" />
    </svg>
  );
}

export default function Home() {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const portfolioTrackRef = useRef<HTMLDivElement>(null);

  const toggleLike = (num: string) => {
    setLikedItems((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const scrollPortfolio = (direction: "left" | "right") => {
    portfolioTrackRef.current?.scrollBy({
      left: direction === "left" ? -560 : 560,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main className="homepage">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <Image
            className="hero__image"
            src="/assets/hero-booth.webp"
            alt="Mitra booth dengan pengalaman brand terbaik - Craftivation"
            fill
            priority
            unoptimized
          />
          <div className="hero__overlay" aria-hidden="true" />

          <div className="hero__headlineFrame">
            <h1 id="hero-title" className="hero__title">
              Mitra booth dengan pengalaman brand terbaik
            </h1>
            <p className="hero__subtitle">YOUR TRUSTED EXHIBITION CONTRACTOR</p>
          </div>

          <div className="hero__numbersRow" aria-label="Statistik Craftivation">
            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">Booth<br />Dibangun</span>
            </div>
            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">Klien<br />Terpuaskan</span>
            </div>
            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">Event<br />Diikuti</span>
            </div>
          </div>
        </section>

        <section className="hubSection" id="approach" aria-labelledby="hub-title">
          <div className="hubSection__inner">
            <h2 id="hub-title" className="hubTitle">
              Redefining space within commercial needs
            </h2>

            <div className="hubStage">
              <span className="hubEdgeLabel hubEdgeLabel--left">Klien Kami</span>
              <span className="hubEdgeLabel hubEdgeLabel--right">Proyek Kami</span>

              <div className="hubInfoCard hubInfoCard--client">
                <img src="/assets/portfolio-gamefinity.webp" alt="" />
                <div>
                  <strong>Brand Activation</strong>
                  <span>Ruang yang dibentuk dari karakter brand.</span>
                </div>
              </div>

              <div className="hubGraphic">
                <Image
                  src="/assets/craftivation-cube.webp"
                  alt="Craftivation Isometric Stage"
                  fill
                  priority
                  unoptimized
                  className="hubGraphic__cubeImg"
                />
                <div className="hubScreen hubScreen--left" aria-hidden="true">
                  <div className="hubScreen__inner">
                    <img src="/assets/portfolio-gamefinity.webp" alt="" className="hubScreen__img" />
                  </div>
                </div>
                <div className="hubScreen hubScreen--right" aria-hidden="true">
                  <div className="hubScreen__inner">
                    <img src="/assets/portfolio-coffeebooth.webp" alt="" className="hubScreen__img" />
                  </div>
                </div>
                <div className="hubPedestal" aria-hidden="true">
                  <div className="hubPedestal__pillar">
                    <div className="hubPedestal__topLight" />
                  </div>
                </div>
              </div>

              <div className="hubInfoCard hubInfoCard--project">
                <img src="/assets/portfolio-coffeebooth.webp" alt="" />
                <div>
                  <strong>Built for Experience</strong>
                  <span>Desain, produksi, dan instalasi dalam satu alur.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="metodeSection" aria-labelledby="metode-title">
          <div className="metodeContent">
            <h2 id="metode-title" className="metodeTitle">
              Bagaimana cara kami bekerja?
            </h2>

            <div className="metodePanel">
              {processSteps.map((item) => (
                <article className="metodeStep" key={item.step}>
                  <div className="metodeStep__visual">
                    <ProcessIllustration type={item.visual} />
                  </div>

                  <div className="metodeStep__copy">
                    <div className="metodeStep__headingRow">
                      <h3 className="metodeStep__title">{item.title}</h3>
                      <span className="metodeStep__kicker">{item.kicker}</span>
                    </div>
                    <p className="metodeStep__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="portofolioSection" id="projects" aria-labelledby="portfolio-title">
          <div className="portofolioHeader">
            <h2 id="portfolio-title" className="portofolioTitle">
              Portofolio Kami
            </h2>

            <div className="portofolioArrows" aria-label="Navigasi portofolio">
              <button type="button" className="portofolioArrow" onClick={() => scrollPortfolio("left")} aria-label="Proyek sebelumnya">
                ←
              </button>
              <button type="button" className="portofolioArrow" onClick={() => scrollPortfolio("right")} aria-label="Proyek selanjutnya">
                →
              </button>
            </div>
          </div>

          <div className="portofolioSlider" ref={portfolioTrackRef}>
            <div className="portofolioTrack">
              {portfolioItems.map((item) => {
                const isLiked = !!likedItems[item.number];

                return (
                  <article className="portofolioCard" key={item.number}>
                    <div className="portofolioCard__image">
                      <img src={item.image} alt={item.alt} className="portofolioCard__imgTag" />
                    </div>

                    <div className="portofolioCard__meta">
                      <div>
                        <h3 className="portofolioCard__title">{item.title}</h3>
                        <span className="portofolioCard__category">{item.category}</span>
                      </div>
                      <span className="portofolioCard__num">{item.number}</span>
                    </div>

                    <div className="portofolioCard__actionRow">
                      <a href="#contact" className="portofolioCard__btn">
                        Lihat selengkapnya
                      </a>
                      <button
                        type="button"
                        className={"portofolioCard__like" + (isLiked ? " is-liked" : "")}
                        onClick={() => toggleLike(item.number)}
                        aria-label={isLiked ? "Hapus favorit" : "Sukai proyek"}
                      >
                        {isLiked ? "♥" : "♡"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="tentangKamiSection" id="about" aria-labelledby="about-title">
          <div className="aboutCollage aboutCollage--one" aria-hidden="true">
            <img src="/assets/portfolio-gamefinity.webp" alt="" />
          </div>
          <div className="aboutCollage aboutCollage--two" aria-hidden="true">
            <img src="/assets/portfolio-coffeebooth.webp" alt="" />
          </div>
          <div className="aboutCollage aboutCollage--three" aria-hidden="true">
            <img src="/assets/portfolio-exhibition.webp" alt="" />
          </div>

          <div className="tentangKamiContent pageShell">
            <h2 id="about-title" className="tentangKamiTitle">
              Craftivation adalah kontraktor pameran profesional.
            </h2>
            <p className="tentangKamiSubtitle">
              Kami menangani setiap proyek dengan presisi dan perhatian terhadap detail,
              guna memastikan setiap klien mendapatkan pengalaman yang lancar dan berkelas.
            </p>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  );
}
