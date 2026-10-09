"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useProjects } from "@/lib/useProjects";

export default function PortfolioSection() {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const { items: portfolioItems } = useProjects();

  const portfolioTrackRef = useRef<HTMLDivElement>(null);
  const toggleLike = (number: string) => setLikedItems(previous => ({ ...previous, [number]: !previous[number] }));
  const scrollPortfolio = (direction: "left" | "right") => portfolioTrackRef.current?.scrollBy({ left: direction === "left" ? -500 : 500, behavior: "smooth" });
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
          <div className="portofolioSlider" ref={portfolioTrackRef} role="region" aria-label="Geser daftar proyek Craftivation" tabIndex={0}>
            <div className="portofolioTrack">
              {portfolioItems.map((item) => {
                const projectKey = String(item.id);
                const isLiked = !!likedItems[projectKey];
                return (
                  <article className="portofolioCard" key={projectKey} data-home-reveal="card">
                    {/* Image box: 865.44px x 467px, border-radius: 29.33px */}
                    <div className="portofolioCard__image">
                      <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="(max-width: 600px) 90vw, 865px" className="portofolioCard__imgTag" />
                    </div>

                    {/* Meta row: Title & Number */}
                    <div className="portofolioCard__meta">
                      <h3 className="portofolioCard__title">{item.title}</h3>
                      <span className="portofolioCard__num">{item.number}</span>
                    </div>

                    {/* Button Lihat lebih banyak & Like */}
                    <div className="portofolioCard__actionRow">
                      <a
                        href={item.href || "#contact"}
                        className="portofolioCard__btn"
                      >
                        Lihat lebih banyak
                      </a>
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
        </section>
  );
}
