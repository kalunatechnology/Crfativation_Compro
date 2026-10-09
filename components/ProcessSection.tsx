"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One continuous, scroll-scrubbed assembly. Frames supplied by the client:
 * Kenali = fine rectangular outline, Kreasi = wood corner + slatted floor,
 * Implikasi = oval cutout, counter and floating shelving.
 *
 * No wheel hijacking: native page scrolling drives the visual progress.
 * Small screens, no JS and reduced-motion users see the complete three-row
 * description in normal document flow instead.
 */
const methods = [
  {
    number: "01",
    title: "Kenali",
    subtitle: "Kami mendengar, sebelum mulai membuat",
    description:
      "Kami menyelaraskan keahlian teknis kami dengan ide cemerlang anda melalui sesi konsultasi mendalam dan observasi venue yang teliti.",
  },
  {
    number: "02",
    title: "Kreasi",
    subtitle: "Kami berkreasi dengan konsep mutakhir",
    description:
      "Mulai dari gambar tiga dimensi, hingga fabrikasi, kami menjamin seluruh produksi dilakukan dengan teliti dan berkualitas tinggi",
  },
  {
    number: "03",
    title: "Implikasi",
    subtitle: "Tidak hanya membangun, kami memberi bukti",
    description:
      "Instalasi kami lakukan dengan ringkas, presisi dan diiringi evaluasi performa pasca acara sebagai garansi dari integritas kami.",
  },
] as const;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
const range = (n: number, start: number, end: number) =>
  ease((n - start) / (end - start));

function MethodStructure({ progress }: { progress: number }) {
  // Separate layers are necessary for a true assembly, not a GIF crossfade.
  const blueprint = 1 - range(progress, 0.08, 0.22);
  const leftWall = range(progress, 0.10, 0.29);
  const rightWall = range(progress, 0.15, 0.33);
  const floor = range(progress, 0.21, 0.39);
  const oval = range(progress, 0.61, 0.71);
  const counter = range(progress, 0.69, 0.81);
  const shelfA = range(progress, 0.76, 0.88);
  const shelfB = range(progress, 0.83, 0.96);
  const stageScale = 0.89 + 0.11 * range(progress, 0.08, 0.4) + 0.025 * range(progress, 0.81, 1);

  return (
    <svg
      className="metodeIllustration metodeIllustration--story"
      viewBox="0 0 440 440"
      role="img"
      aria-label="Konstruksi booth yang berubah dari outline menjadi dinding dan lantai, kemudian lengkap dengan meja dan rak"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="method-wood-left" x1="0" y1="0" x2="1" y2=".75">
          <stop offset="0" stopColor="#a6754e" />
          <stop offset=".42" stopColor="#c1946b" />
          <stop offset=".8" stopColor="#9e6b48" />
          <stop offset="1" stopColor="#75503d" />
        </linearGradient>
        <linearGradient id="method-wood-right" x1="0" y1="0" x2="1" y2=".9">
          <stop offset="0" stopColor="#80573f" />
          <stop offset=".45" stopColor="#b17f58" />
          <stop offset=".8" stopColor="#865c42" />
          <stop offset="1" stopColor="#654530" />
        </linearGradient>
        <pattern id="method-grain" width="58" height="145" patternUnits="userSpaceOnUse">
          <path
            d="M7 -5C-2 30 21 48 7 85S16 131 8 155M22 -5C42 21 11 59 25 89S25 131 18 155M39 -5C21 35 54 60 42 94S49 133 38 155M55 -5C39 33 64 55 49 102S62 133 53 155"
            stroke="#432819" strokeOpacity=".23" strokeWidth="2" fill="none"
          />
          <path d="M14 0C6 30 28 56 13 98M34 0C43 32 28 73 36 139M51 8C40 45 57 95 47 143"
            stroke="#efc5a0" strokeOpacity=".28" strokeWidth="2" fill="none" />
        </pattern>
        <linearGradient id="method-floor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".72" stopColor="#f3f3f3" />
          <stop offset="1" stopColor="#dedede" />
        </linearGradient>
        <linearGradient id="method-counter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c19c75" />
          <stop offset="1" stopColor="#6f4a30" />
        </linearGradient>
      </defs>

      <g style={{ transformOrigin: "220px 220px", transform: "scale(" + stageScale + ")" }}>
        {/* Reference frame 1: a true flat square, NOT a prebuilt 3D box. */}
        <rect x="165" y="162" width="110" height="110" fill="none"
          stroke="#b4b4b4" strokeWidth="1.3"
          style={{ opacity: blueprint, transformOrigin: "220px 217px", transform: "scale(" + (1 + range(progress, 0.02, 0.2) * 0.15) + ")" }} />

        {/* Reference frame 2: two timber walls assemble before the floor settles. */}
        <g style={{ opacity: leftWall, transform: "translate3d(" + (-17 * (1 - leftWall)) + "px," + (-13 * (1 - leftWall)) + "px,0)" }}>
          <path d="M220 49 54 135 54 306 220 221Z" fill="url(#method-wood-left)" stroke="#75553b" strokeWidth="1.6" />
          <path d="M220 49 54 135 54 306 220 221Z" fill="url(#method-grain)" opacity=".75" />
        </g>
        <g style={{ opacity: rightWall, transform: "translate3d(" + (17 * (1 - rightWall)) + "px," + (-13 * (1 - rightWall)) + "px,0)" }}>
          <path d="M220 49 386 135 386 306 220 221Z" fill="url(#method-wood-right)" stroke="#654936" strokeWidth="1.6" />
          <path d="M220 49 386 135 386 306 220 221Z" fill="url(#method-grain)" opacity=".65" />
        </g>
        <g style={{ opacity: floor, transform: "translate3d(0," + (25 * (1 - floor)) + "px,0)" }}>
          <path d="M54 306 220 221 386 306 220 391Z" fill="url(#method-floor)" stroke="#c9c9c9" strokeWidth="2.2" />
          <path d="M85 290 251 375M117 274 283 359M150 257 316 342M183 239 349 324M220 221 386 306"
            fill="none" stroke="#d4d4d4" strokeWidth="1.1" />
          <path d="M54 306 220 391 386 306" fill="none" stroke="#aaa" strokeWidth="1.5" />
        </g>

        {/* Reference frame 3: oval, counter and each shelf install individually. */}
        <g style={{ opacity: oval, transform: "translate3d(0," + (12 * (1 - oval)) + "px,0)" }}>
          <ellipse cx="149" cy="190" rx="37" ry="54" transform="rotate(27 149 190)" fill="#fff" stroke="#e4ddd4" strokeWidth="3.5" />
        </g>
        <g style={{ opacity: counter, transform: "translate3d(0," + (30 * (1 - counter)) + "px,0)" }}>
          <path d="M60 306 220 387 220 425 60 345Z" fill="url(#method-counter)" />
          <path d="M60 306 85 293 246 374 220 387Z" fill="#fafafa" stroke="#dfdfdf" strokeWidth="1.3" />
          <path d="M220 387 246 374 246 412 220 425Z" fill="#987354" />
        </g>
        <g style={{ opacity: shelfA, transform: "translate3d(" + (19 * (1 - shelfA)) + "px," + (-19 * (1 - shelfA)) + "px,0)" }}>
          <path d="M235 166 251 158 337 202 320 212Z" fill="#fff" stroke="#d1d1d1" strokeWidth="1.4" />
          <path d="M320 212 337 202 337 206 320 216Z" fill="#d8d8d8" />
        </g>
        <g style={{ opacity: shelfB, transform: "translate3d(" + (18 * (1 - shelfB)) + "px," + (-16 * (1 - shelfB)) + "px,0)" }}>
          <path d="M234 215 251 206 335 249 319 258Z" fill="#fff" stroke="#d1d1d1" strokeWidth="1.4" />
          <path d="M319 258 335 249 335 254 319 263Z" fill="#d8d8d8" />
          <path d="M289 203 307 193 381 231 364 241Z" fill="#fff" stroke="#d1d1d1" strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
}

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

function copyOpacity(index: number, progress: number) {
  if (index === 0) return 1 - range(progress, 0.24, 0.36);
  if (index === 1) return range(progress, 0.30, 0.42) * (1 - range(progress, 0.62, 0.74));
  return range(progress, 0.69, 0.81);
}

export default function ProcessSection() {
  const storyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [enhanced, setEnhanced] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Keep mobile and accessible reduced-motion rendering in document order.
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

  return (
    <section
      id="method"
      aria-labelledby="metode-title"
      className={"metodeSection" + (enhanced ? " metodeSection--scroll" : "")}
    >
      <div className="metodeSection__heading">
        <h2 id="metode-title">Bagaimana cara kami bekerja?</h2>
      </div>

      {/* A single pinned booth grows while each copy stage transitions. */}
      <div ref={storyRef} className="metodeScrollStory">
        <div className="metodeScrollStory__sticky">
          <div className="metodeScrollStory__panel">
            <div className="metodeScrollStory__art">
              <MethodStructure progress={progress} />
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
                      transform: "translate3d(0," + ((1 - opacity) * 24) + "px,0)",
                      pointerEvents: opacity > 0.96 ? "auto" : "none",
                    }}
                    aria-hidden={opacity < 0.5}
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

      {/* Progressive fallback: all steps remain discoverable and readable. */}
      <div className="metodeSection__panel">
        {methods.map((method, index) => (
          <article key={method.number} className="metodeStage">
            <div className="metodeStage__art">
              <MethodStructure progress={index === 0 ? 0 : index === 1 ? 0.48 : 1} />
            </div>
            <div className="metodeStage__copy">
              <MethodCopy method={method} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
