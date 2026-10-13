"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Section: Tentang Kami
 * Sesuai arahan:
 * 1. Tanpa box lantai merah (hanya 3 foto otentik dan teks Arsenal).
 * 2. Proper padding: padding bawah yang lega (pb-28 sm:pb-36 lg:pb-48) mencegah benturan dengan section CTA hitam.
 * 3. Animasi masuk yang ditingkatkan: staggered glide spasial, settling zoom halus, dan kurva cubic-bezier sinematik.
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") {
      setIsVisible(true);
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Selalu sinkronkan visibilitas: saat masuk viewport trigger animasi masuk,
        // saat keluar viewport reset posisi sehingga setiap kali user scroll masuk kembali
        // animasi masuk yang dinamis selalu terputar secara konsisten dan memukau.
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative w-full bg-white text-[#111111] overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-28 sm:pb-36 lg:pb-48"
    >
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-8 flex flex-col gap-10 lg:gap-14">
        
        {/* ================= FOTO 1: Kanan Atas ================= */}
        <div
          className={`w-full flex justify-end transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "opacity-100 translate-y-0 translate-x-0 scale-100"
              : "opacity-0 translate-y-12 translate-x-8 scale-[0.94]"
          }`}
          style={{
            transitionDuration: isVisible ? "1000ms" : "300ms",
            transitionDelay: isVisible ? "180ms" : "0ms",
          }}
        >
          <div className="relative w-full sm:w-[380px] lg:w-[420px] aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-md shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all duration-500 hover:scale-[1.025] hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]">
            <Image
              src="/assest/Photo 1.png"
              alt="Pekerja tim instalasi Craftivation"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 420px"
              className={`object-cover grayscale contrast-[1.06] transition-transform duration-1000 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
              priority
            />
          </div>
        </div>

        {/* ================= TEKS: Tengah ================= */}
        <div
          className={`w-full text-center max-w-[1000px] mx-auto px-2 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-[0.97]"
          }`}
          style={{
            transitionDuration: isVisible ? "1000ms" : "300ms",
            transitionDelay: isVisible ? "60ms" : "0ms",
          }}
        >
          <h2
            id="about-title"
            className="text-3xl sm:text-4xl lg:text-[42px] font-serif tracking-tight text-[#111111] leading-tight lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-arsenal)" }}
          >
            Craftivation adalah kontraktor pameran profesional.
          </h2>
          <p
            className="mt-4 sm:mt-6 text-sm sm:text-base text-[#444444] leading-relaxed max-w-[640px] mx-auto font-light whitespace-normal"
            style={{ fontFamily: "var(--font-arsenal)" }}
          >
            Kami menangani setiap proyek dengan presisi dan perhatian terhadap detail, guna
            memastikan setiap klien mendapatkan pengalaman yang lancar dan berkelas.
          </p>
        </div>

        {/* ================= FOTO 2 & 3: Kiri Bawah & Kanan Bawah ================= */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-6">
          
          {/* FOTO 2: Kiri Bawah (Proses Pengelasan) */}
          <div
            className={`relative w-full sm:w-[320px] lg:w-[360px] aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-md shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] ${
              isVisible
                ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                : "opacity-0 translate-y-14 -translate-x-8 scale-[0.94]"
            }`}
            style={{
              transitionDuration: isVisible ? "1000ms" : "300ms",
              transitionDelay: isVisible ? "340ms" : "0ms",
            }}
          >
            <Image
              src="/assest/Photo 2.png"
              alt="Proses pengelasan dan fabrikasi detail di workshop Craftivation"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 360px"
              className={`object-cover grayscale contrast-[1.06] transition-transform duration-1000 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
          </div>

          {/* FOTO 3: Kanan Bawah (Hasil Booth Pameran) */}
          <div
            className={`relative w-full sm:w-[320px] lg:w-[360px] aspect-[4/3] sm:aspect-[16/11] sm:mt-10 lg:mt-14 overflow-hidden rounded-md shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] ${
              isVisible
                ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                : "opacity-0 translate-y-14 translate-x-8 scale-[0.94]"
            }`}
            style={{
              transitionDuration: isVisible ? "1000ms" : "300ms",
              transitionDelay: isVisible ? "480ms" : "0ms",
            }}
          >
            <Image
              src="/assest/Photo 3.png"
              alt="Hasil booth pameran komersial Craftivation di mall venue"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 360px"
              className={`object-cover grayscale contrast-[1.06] transition-transform duration-1000 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
          </div>

        </div>

      </div>
    </section>
  );
}