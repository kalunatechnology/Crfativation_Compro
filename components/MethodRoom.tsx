"use client";

/**
 * 3D Isometric Exhibition Booth (Room)
 * Coordinates & paths sourced directly from room.svg (viewBox="0 0 342 359")
 * with real photorealistic wood patterns and soft gallery spotlights.
 */

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
const range = (n: number, start: number, end: number) =>
  ease((n - start) / (end - start));

export default function MethodRoom({ progress }: { progress: number }) {
  // Staged assembly timings
  // 1. Kenali (0.0 -> 0.25): Clean isometric blueprint
  const blueprint = 1 - range(progress, 0.08, 0.22);

  // 2. Kreasi (0.12 -> 0.45): Structure, wood walls and floor planks
  const leftWall = range(progress, 0.10, 0.28);
  const rightWall = range(progress, 0.12, 0.30);
  const floor = range(progress, 0.18, 0.38);

  // 3. Implikasi (0.55 -> 1.0): Counter, disc, shelves, and warm lighting
  const disc = range(progress, 0.58, 0.70);
  const counter = range(progress, 0.64, 0.76);
  const lighting = range(progress, 0.68, 0.82);
  const shelfTop = range(progress, 0.72, 0.84);
  const shelfMid = range(progress, 0.78, 0.90);
  const shelfRight = range(progress, 0.84, 0.96);

  // Micro scale for interactive feel
  const stageScale = 0.94 + 0.06 * range(progress, 0.08, 0.45);

  return (
    <svg
      className="metodeIllustration metodeIllustration--story"
      viewBox="0 0 342 359"
      role="img"
      aria-label="Konstruksi booth pameran 3D interaktif yang bertransformasi dari sketsa menjadi stan utuh"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>

<pattern id="pattern0_258_2571" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image0_258_2571" transform="matrix(0.000584453 0 0 0.000353107 -0.327586 0)"/>
</pattern>
<pattern id="pattern1_258_2571" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image1_258_2571" transform="matrix(-0.000589026 0 0 -0.000353107 1.33406 1)"/>
</pattern>
<pattern id="pattern2_258_2571" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image0_258_2571" transform="matrix(0.000584045 0 0 0.000353107 -0.327008 0)"/>
</pattern>
<pattern id="pattern3_258_2571" patternContentUnits="objectBoundingBox" width="1" height="1">
<use href="#image2_258_2571" transform="matrix(0.000589026 0 0 0.000353107 -0.334061 0)"/>
</pattern>
<filter id="filter0_f_258_2571" x="138.356" y="-7.24792e-05" width="122.102" height="152.859" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11.3023" result="effect1_foregroundBlur_258_2571"/>
</filter>
<filter id="filter1_f_258_2571" x="204.064" y="41.2426" width="137.131" height="152.859" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11.3023" result="effect1_foregroundBlur_258_2571"/>
</filter>
<filter id="filter2_f_258_2571" x="19.3953" y="20.3891" width="141.325" height="187.46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11.3023" result="effect1_foregroundBlur_258_2571"/>
</filter>
<filter id="filter3_i_258_2571" x="136.732" y="188.062" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter4_i_258_2571" x="110.364" y="201.94" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter5_i_258_2571" x="83.3025" y="215.818" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter6_i_258_2571" x="147.493" y="144.045" width="119.056" height="63.8615" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter7_i_258_2571" x="204.115" y="146.143" width="119.056" height="63.8615" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter8_i_258_2571" x="147.493" y="93.0169" width="119.056" height="63.8615" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter9_i_258_2571" x="56.24" y="229.696" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter10_i_258_2571" x="29.177" y="243.574" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter11_i_258_2571" x="2.11505" y="257.452" width="185.811" height="97.8899" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter12_i_258_2571" x="8.38808" y="216.045" width="177.552" height="93.6799" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-6.34514"/>
<feGaussianBlur stdDeviation="1.58629"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_258_2571"/>
</filter>
<filter id="filter13_d_258_2571" x="38.0491" y="90.0125" width="96.4244" height="114.312" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-3.17257" dy="1.58629"/>
<feGaussianBlur stdDeviation="4.20366"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.419231 0 0 0 0 0.190774 0 0 0 0 0.100777 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_258_2571"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_258_2571" result="shape"/>
</filter>
<linearGradient id="paint0_linear_258_2571" x1="142.251" y1="115.063" x2="73.0478" y2="143.723" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_258_2571" x1="181.233" y1="114.875" x2="250.436" y2="143.535" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_258_2571" x1="225.62" y1="113.128" x2="207.795" y2="148.778" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_258_2571" x1="201.853" y1="13.1677" x2="175.64" y2="119.769" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_258_2571" x1="282.59" y1="54.4103" x2="256.377" y2="161.011" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_258_2571" x1="80.8011" y1="33.5568" x2="107.014" y2="140.158" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint6_linear_258_2571" x1="281.542" y1="168.7" x2="263.717" y2="204.351" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint7_linear_258_2571" x1="224.924" y1="165.904" x2="207.099" y2="201.555" gradientUnits="userSpaceOnUse">
<stop stopColor="#E9D1AB"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint8_linear_258_2571" x1="229.638" y1="194.704" x2="229.638" y2="289.421" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint9_linear_258_2571" x1="188.428" y1="191.234" x2="200.224" y2="210.317" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint10_linear_258_2571" x1="203.27" y1="208.582" x2="203.27" y2="303.3" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint11_linear_258_2571" x1="162.06" y1="205.112" x2="173.856" y2="224.195" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint12_linear_258_2571" x1="176.208" y1="222.46" x2="176.208" y2="317.177" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint13_linear_258_2571" x1="134.998" y1="218.99" x2="146.794" y2="238.073" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint14_linear_258_2571" x1="207.021" y1="149.441" x2="207.021" y2="210.13" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint15_linear_258_2571" x1="180.616" y1="147.218" x2="188.175" y2="159.445" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint16_linear_258_2571" x1="263.643" y1="151.539" x2="263.643" y2="212.228" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint17_linear_258_2571" x1="237.238" y1="149.315" x2="244.796" y2="161.542" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint18_linear_258_2571" x1="207.021" y1="98.4121" x2="207.021" y2="159.101" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint19_linear_258_2571" x1="180.616" y1="96.1895" x2="188.175" y2="108.416" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint20_linear_258_2571" x1="149.146" y1="236.338" x2="149.146" y2="331.056" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint21_linear_258_2571" x1="107.936" y1="232.868" x2="119.732" y2="251.95" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint22_linear_258_2571" x1="122.083" y1="250.215" x2="122.083" y2="344.933" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint23_linear_258_2571" x1="80.8726" y1="246.746" x2="92.6689" y2="265.828" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint24_linear_258_2571" x1="95.021" y1="264.094" x2="95.021" y2="358.812" gradientUnits="userSpaceOnUse">
<stop stopColor="#AAAAAA"/>
<stop offset="1" stopColor="#ACACAC"/>
</linearGradient>
<linearGradient id="paint25_linear_258_2571" x1="53.8107" y1="260.625" x2="65.607" y2="279.707" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint26_linear_258_2571" x1="92.6201" y1="273.741" x2="76.5426" y2="317.43" gradientUnits="userSpaceOnUse">
<stop stopColor="#584131"/>
<stop offset="1" stopColor="#A69170"/>
</linearGradient>
<linearGradient id="paint27_linear_258_2571" x1="182.445" y1="349.587" x2="147.493" y2="349.587" gradientUnits="userSpaceOnUse">
<stop offset="0.6"/>
<stop offset="0.65" stopColor="#666666" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint28_linear_258_2571" x1="57.7857" y1="219.217" x2="69.0577" y2="237.451" gradientUnits="userSpaceOnUse">
<stop stopColor="#D2D2D2"/>
<stop offset="1" stopColor="#F5F5F5"/>
</linearGradient>
<linearGradient id="paint29_linear_258_2571" x1="43.1049" y1="0" x2="43.1049" y2="86.2098" gradientUnits="userSpaceOnUse">
<stop stopColor="#E8E8E8"/>
<stop offset="1" stopColor="#9A9A9A"/>
</linearGradient>
<linearGradient id="paint30_linear_258_2571" x1="43.1049" y1="0" x2="43.1049" y2="86.2098" gradientUnits="userSpaceOnUse">
<stop stopColor="white"/>
<stop offset="1" stopColor="white"/>
</linearGradient>
<image id="image0_258_2571" width="2832" height="2832" preserveAspectRatio="none" href="/assets/room-image0_258_2571.webp" />
<image id="image1_258_2571" width="2832" height="2832" preserveAspectRatio="none" href="/assets/room-image1_258_2571.webp" />
<image id="image2_258_2571" width="2832" height="2832" preserveAspectRatio="none" href="/assets/room-image2_258_2571.webp" />

      </defs>

      <g
        style={{
          transformOrigin: "162px 185px",
          transform: `scale(${stageScale})`,
        }}
      >
        {/* ========================================================
            1. TAHAP KENALI: Wireframe Isometrik Tunggal & Presisi
            Hanya 1 alas belah ketupat yang persis bertemu sudut dinding!
           ======================================================== */}
        <g
          className="svg-frame"
          fill="none"
          stroke="#B3B3B3"
          strokeWidth="2.37943"
          style={{ opacity: blueprint, pointerEvents: "none" }}
        >
          {/* Garis alas lantai (titik sudut: kiri 1.5, belakang 162.0, kanan 322.5, depan 162.0) */}
          <path d="M162.065 195.993L322.545 276.894L162.065 357.794L1.58626 276.894L162.065 195.993Z" />
          {/* Garis dinding kiri */}
          <path d="M5.28775 89.9464L161.801 10.3979V192.058L5.28775 271.606L5.28775 89.9464Z" />
          {/* Garis dinding kanan */}
          <path d="M318.315 89.9464L161.801 10.3979V192.058L318.315 271.606L318.315 89.9464Z" />
        </g>

        {/* ========================================================
            2. TAHAP KREASI: Struktur Utama (Dinding Kayu & Lantai)
           ======================================================== */}
        {/* Dinding Kiri (Tekstur Kayu + Overlay Bayangan) */}
        <g className="svg-side-left" style={{ opacity: leftWall }}>
          <path d="M9.91821e-05 89.944L159.377 8.81152L162.173 10.0216L160.076 194.33L2.09717 277.236L9.91821e-05 275.65L9.91821e-05 89.944Z" fill="url(#pattern0_258_2571)" />
          <path d="M2.097 91.5299L162.173 10.2095V195.916L2.097 277.236L2.097 91.5299Z" fill="url(#pattern1_258_2571)" />
          <path d="M2.097 91.5299L162.173 10.2095V195.916L2.097 277.236L2.097 91.5299Z" fill="url(#paint0_linear_258_2571)" fillOpacity="0.25" />
        </g>

        {/* Dinding Kanan (Tekstur Kayu + Overlay Bayangan) */}
        <g className="svg-side-right" style={{ opacity: rightWall }}>
          <path d="M323.484 89.944L164.107 8.81152L161.311 10.0216L163.408 194.33L321.387 277.049L323.484 275.65L323.484 89.944Z" fill="url(#pattern2_258_2571)" />
          <path d="M321.387 91.3424L161.311 10.022V195.728L321.387 277.049L321.387 91.3424Z" fill="url(#pattern3_258_2571)" />
          <path d="M321.387 91.3424L161.311 10.022V195.728L321.387 277.049L321.387 91.3424Z" fill="url(#paint1_linear_258_2571)" fillOpacity="0.25" />
        </g>

        {/* Alas & Papan Lantai 6 Bilah (Persis menempati koordinat dasar) */}
        <g className="svg-base" style={{ opacity: floor }}>
          {/* Bidang alas abu-abu dasar */}
          <path d="M162.065 195.993L322.545 276.894L162.065 357.794L1.58626 276.894L162.065 195.993Z" fill="#D9D9D9" />

          {/* Bilah Lantai 1 (Paling Belakang) */}
          <g className="svg-layer-large">
            <path d="M162.946 194.704L322.544 272.421V275.89L296.33 289.421L136.732 208.235V204.981L162.946 194.704Z" fill="url(#paint8_linear_258_2571)" />
            <g filter="url(#filter3_i_258_2571)">
              <path d="M162.946 191.234L322.544 272.421L296.329 285.952L136.732 204.765L162.946 191.234Z" fill="url(#paint9_linear_258_2571)" />
            </g>
          </g>

          {/* Bilah Lantai 2 */}
          <g className="svg-layer-large">
            <path d="M136.579 208.582L296.176 286.299V289.768L269.962 303.3L110.364 222.113V218.86L136.579 208.582Z" fill="url(#paint10_linear_258_2571)" />
            <g filter="url(#filter4_i_258_2571)">
              <path d="M136.579 205.112L296.176 286.299L269.962 299.83L110.364 218.643L136.579 205.112Z" fill="url(#paint11_linear_258_2571)" />
            </g>
          </g>

          {/* Bilah Lantai 3 */}
          <g className="svg-layer-large">
            <path d="M109.517 222.46L269.114 300.177V303.646L242.9 317.177L83.3027 235.991V232.738L109.517 222.46Z" fill="url(#paint12_linear_258_2571)" />
            <g filter="url(#filter5_i_258_2571)">
              <path d="M109.517 218.99L269.114 300.177L242.9 313.708L83.3025 232.521L109.517 218.99Z" fill="url(#paint13_linear_258_2571)" />
            </g>
          </g>

          {/* Bilah Lantai 4 */}
          <g className="svg-layer-bottom">
            <path d="M82.4542 236.338L242.051 314.055V317.525L215.837 331.056L56.24 249.869V246.616L82.4542 236.338Z" fill="url(#paint20_linear_258_2571)" />
            <g filter="url(#filter9_i_258_2571)">
              <path d="M82.4542 232.868L242.051 314.055L215.837 327.586L56.24 246.399L82.4542 232.868Z" fill="url(#paint21_linear_258_2571)" />
            </g>
          </g>

          {/* Bilah Lantai 5 */}
          <g className="svg-layer-bottom">
            <path d="M55.3911 250.215L214.988 327.932V331.402L188.774 344.933L29.1769 263.746V260.493L55.3911 250.215Z" fill="url(#paint22_linear_258_2571)" />
            <g filter="url(#filter10_i_258_2571)">
              <path d="M55.3912 246.746L214.988 327.933L188.774 341.464L29.177 260.277L55.3912 246.746Z" fill="url(#paint23_linear_258_2571)" />
            </g>
          </g>

          {/* Bilah Lantai 6 (Paling Depan) */}
          <g className="svg-layer-bottom">
            <path d="M28.3294 264.094L187.927 341.811V345.281L161.712 358.812L2.11523 277.625V274.372L28.3294 264.094Z" fill="url(#paint24_linear_258_2571)" />
            <g filter="url(#filter11_i_258_2571)">
              <path d="M28.3292 260.625L187.926 341.811L161.712 355.342L2.11505 274.156L28.3292 260.625Z" fill="url(#paint25_linear_258_2571)" />
            </g>
          </g>
        </g>

        {/* ========================================================
            3. TAHAP IMPLIKASI: Interior & Pencahayaan
           ======================================================== */}
        {/* Tata Cahaya / Spotlights Dinding */}
        <g className="svg-lighting" style={{ opacity: lighting }}>
          <path d="M273.853 185.184L265.814 148.079L162.009 96.3516V132.701L273.853 185.184Z" fill="url(#paint2_linear_258_2571)" />
          <g filter="url(#filter0_f_258_2571)" style={{ mixBlendMode: "plus-lighter" }}>
            <path d="M237.853 130.254L210.241 32.7403L188.921 22.6045L160.961 70.138V93.4153L237.853 130.254Z" fill="url(#paint3_linear_258_2571)" />
          </g>
          <g filter="url(#filter1_f_258_2571)" style={{ mixBlendMode: "plus-lighter" }}>
            <path d="M318.591 171.497L290.979 73.983L269.659 63.8472L226.669 126.41L241.698 134.658L318.591 171.497Z" fill="url(#paint4_linear_258_2571)" />
          </g>
          <g filter="url(#filter2_f_258_2571)" style={{ mixBlendMode: "plus-lighter" }}>
            <path d="M41.9999 185.245L72.4121 53.1295L93.7323 42.9937L138.115 151.692L41.9999 185.245Z" fill="url(#paint5_linear_258_2571)" />
          </g>
          <path d="M321.737 238.603V203.652L217.932 151.924L201.154 183.778L321.737 238.603Z" fill="url(#paint6_linear_258_2571)" />
          <path d="M273.506 238.054L265.118 200.856L161.313 149.128L161.314 180.982L273.506 238.054Z" fill="url(#paint7_linear_258_2571)" />
        </g>

        {/* Logo Bulat / Disc di Dinding Kiri */}
        <g
          className="svg-disc"
          style={{
            opacity: disc,
            transform: `translate3d(0, ${(1 - disc) * 4}px, 0)`,
          }}
        >
          <g filter="url(#filter13_d_258_2571)">
            <circle cx="43.1049" cy="43.1049" r="43.1049" transform="matrix(0.891007 -0.45399 0 1 49.629 120.648)" fill="url(#paint29_linear_258_2571)" />
            <circle cx="43.1049" cy="43.1049" r="43.1049" transform="matrix(0.891007 -0.45399 0 1 52.4252 123.444)" fill="url(#paint30_linear_258_2571)" />
          </g>
        </g>

        {/* Meja Kasir / Brown Panel di Kiri Depan */}
        <g
          className="svg-brown-panel"
          style={{
            opacity: counter,
            transform: `translate3d(0, ${(1 - counter) * 6}px, 0)`,
          }}
        >
          <path d="M33.4368 222.595L185.94 296.857V336.658L160.891 349.587L8.38785 272.01V232.416L33.4368 222.595Z" fill="url(#paint26_linear_258_2571)" />
          <path d="M33.4368 222.595L185.94 296.857V336.658L160.891 349.587L8.38785 272.01V232.416L33.4368 222.595Z" fill="url(#paint27_linear_258_2571)" fillOpacity="0.2" />
          <g filter="url(#filter12_i_258_2571)">
            <path d="M33.437 219.217L185.94 296.795L160.891 309.724L8.38808 232.147L33.437 219.217Z" fill="url(#paint28_linear_258_2571)" />
          </g>
        </g>

        {/* 3 Ambalan / Rak di Dinding Kanan (Meluncur lembut sesuai sumbu isometrik) */}
        {/* Rak 1 (Atas) */}
        <g
          className="svg-layer-small"
          style={{
            opacity: shelfTop,
            transform: `translate3d(${(1 - shelfTop) * 6}px, ${(1 - shelfTop) * -3}px, 0)`,
          }}
        >
          <path d="M164.29 98.4121L266.55 148.208V150.431L249.753 159.101L147.493 107.082V104.997L164.29 98.4121Z" fill="url(#paint18_linear_258_2571)" />
          <g filter="url(#filter8_i_258_2571)">
            <path d="M164.29 96.1895L266.55 148.209L249.753 156.879L147.493 104.859L164.29 96.1895Z" fill="url(#paint19_linear_258_2571)" />
          </g>
        </g>

        {/* Rak 2 (Tengah) */}
        <g
          className="svg-layer-small"
          style={{
            opacity: shelfMid,
            transform: `translate3d(${(1 - shelfMid) * 6}px, ${(1 - shelfMid) * -3}px, 0)`,
          }}
        >
          <path d="M164.29 149.441L266.55 199.237V201.46L249.753 210.13L147.493 158.111V156.026L164.29 149.441Z" fill="url(#paint14_linear_258_2571)" />
          <g filter="url(#filter6_i_258_2571)">
            <path d="M164.29 147.218L266.55 199.237L249.753 207.907L147.493 155.888L164.29 147.218Z" fill="url(#paint15_linear_258_2571)" />
          </g>
        </g>

        {/* Rak 3 (Kanan Bawah) */}
        <g
          className="svg-layer-small"
          style={{
            opacity: shelfRight,
            transform: `translate3d(${(1 - shelfRight) * 6}px, ${(1 - shelfRight) * -3}px, 0)`,
          }}
        >
          <path d="M220.911 151.539L323.171 201.335V203.558L306.375 212.228L204.115 160.208V158.124L220.911 151.539Z" fill="url(#paint16_linear_258_2571)" />
          <g filter="url(#filter7_i_258_2571)">
            <path d="M220.911 149.315L323.171 201.335L306.375 210.004L204.115 157.985L220.911 149.315Z" fill="url(#paint17_linear_258_2571)" />
          </g>
        </g>
      </g>
    </svg>
  );
}
