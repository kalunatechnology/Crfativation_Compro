"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// import Navbar from "@/components/Navbar";
import HomepageNavbar from "@/components/HomepageNavbar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HubSection from "@/components/HubSection";

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
      const offset = direction === "left" ? -500 : 500;
      portfolioTrackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <HomepageNavbar />

      <main className="homepage">
        {/* ===================================================================
            SECTION 1: HERO (section/homepage/hero)
            =================================================================== */}

{/* SECTION 1: HERO */}
<section
  id="hero"
  aria-labelledby="hero-title"
  className="relative isolate h-[100svh] min-h-[720px] overflow-hidden bg-[#161616] text-white lg:min-h-[800px]"
>
  {/* Background Image */}
  <Image
    src="/assets/hero-booth.webp"
    alt="Craftivation Exhibition Contractor"
    fill
    priority
    unoptimized
    sizes="100vw"
    className="absolute inset-0 z-0 object-cover object-center"
  />

  {/* Background Overlay */}
  <div
    className="absolute inset-0 z-10 bg-black/30"
    aria-hidden="true"
  />

  {/* Headline & Statistics */}
  <div
    className="
      absolute inset-x-0 top-[37%] z-20
      flex flex-col items-center px-4 text-center
      sm:top-[44%] lg:top-[45.5%]
    "
  >
    {/* Main Headline */}
    <h1
      id="hero-title"
      className="
        max-w-[960px]
        text-[29px] font-normal leading-[1.2]
        tracking-[-0.035em]
        sm:text-[34px]
        lg:text-[40px]
      "
    >
      Mitra booth dengan pengalaman brand terbaik
    </h1>

    {/* Subtitle */}
    <p
      className="
        mt-6 text-[11px] font-normal
        uppercase tracking-[0.13em]
        sm:text-[13px] lg:text-[14px]
      "
    >
      YOUR TRUSTED EXHIBITION CONTRACTOR
    </p>

    {/* GLASS NUMBER CARDS */}
    <div
      aria-label="Statistik Craftivation"
      className="
        mt-[95px] grid w-full max-w-[695.29px]
        grid-cols-3 gap-[8px]
        sm:mt-[105px] sm:gap-[15px]
        lg:mt-[128px]
      "
    >
      {[
        { number: "0+", line1: "Booth", line2: "Dibangun" },
        { number: "0+", line1: "Klien", line2: "Terpuaskan" },
        { number: "0+", line1: "Event", line2: "Diikuti" },
      ].map((item, index) => (
        <div
          key={index}
          className="
            relative flex h-[112px] min-w-0
            flex-col items-center justify-center
            gap-1 overflow-hidden
            border border-white/10
            bg-black/25
            px-1 text-white

            backdrop-blur-[24px]
            backdrop-saturate-150

            sm:h-[107.36px]
            sm:flex-row sm:gap-4 sm:px-2
            lg:gap-6
          "
        >
          {/* Glass Reflection */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-br
              from-white/[0.08]
              via-transparent
              to-black/[0.05]
            "
          />

          {/* Top Glass Highlight */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0
              top-0 h-px bg-white/20
            "
          />

          {/* Number */}
          <strong
            className="
              relative z-10 shrink-0
              text-[32px] font-light
              leading-none tracking-[-0.06em]
              sm:text-[44px]
              lg:text-[50px]
            "
          >
            {item.number}
          </strong>

          {/* Label */}
          <span
            className="
              relative z-10 text-center
              text-[11px] font-normal
              leading-[1.3]
              sm:text-left sm:text-[13px]
              lg:text-[16px]
            "
          >
            {item.line1}
            <br />
            {item.line2}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* ===================================================================
            SECTION 2: HUB / APPROACH (section/homepage/hub)
            =================================================================== */}
            <HubSection />
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
