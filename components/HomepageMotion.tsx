"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement: no scroll interception, no fixed body lock,
 * and no hidden elements if JS is unavailable.
 */
export default function HomepageMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.homepage");
    if (!main || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    const progressLine = document.querySelector<HTMLElement>(".homeScrollProgress");
    let frame = 0;
    let scheduledScan = 0;
    let observer: IntersectionObserver | undefined;

    const reveal = (node: HTMLElement) => {
      node.dataset.homeState = "visible";
      observer?.unobserve(node);
    };

    const scan = () => {
      scheduledScan = 0;
      const targets = [
        ...main.querySelectorAll<HTMLElement>("[data-home-reveal]"),
        ...document.querySelectorAll<HTMLElement>("footer [data-home-reveal]"),
      ];
      targets.forEach(node => {
        if (seen.has(node)) return;
        seen.add(node);
        const rect = node.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight * 0.91 &&
          rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
        if (preference.matches || onScreen) reveal(node);
        else {
          node.dataset.homeState = "pending";
          observer?.observe(node);
        }
      });
    };

    const requestScan = () => {
      if (!scheduledScan) scheduledScan = requestAnimationFrame(scan);
    };

    const setupObserver = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -7% 0px" });
      requestScan();
    };

    const scrollProgress = () => {
      frame = 0;
      if (!progressLine) return;
      const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const amount = Math.min(1, Math.max(0, window.scrollY / distance));
      progressLine.style.transform = "scaleX(" + amount + ")";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(scrollProgress);
    };

    setupObserver();
    scrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", requestScan);
    const onPreference = () => {
      if (preference.matches) {
        observer?.disconnect();
        [...main.querySelectorAll<HTMLElement>("[data-home-reveal]"),
         ...document.querySelectorAll<HTMLElement>("footer [data-home-reveal]")].forEach(reveal);
      } else {
        // Already revealed items stay visible; inserted items can animate.
        setupObserver();
      }
    };
    preference.addEventListener("change", onPreference);

    // New cards are inserted when the live SQLite API resolves.
    const mutations = new MutationObserver(changes => {
      if (changes.some(change => change.addedNodes.length)) requestScan();
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", onPreference);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", requestScan);
      if (frame) cancelAnimationFrame(frame);
      if (scheduledScan) cancelAnimationFrame(scheduledScan);
      [...main.querySelectorAll<HTMLElement>("[data-home-reveal]"),
       ...document.querySelectorAll<HTMLElement>("footer [data-home-reveal]")].forEach(reveal);
    };
  }, []);

  return null;
}
