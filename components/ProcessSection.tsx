"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The three-stage composition, terminology and copy follow the supplied
 * "metode.svg" artboard. All illustration parts stay as scalable, sharp SVG.
 * Animations reveal on actual page scroll (not a timer/carousel).
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

/**
 * Lightweight SVG re-creation of the three isometric construction stages.
 * The first stage is deliberately line-only, while the later stages reveal
 * the same wooden exhibition architecture, floor, oval and fixtures.
 */
function MethodStructure({ stage }: { stage: number }) {
  const built = stage > 0;
  return (
    <svg
      viewBox="0 0 440 440"
      role="img"
      aria-label={stage === 0 ? "Kerangka ruang isometrik" : stage === 1 ? "Proses desain dan fabrikasi booth" : "Booth selesai dengan detail instalasi"}
      className="metodeIllustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="method-wood-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a56d45"/>
          <stop offset=".32" stopColor="#c18a5c"/>
          <stop offset=".62" stopColor="#805039"/>
          <stop offset="1" stopColor="#b37d56"/>
        </linearGradient>
        <linearGradient id="method-wood-side" x1="0" y1="0" x2="1" y2=".8">
          <stop offset="0" stopColor="#916040"/>
          <stop offset=".45" stopColor="#c5a07f"/>
          <stop offset=".7" stopColor="#79513a"/>
          <stop offset="1" stopColor="#9f6a49"/>
        </linearGradient>
        <pattern id="method-grain" width="54" height="105" patternUnits="userSpaceOnUse">
          <path d="M8 0C2 26 19 42 10 74S12 104 9 106M19-4C35 19 14 40 27 67S26 97 20 110M38-4C30 20 46 43 37 73S40 99 43 110M51-4C43 15 55 35 49 64S51 95 48 110"
            stroke="#3c2419" strokeOpacity=".28" strokeWidth="1.7" fill="none" />
          <path d="M11 2C16 29 5 41 17 70M32-3C41 30 29 63 33 108M45 5C40 32 49 66 42 92"
            stroke="#f9d6ae" strokeOpacity=".23" strokeWidth="2.2" fill="none" />
        </pattern>
        <linearGradient id="method-floor" x1="0" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#f8f8f8"/>
          <stop offset=".72" stopColor="#ededed"/>
          <stop offset="1" stopColor="#d5d5d5"/>
        </linearGradient>
        <linearGradient id="method-counter" x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#c69c72"/>
          <stop offset="1" stopColor="#63422b"/>
        </linearGradient>
      </defs>

      {built ? (
        <g className="metodeBooth">
          {/* Isometric wooden corner, following the original artboard proportions. */}
          <g className="metodeBooth__walls">
            <path d="M216 34 51 118 51 302 216 218Z" fill="url(#method-wood-front)" stroke="#63452f" strokeWidth="1.7"/>
            <path d="M216 34 382 118 382 302 216 218Z" fill="url(#method-wood-side)" stroke="#63452f" strokeWidth="1.7"/>
            <path d="M216 34 51 118 51 302 216 218Z" fill="url(#method-grain)" opacity=".84"/>
            <path d="M216 34 382 118 382 302 216 218Z" fill="url(#method-grain)" opacity=".6"/>
            {/* White oval cut-out in the left panel. */}
            <ellipse cx="135" cy="168" rx="33" ry="50" transform="rotate(27 135 168)" fill="white" stroke="#e0ddd8" strokeWidth="3"/>
          </g>

          {/* Slatted white display floor rises as production becomes tangible. */}
          <g className="metodeBooth__floor">
            <path d="M51 302 216 218 382 302 216 387Z" fill="url(#method-floor)" stroke="#c9c9c9" strokeWidth="2"/>
            <path d="M95 281 258 364M135 261 300 343M176 241 342 322M217 218 382 302"
              stroke="white" strokeWidth="6" opacity=".98"/>
            <path d="M216 387 382 302" stroke="#bbb" strokeWidth="2"/>
          </g>

          {/* Counters and floating display shelves. */}
          <g className="metodeBooth__fixtures">
            <path d="M51 294 216 376 216 413 51 330Z" fill="url(#method-counter)"/>
            <path d="M51 294 78 281 244 363 216 376Z" fill="#fbfbfb"/>
            <path d="M216 376 244 363 244 401 216 413Z" fill="#9d7857"/>
            <path d="M213 187 232 177 317 219 296 230Z" fill="#fff" stroke="#dcdcdc" strokeWidth="1.3"/>
            <path d="M267 177 286 167 381 216 361 226Z" fill="#fff" stroke="#e2e2e2" strokeWidth="1.3"/>
            {stage === 2 && (
              <g className="metodeBooth__finish">
                <path d="M214 185 318 237 303 245 199 194Z" fill="#fff" stroke="#e4e4e4" strokeWidth="1"/>
                <path d="M216 418 390 330" stroke="#c4c4c4" strokeWidth="2"/>
              </g>
            )}
          </g>
        </g>
      ) : (
        <g className="metodeBooth__outline">
          <path d="M220 32 47 120 47 320 220 233Z" fill="white" stroke="#b6b6b6" strokeWidth="1.6"/>
          <path d="M220 32 393 120 393 320 220 233Z" fill="white" stroke="#b6b6b6" strokeWidth="1.6"/>
          <path d="M47 320 220 233 393 320 220 408Z" fill="#d9d9d9" stroke="#b6b6b6" strokeWidth="1.6"/>
        </g>
      )}
    </svg>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState<boolean[]>([false, false, false]);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    // Pages with JS disabled still render every stage; only enhance when
    // IntersectionObserver is supported and reduced motion is not requested.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches || !("IntersectionObserver" in window)) return;

    const rows = sectionRef.current?.querySelectorAll<HTMLElement>("[data-method-index]");
    if (!rows?.length) return;

    const visibleAtMount = Array.from(rows, row => {
      const bounds = row.getBoundingClientRect();
      return bounds.top < window.innerHeight * .95 && bounds.bottom > 0;
    });
    setEntered(visibleAtMount);
    setMotionReady(true);

    const observer = new IntersectionObserver(
      observations => {
        setEntered(previous => {
          const next = [...previous];
          observations.forEach(observation => {
            if (!observation.isIntersecting) return;
            const index = Number((observation.target as HTMLElement).dataset.methodIndex);
            if (Number.isInteger(index) && index >= 0 && index < next.length) next[index] = true;
          });
          return next.every((entry, index) => entry === previous[index]) ? previous : next;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: .2 }
    );

    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="method"
      ref={sectionRef}
      aria-labelledby="metode-title"
      className={`metodeSection${motionReady ? " metodeSection--animated" : ""}`}
    >
      <div className="metodeSection__heading">
        <h2 id="metode-title">Bagaimana cara kami bekerja?</h2>
      </div>

      <div className="metodeSection__panel">
        {methods.map((method, index) => (
          <article
            key={method.number}
            data-method-index={index}
            data-entered={entered[index] ? "true" : "false"}
            className="metodeStage"
            aria-labelledby={`metode-step-${method.number}`}
          >
            <div className="metodeStage__art" aria-hidden="true">
              <MethodStructure stage={index} />
            </div>
            <div className="metodeStage__copy">
              <div className="metodeStage__headingRow">
                <h3 id={`metode-step-${method.number}`}>{method.title}</h3>
                <p className="metodeStage__subtitle">{method.subtitle}</p>
              </div>
              <p className="metodeStage__description">{method.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
