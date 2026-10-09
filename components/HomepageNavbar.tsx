"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Portofolio", href: "#projects" },
  { label: "Pendekatan", href: "#approach" },
  { label: "Tentang Kami", href: "#about" },
];

/**
 * Navbar Tailwind khusus Homepage Craftivation.
 * Tidak memakai CSS Module, stylesheet tambahan, atau inline style.
 * <= 20px: charcoal transparan, teks/logo putih.
 * > 20px: putih solid, teks/logo gelap.
 */
export default function HomepageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 20);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    const onResize = () => setMenuOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] box-border h-[70px] w-full transition-[background-color,box-shadow,color] duration-[260ms] ease-in-out motion-reduce:transition-none ${
        scrolled
          ? "bg-white text-[#181818] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
          : "bg-[rgba(0,0,0,0.62)] text-white shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center justify-between gap-6 px-[clamp(20px,3.4722vw,50px)]">
        <a
          href="#hero"
          onClick={closeMenu}
          aria-label="Craftivation - kembali ke bagian utama"
          className="flex h-8 w-[159px] shrink-0 items-center justify-start no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <Image
            src="/assets/logo-black.svg"
            alt="Craftivation Exhibition Contractor"
            width={159}
            height={32}
            priority
            className={`block h-8 w-[159px] object-contain object-left transition-[filter] duration-[260ms] motion-reduce:transition-none ${
              scrolled ? "filter-none" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Desktop: elemen dan jarak tidak berubah saat background berganti. */}
        <nav
          className="hidden items-center justify-end gap-[clamp(26px,3.61vw,52px)] whitespace-nowrap min-[961px]:flex"
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[16px] font-normal leading-[1.2] text-inherit no-underline transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`inline-flex h-[41px] w-[140px] items-center justify-center border border-current bg-transparent px-[10px] text-center text-[16px] font-normal leading-[1.2] text-inherit no-underline transition-[background-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none ${
              scrolled
                ? "hover:bg-[#181818] hover:text-white"
                : "hover:bg-white/15"
            }`}
          >
            Contact Us
          </a>
        </nav>

        {/* Mobile: tombol tiga garis berubah menjadi X saat menu dibuka. */}
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="craftivation-home-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0 text-inherit cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current min-[961px]:hidden"
        >
          <span
            className={`block h-[2px] w-6 origin-center bg-current transition-[transform,opacity] duration-[230ms] ease-in-out motion-reduce:transition-none ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 origin-center bg-current transition-[transform,opacity] duration-[230ms] ease-in-out motion-reduce:transition-none ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-6 origin-center bg-current transition-[transform,opacity] duration-[230ms] ease-in-out motion-reduce:transition-none ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu mobile muncul di bawah navbar tanpa menggeser Hero. */}
      <nav
        id="craftivation-home-mobile-nav"
        aria-label="Navigasi mobile"
        aria-hidden={!menuOpen}
        className={`absolute inset-x-0 top-[70px] flex max-h-[calc(100dvh-70px)] flex-col overflow-y-auto border-t px-[clamp(20px,3.4722vw,50px)] pb-6 pt-3 transition-[opacity,transform,visibility,background-color] duration-[220ms] ease-in-out motion-reduce:transition-none min-[961px]:hidden ${
          scrolled
            ? "border-black/10 bg-white text-[#181818] shadow-[0_15px_26px_rgba(0,0,0,0.08)]"
            : "border-white/15 bg-[rgba(0,0,0,0.94)] text-white"
        } ${
          menuOpen
            ? "visible translate-y-0 opacity-100 pointer-events-auto"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="flex min-h-[50px] items-center text-[16px] font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
          className="mt-3 flex h-11 min-h-11 items-center justify-center border border-current text-[16px] font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Contact Us
        </a>
      </nav>
      <span className="homeScrollProgress" aria-hidden="true" />
    </header>
  );
}
