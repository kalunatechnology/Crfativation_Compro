"use client";

import Image from "next/image";
import { useStats } from "@/lib/useStats";
import AnimatedStat from "@/components/AnimatedStat";

/** Hero and translucent glass statistic cards connected to SQLite. */
export default function HeroSection() {
  const { items: stats } = useStats();

  return (
<section
  id="hero"
  aria-labelledby="hero-title"
  className="homeHero relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#161616] text-white py-20 px-4"
>
  {/* Background Image */}
  <Image
    src="/assets/hero-booth.webp"
    alt="Craftivation Exhibition Contractor"
    fill
    priority
    unoptimized
    sizes="100vw"
    className="homeHero__image absolute inset-0 z-0 object-cover object-center"
  />

  {/* Background Overlay */}
  <div
    className="homeHero__shade absolute inset-0 z-10 bg-black/35"
    aria-hidden="true"
  />

  {/* Headline & Statistics */}
  <div
    className="
      relative z-20 flex w-full max-w-[1140px]
      flex-col items-center text-center
    "
  >
    {/* Main Headline */}
    <h1
      id="hero-title"
      className="
        homeHero__title max-w-[1080px]
        font-normal leading-[1.08]
        tracking-[-0.03em]
      "
      style={{ fontFamily: "var(--font-arsenal)" }}
    >
      Mitra booth dengan pengalaman brand terbaik
    </h1>

    {/* Subtitle */}
    <p
      className="
        homeHero__subtitle mt-5 text-[12px] font-normal
        uppercase tracking-[0.14em]
        sm:mt-7 sm:text-[14px] lg:text-[16px]
      "
    >
      YOUR TRUSTED EXHIBITION CONTRACTOR
    </p>

    {/* GLASS NUMBER CARDS */}
    <div
      aria-label="Statistik Craftivation"
      className="
        homeHero__stats mt-8 grid w-full max-w-[780px]
        grid-cols-3 gap-2
        sm:mt-12 sm:gap-3.5
        lg:mt-16 lg:gap-4
      "
    >
      {stats.map((item, index) => (
        <div
          key={`${item.id || item.key}-${item.value}`}
          className="
            homeHero__stat relative flex min-w-0
            h-[96px] sm:h-[104px] lg:h-[110px]
            flex-row items-center justify-center
            gap-1.5 sm:gap-3 lg:gap-3.5
            overflow-hidden
            border border-white/10
            bg-black/25
            px-2 sm:px-4 lg:px-5 text-white

            backdrop-blur-[24px]
            backdrop-saturate-150
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

          {/* Number with synchronized count-up delay */}
          <AnimatedStat
            value={item.value}
            prefix={item.prefix}
            suffix={item.suffix}
            delay={1300 + index * 140}
          />

          {/* Label – rata kiri, berdampingan dengan angka */}
          <span
            className="
              relative z-10 text-left
              text-[10px] sm:text-[12px] lg:text-[13.5px]
              font-normal leading-[1.25] opacity-85
              whitespace-nowrap shrink-0
            "
          >
            {item.labelLine1}
            <br />
            {item.labelLine2}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* The opening curtain is visual only and never locks document scrolling. */}
  <div className="homeHero__curtain" aria-hidden="true">
    <span className="homeHero__curtainMark">CRAFTIVATION</span>
    <span className="homeHero__curtainTrack"><span /></span>
    <span className="homeHero__curtainLabel">EXHIBITION CONTRACTOR</span>
  </div>
  <a href="#approach" className="homeHero__scrollCue" aria-label="Scroll untuk melihat pendekatan Craftivation">
    <span>SCROLL TO EXPLORE</span>
    <span aria-hidden="true">↓</span>
  </a>
</section>
  );
}
