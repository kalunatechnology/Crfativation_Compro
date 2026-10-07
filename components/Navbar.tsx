"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Portofolio", href: "#projects" },
  { label: "Pendekatan", href: "#approach" },
  { label: "Tentang Kami", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 30);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className={`siteNav ${scrolled ? "siteNav--scrolled" : "siteNav--top"}`}>
      <div className="siteNav__inner pageShell">
        <a className="siteNav__brand" href="#about" aria-label="Craftivation Home">
          <Image
            src="/assets/logo-white.svg"
            alt="Craftivation Exhibition Contractor"
            width={168}
            height={36}
            priority
            className="siteNav__logo"
          />
        </a>

        <nav className="siteNav__desktop" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="siteNav__link">
              {item.label}
            </a>
          ))}
          <a className="siteNav__contactBtn" href="#contact">
            Contact Us
          </a>
        </nav>

        <button
          className={`siteNav__toggle ${menuOpen ? "is-active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((val) => !val)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`siteNav__mobile ${menuOpen ? "siteNav__mobile--open" : ""}`}
        aria-label="Navigasi mobile"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="siteNav__mobileContact"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
}
