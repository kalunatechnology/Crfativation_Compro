"use client";

import Image from "next/image";
import type { ServiceCardItem } from "@/data/servicesCards";

interface ServiceCardProps {
  item: ServiceCardItem;
  layout?: "compact" | "bento-wide" | "bento-half";
  onClick?: () => void;
}

function getBackgroundStyle(variant: ServiceCardItem["variant"]): React.CSSProperties {
  switch (variant) {
    case "light":
      return { backgroundColor: "#CCCED1" };
    case "dark-gray":
      return {
        background: "linear-gradient(180deg, #565656 0%, #151515 48%, #010001 100%)",
      };
    case "burgundy-curve":
      return {
        background: "linear-gradient(215deg, #36001F 0%, #13000B 60%, #010001 100%)",
      };
    case "burgundy-right":
      return {
        background: "linear-gradient(90deg, #010001 0%, #240015 55%, #4B002B 100%)",
      };
    case "burgundy-stage":
      return {
        background: "linear-gradient(205deg, #36001F 0%, #12000A 55%, #000000 100%)",
      };
    case "photo-fade":
    default:
      return { backgroundColor: "#010001" };
  }
}

export default function ServiceCard({
  item,
  layout = "compact",
  onClick,
}: ServiceCardProps) {
  const isLight = item.variant === "light";
  const isPhotoFade = item.variant === "photo-fade";
  const isWide = layout === "bento-wide";

  return (
    <article
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      style={{
        ...getBackgroundStyle(item.variant),
        borderRadius: "15.5px",
      }}
      className={`group relative overflow-hidden select-none transition-transform duration-300 hover:-translate-y-1 ${
        onClick ? "cursor-pointer" : ""
      } ${
        isWide
          ? "min-h-[210px] sm:min-h-[238px] md:h-[253px]"
          : "min-h-[205px] sm:min-h-[235px] md:h-[254px]"
      }`}
    >
      {/* SVG Decorative Background Curves for matching Figma cards */}
      {item.variant === "burgundy-curve" && (
        <svg
          viewBox="0 0 522 260"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`bg-curve-1-${item.id}`} x1="0" y1="0" x2="260" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4B002B" stopOpacity="0.85" />
              <stop offset="1" stopColor="#14000B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M-30 132C-20 175 18 232 95 258L242 265C220 212 185 162 128 140C65 116 12 124 -30 132Z"
            fill={`url(#bg-curve-1-${item.id})`}
          />
          <circle cx="96" cy="210" r="95" fill="#4B002B" fillOpacity="0.22" />
        </svg>
      )}

      {item.variant === "burgundy-stage" && (
        <svg
          viewBox="0 0 522 255"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`bg-stage-${item.id}`} x1="355" y1="260" x2="355" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#36001F" />
              <stop offset="1" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M210 255C225 180 285 120 390 85L522 45V255H210Z"
            fill={`url(#bg-stage-${item.id})`}
          />
        </svg>
      )}

      {/* Full-bleed Photo Background with Smooth Black Fade on Right */}
      {isPhotoFade ? (
        <>
          <div
            className={`absolute inset-y-0 left-0 overflow-hidden ${
              isWide ? "w-[74%] sm:w-[68%]" : "w-[76%]"
            }`}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              unoptimized
              draggable={false}
              sizes={isWide ? "(max-width: 768px) 90vw, 720px" : "(max-width: 768px) 85vw, 420px"}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: isWide
                ? "linear-gradient(90deg, rgba(1,0,1,0) 18%, rgba(1,0,1,0.72) 48%, #010001 66%)"
                : "linear-gradient(90deg, rgba(1,0,1,0) 12%, rgba(1,0,1,0.78) 46%, #010001 64%)",
            }}
          />
        </>
      ) : null}

      {/* Card Inner Grid: Visual on Left, Indonesian Copy on Right */}
      <div
        className={`relative z-10 flex h-full items-center ${
          isWide ? "gap-4 px-5 py-5 sm:gap-8 sm:px-10" : "gap-3 px-4 py-5 sm:gap-5 sm:px-6"
        }`}
      >
        {/* Left Visual Slot */}
        <div
          className={`relative shrink-0 ${
            isPhotoFade
              ? isWide
                ? "w-[36%] sm:w-[40%]"
                : "w-[36%] sm:w-[40%]"
              : isWide
                ? "h-[160px] w-[38%] sm:h-[195px] sm:w-[40%]"
                : "h-[145px] w-[42%] sm:h-[175px] sm:w-[44%]"
          }`}
        >
          {!isPhotoFade && !item.secondaryImage && (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              unoptimized
              draggable={false}
              sizes={isWide ? "(max-width: 768px) 40vw, 380px" : "(max-width: 768px) 40vw, 240px"}
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}

          {!isPhotoFade && item.secondaryImage && (
            <div className="relative h-full w-full">
              <div className="absolute left-0 top-[6%] h-[82%] w-[64%]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  unoptimized
                  draggable={false}
                  sizes="180px"
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute bottom-[4%] right-0 h-[84%] w-[62%]">
                <Image
                  src={item.secondaryImage}
                  alt=""
                  fill
                  unoptimized
                  draggable={false}
                  sizes="180px"
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Copy Slot */}
        <div
          className={`flex min-w-0 flex-1 flex-col justify-center text-left ${
            isWide ? "pr-2 sm:pr-8" : "pr-1"
          }`}
        >
          <h3
            style={{ fontFamily: "var(--font-arsenal), serif" }}
            className={`font-normal leading-[1.15] tracking-[-0.01em] ${
              isLight ? "text-[#4B002B]" : "text-white"
            } ${
              isWide
                ? "text-[22px] sm:text-[28px] md:text-[32px]"
                : "text-[20px] sm:text-[23px] md:text-[25px]"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2 leading-[1.45] ${
              isLight ? "text-[#4B002B]/85" : "text-white/80"
            } ${
              isWide
                ? "max-w-[440px] text-[13px] sm:text-[15px] md:text-[16px]"
                : "text-[12px] sm:text-[13px] md:text-[13.5px]"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}
