"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useProjects } from "@/lib/useProjects";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import type { Project } from "@/lib/types";

export default function PortfolioSection() {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { items: portfolioItems } = useProjects();

  const portfolioTrackRef = useRef<HTMLDivElement>(null);

  const toggleLike = (number: string) =>
    setLikedItems((previous) => ({ ...previous, [number]: !previous[number] }));

  // Centers the target card in the middle of the viewport
  const scrollToCard = useCallback((index: number) => {
    const container = portfolioTrackRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>(".portofolioCard");
    const targetCard = cards[index];
    if (!targetCard) return;

    const containerWidth = container.clientWidth;
    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.offsetWidth;
    const targetScrollLeft = cardLeft - (containerWidth - cardWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  // Sync active index when user scrolls manually via touch, drag or wheel
  const syncActiveIndex = useCallback(() => {
    const container = portfolioTrackRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>(".portofolioCard");
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollPortfolio = (direction: "left" | "right") => {
    const total = portfolioItems.length;
    if (total === 0) return;
    const nextIndex =
      direction === "right"
        ? Math.min(total - 1, activeIndex + 1)
        : Math.max(0, activeIndex - 1);
    scrollToCard(nextIndex);
  };

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    // If user clicks a card that is not yet centered, glide it to the center first for optimal UX
    if (activeIndex !== index) {
      e.preventDefault();
      scrollToCard(index);
    }
  };

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex >= portfolioItems.length - 1;

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
            disabled={isAtStart}
            aria-label="Proyek sebelumnya"
          >
            ←
          </button>
          <button
            type="button"
            className="portofolioArrow"
            onClick={() => scrollPortfolio("right")}
            disabled={isAtEnd}
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
        onScroll={syncActiveIndex}
      >
        <div className="portofolioTrack">
          {portfolioItems.map((item, index) => {
            const projectKey = String(item.id);
            const isLiked = !!likedItems[projectKey];
            const projectUrl = `/projects#${item.slug || item.id}`;
            const isActive = activeIndex === index;

            return (
              <article
                className={`portofolioCard ${isActive ? "is-active" : ""}`}
                key={projectKey}
                data-home-reveal="card"
                onClick={(e) => handleCardClick(index, e)}
              >
                {/* Image box with rich hover affordance indicating it's clickable */}
                <Link
                  href={projectUrl}
                  onClick={(e) => {
                    if (isActive) {
                      e.preventDefault();
                      setSelectedProject(item);
                    }
                  }}
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
                  <Link
                    href={projectUrl}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                        setSelectedProject(item);
                      }
                    }}
                    className="portofolioCard__titleLink"
                  >
                    <h3 className="portofolioCard__title">{item.title}</h3>
                  </Link>
                  <span className="portofolioCard__num">{item.number}</span>
                </div>

                {/* Action Row: Favorite / Like button only */}
                <div className="portofolioCard__actionRow">
                  <button
                    type="button"
                    className={`portofolioCard__like ${isLiked ? "is-liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(projectKey);
                    }}
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

      {/* Pop up project details modal matching pop up project details.svg */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={portfolioItems}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </section>
  );
}

