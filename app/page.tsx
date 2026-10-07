"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const processSteps = [
  {
    step: "01",
    title: "Pemahaman Brand & Ruang",
    description:
      "Menganalisis identitas brand, fungsi komersial, target pengunjung, dan regulasi venue pameran untuk merumuskan ruang ideal.",
  },
  {
    step: "02",
    title: "Konsep & Desain Visual 3D",
    description:
      "Merancang konsep 3D fotorealistik dengan pertimbangan alur sirkulasi, pencahayaan dramatis, dan seleksi material berkualitas tinggi.",
  },
  {
    step: "03",
    title: "Fabrikasi Workshop Presisi",
    description:
      "Proses produksi booth di workshop Bogor oleh tenaga ahli berpengalaman dengan kontrol kualitas ketat pada setiap detail struktur.",
  },
  {
    step: "04",
    title: "Instalasi & On-Site Handover",
    description:
      "Pengiriman dan instalasi tepat waktu di lokasi event, dilanjutkan pengawasan teknis penuh hingga seluruh aktivasi selesai dengan sempurna.",
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

export default function Home() {
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const portfolioTrackRef = useRef<HTMLDivElement>(null);

  // Auto rotate process steps
  useEffect(() => {
    if (isProcessPaused) return;
    const interval = setInterval(() => {
      setActiveProcessIdx((prev) => (prev + 1) % processSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isProcessPaused]);

  const toggleLike = (num: string) => {
    setLikedItems((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const scrollPortfolio = (direction: "left" | "right") => {
    if (portfolioTrackRef.current) {
      const offset = direction === "left" ? -460 : 460;
      portfolioTrackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <main className="homepage">
        {/* ===================================================================
            SECTION 1: HERO (section/homepage/hero)
            =================================================================== */}
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

          {/* Centered Headline Frame */}
          <div className="hero__headlineFrame">
            <h1 id="hero-title" className="hero__title">
              Mitra booth dengan pengalaman brand terbaik
            </h1>
            <p className="hero__subtitle">YOUR TRUSTED EXHIBITION CONTRACTOR</p>
          </div>

          {/* Numbers / Stats Box from Figma: 695.29px x 107.36px */}
          <div className="hero__numbersRow" aria-label="Statistik Craftivation">
            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">
                Booth
                <br />
                Dibangun
              </span>
            </div>

            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">
                Klien
                <br />
                Terpuaskan
              </span>
            </div>

            <div className="heroNumberBox">
              <strong className="heroNumberVal">0+</strong>
              <span className="heroNumberLabel">
                Event
                <br />
                Diikuti
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: HUB / APPROACH (section/homepage/hub)
            =================================================================== */}
        <section className="hubSection" id="approach" aria-labelledby="hub-title">
          <div className="hubSection__inner">
            <h2 id="hub-title" className="hubTitle">
              Redefining space within commercial needs
            </h2>

            {/* Hub Graphic: 3D Isometric Centerpiece matching Figma */}
            <div className="hubStage">
              {/* Klien Kami Label Left */}
              <div className="hubSideTag hubSideTag--left">
                <span>Klien Kami</span>
              </div>

              {/* Central 3D Podium Container */}
              <div className="hubGraphic">
                <Image
                  src="/assets/craftivation-cube.webp"
                  alt="Craftivation Isometric Stage"
                  fill
                  priority
                  unoptimized
                  className="hubGraphic__cubeImg"
                />

                {/* Left Screen: Gamefinity with Figma transform matrix(0.85, -0.53, 0, 1, 0, 0) */}
                <div className="hubScreen hubScreen--left" title="Aktivasi Gamefinity">
                  <div className="hubScreen__inner">
                    <img
                      src="/assets/portfolio-gamefinity.webp"
                      alt="Gamefinity Brand Activation"
                      className="hubScreen__img"
                    />
                  </div>
                </div>

                {/* Right Screen: Solstice Coffee with Figma transform matrix(0.85, 0.53, 0, 1, 0, 0) */}
                <div className="hubScreen hubScreen--right" title="Mid-Century Coffeebooth">
                  <div className="hubScreen__inner">
                    <img
                      src="/assets/portfolio-coffeebooth.webp"
                      alt="Mid-Century Coffeebooth"
                      className="hubScreen__img"
                    />
                  </div>
                </div>

                {/* Center 3D Pedestal Pillar on Burgundy floor */}
                <div className="hubPedestal" aria-hidden="true">
                  <div className="hubPedestal__pillar">
                    <div className="hubPedestal__topLight" />
                  </div>
                </div>
              </div>

              {/* Proyek Kami Label Right */}
              <div className="hubSideTag hubSideTag--right">
                <span>Proyek Kami</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: METODE / PROCESS (section/homepage/metode)
            =================================================================== */}
        <section className="metodeSection" aria-labelledby="metode-title">
          <div className="metodeGlow" aria-hidden="true" />

          <div
            className="metodeContent"
            onMouseEnter={() => setIsProcessPaused(true)}
            onMouseLeave={() => setIsProcessPaused(false)}
          >
            <h2 id="metode-title" className="metodeTitle">
              Bagaimana cara kami bekerja?
            </h2>

            {/* Interactive Step Card with Glassmorphic styling */}
            <div className="metodeCard">
              <div className="metodeCard__stepTag">
                <span className="metodeCard__stepNum">
                  {processSteps[activeProcessIdx].step}
                </span>
                <span className="metodeCard__stepTotal">/ 04</span>
              </div>

              <h3 className="metodeCard__title">
                {processSteps[activeProcessIdx].title}
              </h3>
              <p className="metodeCard__desc">
                {processSteps[activeProcessIdx].description}
              </p>
            </div>

            {/* 4 Indicator Dots from Figma (80px width, 8px dots) */}
            <div
              className="metodeDots"
              role="tablist"
              aria-label="Tahap cara kerja"
            >
              {processSteps.map((item, idx) => (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={activeProcessIdx === idx}
                  aria-label={`Langkah ${item.step}: ${item.title}`}
                  className={`metodeDot ${activeProcessIdx === idx ? "is-active" : ""}`}
                  onClick={() => setActiveProcessIdx(idx)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: PORTOFOLIO (section/homepage/portofolio)
            =================================================================== */}
        <section className="portofolioSection" id="projects" aria-labelledby="portfolio-title">
          <div className="portofolioHeader">
            <h2 id="portfolio-title" className="portofolioTitle">
              Portofolio Kami
            </h2>

            {/* Carousel navigation buttons */}
            <div className="portofolioArrows" aria-label="Navigasi portofolio">
              <button
                type="button"
                className="portofolioArrow"
                onClick={() => scrollPortfolio("left")}
                aria-label="Proyek sebelumnya"
              >
                ←
              </button>
              <button
                type="button"
                className="portofolioArrow"
                onClick={() => scrollPortfolio("right")}
                aria-label="Proyek selanjutnya"
              >
                →
              </button>
            </div>
          </div>

          {/* Horizontal Slider: width 1440px, height 558px */}
          <div className="portofolioSlider" ref={portfolioTrackRef}>
            <div className="portofolioTrack">
              {portfolioItems.map((item) => {
                const isLiked = !!likedItems[item.number];
                return (
                  <article className="portofolioCard" key={item.number}>
                    {/* Image box: 865.44px x 467px, border-radius: 29.33px */}
                    <div className="portofolioCard__image">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="portofolioCard__imgTag"
                      />
                    </div>

                    {/* Meta row: Title & Number */}
                    <div className="portofolioCard__meta">
                      <h3 className="portofolioCard__title">{item.title}</h3>
                      <span className="portofolioCard__num">{item.number}</span>
                    </div>

                    {/* Button Lihat lebih banyak & Like */}
                    <div className="portofolioCard__actionRow">
                      <a
                        href="#contact"
                        className="portofolioCard__btn"
                      >
                        Lihat lebih banyak
                      </a>
                      <button
                        type="button"
                        className={`portofolioCard__like ${isLiked ? "is-liked" : ""}`}
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

        {/* ===================================================================
            SECTION 5: TENTANG KAMI (section/homepage/tentangkami)
            =================================================================== */}
        <section className="tentangKamiSection" id="about" aria-labelledby="about-title">
          <div className="tentangKamiContent pageShell">
            <h2 id="about-title" className="tentangKamiTitle">
              Craftivation adalah kontraktor pameran profesional.
            </h2>
            <p className="tentangKamiSubtitle">
              Kami menangani setiap proyek dengan presisi dan perhatian terhadap detail, guna memastikan setiap klien mendapatkan pengalaman yang lancar dan berkelas.
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: CTA (cta/card)
            =================================================================== */}
        <CTA />
      </main>

      {/* ===================================================================
          SECTION 7: MAIN FOOTER (main-footer)
          =================================================================== */}
      <Footer />
    </>
  );
}
