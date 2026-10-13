"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useProjects } from "@/lib/useProjects";

export default function PortfolioSection() {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const { items: portfolioItems } = useProjects();

  const portfolioTrackRef = useRef<HTMLDivElement>(null);
  const toggleLike = (number: string) =>
    setLikedItems((previous) => ({ ...previous, [number]: !previous[number] }));
  const scrollPortfolio = (direction: "left" | "right") =>
    portfolioTrackRef.current?.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });

  return (
    <section className="portofolioSection" id="projects" aria-labelledby="portfolio-title">
      <div className="portofolioHeader" data-home-reveal="rise">
        <h2 id="portfolio-title" className="portofolioTitle">
          Portofolio Kami
        </h2>

        {/* Carousel navigation buttons */}
        <div className="portofolioArrows" aria-label="Navigasi portofolio">
          <button
            type="button"
            className="portofolioArrow"
            onClick={() => scrollPortfolio("left")}
            aria-label="Proyek sebelumnya"
          >
            ←
          </button>
          <button
            type="button"
            className="portofolioArrow"
            onClick={() => scrollPortfolio("right")}
            aria-label="Proyek selanjutnya"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Slider: width 1440px, height 558px */}
      <div
        className="portofolioSlider"
        ref={portfolioTrackRef}
        role="region"
        aria-label="Geser daftar proyek Craftivation"
        tabIndex={0}
      >
        <div className="portofolioTrack">
          {portfolioItems.map((item) => {
            const projectKey = String(item.id);
            const isLiked = !!likedItems[projectKey];
            const projectUrl = `/projects#${item.slug || item.id}`;

            return (
              <article className="portofolioCard" key={projectKey} data-home-reveal="card">
                {/* Image box with rich hover affordance indicating it's clickable */}
                <Link
                  href={projectUrl}
                  className="portofolioCard__image"
                  aria-label={`Lihat detail proyek ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 600px) 90vw, 865px"
                    className="portofolioCard__imgTag"
                  />
                  <div className="portofolioCard__overlay" aria-hidden="true">
                    <span className="portofolioCard__hoverBadge">
                      Lihat Proyek
                      <span className="portofolioCard__hoverIcon">↗</span>
                    </span>
                  </div>
                </Link>

                {/* Meta row: Title & Number */}
                <div className="portofolioCard__meta">
                  <Link href={projectUrl} className="portofolioCard__titleLink">
                    <h3 className="portofolioCard__title">{item.title}</h3>
                  </Link>
                  <span className="portofolioCard__num">{item.number}</span>
                </div>

                {/* Action Row: Favorite / Like button only */}
                <div className="portofolioCard__actionRow">
                  <button
                    type="button"
                    className={`portofolioCard__like ${isLiked ? "is-liked" : ""}`}
                    onClick={() => toggleLike(projectKey)}
                    aria-label={isLiked ? "Hapus favorit" : "Sukai proyek"}
                  >
                    {isLiked ? "♥" : "♡"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Separated Catalog Button linking to the full projects catalog page */}
      <div className="portofolioCatalogRow" data-home-reveal="rise">
        <Link href="/projects" className="portofolioCatalogBtn">
          <span>Lihat Lebih Banyak</span>
          <span className="portofolioCatalogBtn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

