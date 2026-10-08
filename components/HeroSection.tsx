import Image from "next/image";

/** Hero and translucent glass statistic cards. */
export default function HeroSection() {
  return (
<section
  id="hero"
  aria-labelledby="hero-title"
  className="relative isolate h-[100svh] min-h-[720px] overflow-hidden bg-[#161616] text-white lg:min-h-[800px]"
>
  {/* Background Image */}
  <Image
    src="/assets/hero-booth.webp"
    alt="Craftivation Exhibition Contractor"
    fill
    priority
    unoptimized
    sizes="100vw"
    className="absolute inset-0 z-0 object-cover object-center"
  />

  {/* Background Overlay */}
  <div
    className="absolute inset-0 z-10 bg-black/30"
    aria-hidden="true"
  />

  {/* Headline & Statistics */}
  <div
    className="
      absolute inset-x-0 top-[37%] z-20
      flex flex-col items-center px-4 text-center
      sm:top-[44%] lg:top-[45.5%]
    "
  >
    {/* Main Headline */}
    <h1
      id="hero-title"
      className="
        max-w-[960px]
        text-[29px] font-normal leading-[1.2]
        tracking-[-0.035em]
        sm:text-[34px]
        lg:text-[40px]
      "
    >
      Mitra booth dengan pengalaman brand terbaik
    </h1>

    {/* Subtitle */}
    <p
      className="
        mt-6 text-[11px] font-normal
        uppercase tracking-[0.13em]
        sm:text-[13px] lg:text-[14px]
      "
    >
      YOUR TRUSTED EXHIBITION CONTRACTOR
    </p>

    {/* GLASS NUMBER CARDS */}
    <div
      aria-label="Statistik Craftivation"
      className="
        mt-[95px] grid w-full max-w-[695.29px]
        grid-cols-3 gap-[8px]
        sm:mt-[105px] sm:gap-[15px]
        lg:mt-[128px]
      "
    >
      {[
        { number: "0+", line1: "Booth", line2: "Dibangun" },
        { number: "0+", line1: "Klien", line2: "Terpuaskan" },
        { number: "0+", line1: "Event", line2: "Diikuti" },
      ].map((item, index) => (
        <div
          key={index}
          className="
            relative flex h-[112px] min-w-0
            flex-col items-center justify-center
            gap-1 overflow-hidden
            border border-white/10
            bg-black/25
            px-1 text-white

            backdrop-blur-[24px]
            backdrop-saturate-150

            sm:h-[107.36px]
            sm:flex-row sm:gap-4 sm:px-2
            lg:gap-6
          "
        >
          {/* Glass Reflection */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-br
              from-white/[0.08]
              via-transparent
              to-black/[0.05]
            "
          />

          {/* Top Glass Highlight */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0
              top-0 h-px bg-white/20
            "
          />

          {/* Number */}
          <strong
            className="
              relative z-10 shrink-0
              text-[32px] font-light
              leading-none tracking-[-0.06em]
              sm:text-[44px]
              lg:text-[50px]
            "
          >
            {item.number}
          </strong>

          {/* Label */}
          <span
            className="
              relative z-10 text-center
              text-[11px] font-normal
              leading-[1.3]
              sm:text-left sm:text-[13px]
              lg:text-[16px]
            "
          >
            {item.line1}
            <br />
            {item.line2}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
