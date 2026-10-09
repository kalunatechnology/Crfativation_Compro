"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/types";

/**
 * Source-derived Approach page, separate from the homepage's pinned Hub.
 * All illustrations are independently cropped from approach.svg, not
 * screenshots of its page layout. Plain native vertical scroll remains free.
 */
const stages = [
  {
    number: "01",
    heading: "Kenali",
    subtitle: "Kami mendengar, sebelum mulai membuat",
    description:
      "Kami menyelaraskan keahlian teknis kami dengan ide cemerlang anda melalui sesi konsultasi mendalam dan observasi venue yang teliti.",
    art: "kenali",
  },
  {
    number: "02",
    heading: "Kreasi",
    subtitle: "Kami berkreasi dengan konsep mutakhir",
    description:
      "Mulai dari gambar tiga dimensi, hingga fabrikasi, kami menjamin seluruh produksi dilakukan dengan teliti dan berkualitas tinggi.",
    art: "kreasi",
  },
  {
    number: "03",
    heading: "Implikasi",
    subtitle: "Tidak hanya membangun, kami memberi bukti",
    description:
      "Instalasi kami lakukan dengan ringkas, presisi dan diiringi evaluasi performa pasca acara sebagai garansi dari integritas kami.",
    art: "implikasi",
  },
] as const;

const defaults = [
  {
    slug: "modular",
    title: "Modular",
    description: "Paket booth praktis dan minimalis untuk kebutuhan jangka pendek brand Anda.",
    image: "/assets/approach-modular.svg",
  },
  {
    slug: "versatile",
    title: "Versatile",
    description: "Paket booth lengkap dan fungsional. Menyesuaikan kebutuhan brand Anda.",
    image: "/assets/approach-versatile.svg",
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    description: "Paket booth premium, material terbaik, untuk pengalaman brand yang maksimal.",
    image: "/assets/approach-enterprise.svg",
  },
] as const;

function BoothStage({ kind }: { kind: (typeof stages)[number]["art"] }) {
  const images = kind === "kenali"
    ? ["kenali"] : kind === "kreasi"
      ? ["kenali", "kreasi"] : ["kenali", "kreasi", "implikasi"];

  return (
    <div className={"approachArt approachArt--" + kind} aria-hidden="true">
      {images.map((frame, idx) => (
        <Image
          key={frame}
          src={"/assets/approach-" + frame + ".svg"}
          alt=""
          width={780}
          height={860}
          unoptimized
          sizes="(max-width: 700px) 82vw, (max-width: 1100px) 37vw, 400px"
          className={"approachArt__frame approachArt__frame--" + (idx === 0 ? "blueprint" : frame === "kreasi" ? "structure" : "finish")}
          draggable={false}
        />
      ))}
    </div>
  );
}

export default function ApproachJourney() {
  const [services, setServices] = useState<Service[]>([]);

  // Preserve live SQLite descriptions/names without depending on API uptime.
  // Enterprise remains a valid designed default until a matching row is added.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/services", { signal: controller.signal, cache: "no-store" })
      .then(response => {
        if (!response.ok) throw new Error("Service API unavailable");
        return response.json();
      })
      .then(payload => {
        if (!controller.signal.aborted && Array.isArray(payload.data)) {
          setServices((payload.data as Service[]).filter(s => s.isActive));
        }
      })
      .catch(() => {
        // Keep source-design cards and copy when SQLite is offline.
      });
    return () => controller.abort();
  }, []);

  const cards = defaults.map(card => {
    const live = services.find(service => service.slug.toLowerCase() === card.slug);
    return {
      ...card,
      title: live?.name || card.title,
      description: live?.description || card.description,
    };
  });

  return (
    <>
      <section className="approachHero" id="approach-top" aria-labelledby="approach-hero-title">
        <Image
          src="/assets/approach-hero.svg"
          alt="Tim produksi sedang mengerjakan instalasi booth secara presisi"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="approachHero__photo"
        />
        <div className="approachHero__shade" aria-hidden="true" />
        <div className="approachHero__copy">
          <h1 id="approach-hero-title">Kenali. Kreasi. Implikasi</h1>
          <p>SIMAK LANGKAH KAMI DALAM MEWUJUDKAN BOOTH TERBAIK<br className="approachHero__desktopBreak" /> UNTUK BRAND ANDA.</p>
        </div>
      </section>

      <section className="approachMethods" aria-label="Tahapan kerja Craftivation" id="method">
        <div className="approachMethods__container">
          {stages.map((stage, index) => (
            <article
              key={stage.number}
              className={"approachStep approachStep--" + (index % 2 === 0 ? "visualLeft" : "visualRight")}
              aria-labelledby={"approach-step-" + stage.number}
              data-home-reveal="rise"
            >
              <div className="approachStep__visual">
                <BoothStage kind={stage.art} />
              </div>
              <div className="approachStep__copy">
                <span className="approachStep__number">{stage.number}</span>
                <div className="approachStep__headingLine">
                  <h2 id={"approach-step-" + stage.number}>{stage.heading}</h2>
                  <p>{stage.subtitle}</p>
                </div>
                <p className="approachStep__description">{stage.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approachPackages" id="packages" aria-labelledby="approach-packages-title">
        <div className="approachPackages__container">
          <h2 id="approach-packages-title" data-home-reveal="rise">
            Kenali apa yang brand Anda butuhkan
          </h2>
          <div className="approachPackages__grid">
            {cards.map((item, index) => (
              <a
                key={item.slug}
                href={"https://wa.me/6282322308719?text=" + encodeURIComponent("Halo Craftivation, saya ingin berkonsultasi mengenai paket " + item.title + ".")}
                target="_blank"
                rel="noopener noreferrer"
                className="approachPackage"
                data-home-reveal="card"
                style={{ transitionDelay: (index * 100) + "ms" }}
                aria-label={"Konsultasi paket " + item.title + " melalui WhatsApp"}
              >
                <span className="approachPackage__art">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 650px) 140px, 160px"
                    className="approachPackage__image"
                  />
                </span>
                <span className="approachPackage__content">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
