"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  prefix: string;
  suffix: string;
  delay?: number;
};

/**
 * Menampilkan angka statistik yang menghitung naik secara mulus dari 0 ke target,
 * presisi tanpa jitter menggunakan tabular-nums dan transisi waktu yang sinkron.
 */
export default function AnimatedStat({ value, prefix, suffix, delay = 0 }: AnimatedStatProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const startCountUp = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      if (reducedMotion.matches || value <= 0) {
        setDisplay(Math.max(0, Math.round(value)));
        return;
      }

      // Pastikan dimulai tegas dari 0
      setDisplay(0);

      const delayTimer = setTimeout(() => {
        const DURATION = 1350; // ms: durasi yang terasa halus dan jelas terlihat naik
        const startTime = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / DURATION);

          // Easing: cepat di awal, melambat secara sangat mulus di akhir (easeOutCubic/Quart)
          const eased = 1 - Math.pow(1 - progress, 3.5);

          setDisplay(Math.round(eased * value));

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setDisplay(Math.round(value));
          }
        };

        frame = requestAnimationFrame(tick);
      }, Math.max(0, delay));

      return () => {
        clearTimeout(delayTimer);
      };
    };

    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      const cancel = startCountUp();
      return () => {
        if (cancel) cancel();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          startCountUp();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <strong
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative z-10 shrink-0 text-[24px] font-light leading-none tracking-[-0.04em] tabular-nums sm:text-[36px] lg:text-[44px]"
      style={{ fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' }}
      aria-label={`${prefix}${value}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}{display}{suffix}
      </span>
    </strong>
  );
}
