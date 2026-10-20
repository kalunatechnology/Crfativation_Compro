"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MethodRoom from "@/components/MethodRoom";

/**
 * Section 3: Metode / Proses Kerja Craftivation.
 * Desktop: Scroll-scrubbed 3D booth assembly with continuous smooth crossfades (never disappears).
 * Mobile / Responsive: High-touch interactive stage controller with crisp typography and instant responsiveness.
 */
const methods = [
  {
    number: "01",
    title: "Kenali",
    subtitle: "Kami mendengar, sebelum mulai membuat",
    description:
      "Kami menyelaraskan keahlian teknis kami dengan ide cemerlang anda melalui sesi konsultasi mendalam dan observasi venue yang teliti.",
    gif: "/assets/approach-kenali.gif",
  },
  {
    number: "02",
    title: "Kreasi",
    subtitle: "Kami berkreasi dengan konsep mutakhir",
    description:
      "Mulai dari gambar tiga dimensi, hingga fabrikasi, kami menjamin seluruh produksi dilakukan dengan teliti dan berkualitas tinggi",
    gif: "/assets/approach-kreasi.gif",
  },
  {
    number: "03",
    title: "Implikasi",
    subtitle: "Tidak hanya membangun, kami memberi bukti",
    description:
      "Instalasi kami lakukan dengan ringkas, presisi dan diiringi evaluasi performa pasca acara sebagai garansi dari integritas kami.",
    gif: "/assets/GIF Complete.gif",
  },
] as const;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
const range = (n: number, start: number, end: number) =>
  ease((n - start) / (end - start));

function MethodCopy({ method }: { method: (typeof methods)[number] }) {
  return (
    <>
      <div className="metodeStage__headingRow">
        <h3>{method.title}</h3>
        <p className="metodeStage__subtitle">{method.subtitle}</p>
      </div>
      <p className="metodeStage__description">{method.description}</p>
    </>
  );
}

/**
 * Continuous smooth crossfade calculation:
 * Ensures the sum of adjacent step opacities is always >= 1.0 during transitions.
 * Eliminates the empty gap where text previously disappeared when scrolling.
 */
function copyOpacity(index: number, progress: number) {
  if (index === 0) {
    if (progress <= 0.26) return 1;
    if (progress >= 0.40) return 0;
    return 1 - range(progress, 0.26, 0.40);
  }
  if (index === 1) {
    if (progress < 0.26) return 0;
    if (progress <= 0.40) return range(progress, 0.26, 0.40);
    if (progress <= 0.60) return 1;
    if (progress >= 0.74) return 0;
    return 1 - range(progress, 0.60, 0.74);
  }
  if (index === 2) {
    if (progress < 0.60) return 0;
    if (progress <= 0.74) return range(progress, 0.60, 0.74);
    return 1;
  }
  return 0;
}

export default function ProcessSection() {
  const storyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [enhanced, setEnhanced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const onChange = () => setEnhanced(motion.matches);
    onChange();
    motion.addEventListener("change", onChange);
    return () => motion.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const measure = () => {
      frameRef.current = 0;
      const node = storyRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const stickyHeight = window.innerHeight - 70;
      const travel = Math.max(1, rect.height - stickyHeight);
      const next = clamp((70 - rect.top) / travel);
      setProgress(prev => Math.abs(prev - next) < 0.0008 ? prev : next);
    };
    const schedule = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enhanced]);

  const currentMobileMethod = methods[mobileActiveIndex];

  return (
    <section
      id="method"
      aria-labelledby="metode-title"
      className={"metodeSection" + (enhanced ? " metodeSection--scroll" : "")}
    >
      <div className="metodeSection__heading" data-home-reveal="rise">
        <h2 id="metode-title">Bagaimana cara kami bekerja?</h2>
      </div>

      {/* DESKTOP PINNED STORY (>= 1024px) */}
      <div ref={storyRef} className="metodeScrollStory">
        <div className="metodeScrollStory__sticky">
          <div className="metodeScrollStory__panel">
            <div className="metodeScrollStory__art">
              <MethodRoom progress={progress} />
            </div>
            <div className="metodeScrollStory__narrative">
              {methods.map((method, index) => {
                const opacity = copyOpacity(index, progress);
                return (
                  <article
                    key={method.number}
                    className="metodeScrollStory__step"
                    style={{
                      opacity,
                      visibility: opacity < 0.005 ? "hidden" : "visible",
                      transform: "translate3d(0," + ((1 - opacity) * 20) + "px,0)",
                      pointerEvents: opacity > 0.85 ? "auto" : "none",
                    }}
                    aria-hidden={opacity < 0.4}
                  >
                    <MethodCopy method={method} />
                  </article>
                );
              })}
              <div className="metodeScrollStory__progress" aria-hidden="true">
                <span style={{ transform: "scaleX(" + progress + ")" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET INTERACTIVE EXPERIENCE (< 1024px) */}
      <div className="metodeSection__mobileView lg:hidden">
        {/* Hidden preloads for instant tab switching without loading flicker */}
        <div className="hidden" aria-hidden="true">
          {methods.map((method) => (
            <Image
              key={`preload-${method.gif}`}
              src={method.gif}
              alt=""
              width={10}
              height={10}
              unoptimized
              priority
            />
          ))}
        </div>

        {/* Step Tab Buttons */}
        <div className="metodeMobileTabs" role="tablist" aria-label="Tahapan metode kerja">
          {methods.map((method, index) => {
            const isActive = mobileActiveIndex === index;
            return (
              <button
                key={method.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`metode-panel-${method.number}`}
                id={`metode-tab-${method.number}`}
                onClick={() => setMobileActiveIndex(index)}
                className={`metodeMobileTab ${isActive ? "is-active" : ""}`}
              >
                <span className="metodeMobileTab__num">{method.number}</span>
                <span className="metodeMobileTab__label">{method.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Card */}
        <article
          id={`metode-panel-${currentMobileMethod.number}`}
          role="tabpanel"
          aria-labelledby={`metode-tab-${currentMobileMethod.number}`}
          className="metodeMobileCard"
        >
          <div className="metodeMobileCard__art">
            <div className="metodeMobileCard__gifWrap">
              <Image
                key={currentMobileMethod.gif}
                src={currentMobileMethod.gif}
                alt={`Animasi tahapan ${currentMobileMethod.title}`}
                width={760}
                height={760}
                unoptimized
                priority
                className="metodeMobileCard__gif"
                draggable={false}
              />
            </div>
          </div>

          <div className="metodeMobileCard__copy">
            <div className="metodeMobileCard__header">
              <span className="metodeMobileCard__badge">{currentMobileMethod.number}</span>
              <div>
                <h3 className="metodeMobileCard__title">{currentMobileMethod.title}</h3>
                <p className="metodeMobileCard__subtitle">{currentMobileMethod.subtitle}</p>
              </div>
            </div>
            <p className="metodeMobileCard__description">{currentMobileMethod.description}</p>
          </div>

          {/* Navigation Controls */}
          <div className="metodeMobileCard__footer">
            <button
              type="button"
              disabled={mobileActiveIndex === 0}
              onClick={() => setMobileActiveIndex(prev => Math.max(0, prev - 1))}
              className="metodeMobileNavBtn"
              aria-label="Tahap sebelumnya"
            >
              ← Sebelumnya
            </button>
            <span className="metodeMobileIndicator">
              {mobileActiveIndex + 1} / {methods.length}
            </span>
            <button
              type="button"
              disabled={mobileActiveIndex === methods.length - 1}
              onClick={() => setMobileActiveIndex(prev => Math.min(methods.length - 1, prev + 1))}
              className="metodeMobileNavBtn"
              aria-label="Tahap berikutnya"
            >
              Selanjutnya →
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
