import type { CompanyStatInput, ProjectInput, ServiceInput } from "@/lib/types";

// Data awal (seed) untuk SQLite. Dipakai saat tabel masih kosong
// dan sebagai fallback tampilan bila API belum bisa diakses.

export const dummyStats: CompanyStatInput[] = [
  {
    key: "booths_built",
    value: 100,
    suffix: "+",
    prefix: "",
    labelLine1: "Booth",
    labelLine2: "Dibangun",
    sortOrder: 1,
    isActive: true,
  },
  {
    key: "clients_satisfied",
    value: 52,
    suffix: "+",
    prefix: "",
    labelLine1: "Klien",
    labelLine2: "Terpuaskan",
    sortOrder: 2,
    isActive: true,
  },
  {
    key: "events_joined",
    value: 34,
    suffix: "+",
    prefix: "",
    labelLine1: "Event",
    labelLine2: "Diikuti",
    sortOrder: 3,
    isActive: true,
  },
];

export const dummyServices: ServiceInput[] = [
  {
    slug: "modular",
    name: "Modular",
    description:
      "Paket booth praktis dan minimalis untuk kebutuhan jangka pendek brand Anda.",
    image: "/assets/craftivation-room.webp",
    href: "#contact",
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: "versatile",
    name: "Versatile",
    description:
      "Paket booth lengkap dan fungsional. Menyesuaikan kebutuhan brand Anda.",
    image: "/assets/hub-versatile.svg",
    href: "#contact",
    sortOrder: 2,
    isActive: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    description:
      "Paket booth premium, material terbaik, untuk pengalaman brand yang maksimal.",
    image: "/assets/approach-enterprise.svg",
    href: "#contact",
    sortOrder: 3,
    isActive: true,
  },
];

export const dummyProjects: ProjectInput[] = [
  {
    slug: "foom-cafe",
    number: "01",
    title: "Foom Cafe",
    client: "Foom Cafe",
    type: "Fit Out & Custom Furniture",
    location: "BSD City Tangerang",
    year: "2026",
    description:
      "Full fit-out and custom furniture for Foom Cafe in BSD City, Tangerang. We handled the entire build from the ground up — designing the layout, constructing the bar counter, and crafting custom seating pieces that invite guests to settle in and stay awhile. Every corner was built with one goal: making the space feel as warm as the coffee.",
    image: "/assets/portfolio/foom-cafe-1.webp",
    imageAlt: "Foom Cafe BSD City Tangerang fit out dan custom furniture bar counter",
    href: "#projects",
    sortOrder: 1,
    isActive: true,
    images: [
      "/assets/portfolio/foom-cafe-2.webp",
      "/assets/portfolio/foom-cafe-3.webp",
    ],
  },
  {
    slug: "matchaya",
    number: "02",
    title: "Matchaya",
    client: "Matchaya",
    type: "Booth Fit Out & Interior",
    location: "Living World Alam Sutera",
    year: "2026",
    description:
      "Booth fit-out and interior for Matchaya at Living World Alam Sutera. In a busy mall environment, the booth had to do more than display product — it had to stop people mid-walk. We designed a clean, modern interior with efficient display areas and a brand identity that reads clearly from every angle, turning a small footprint into a strong retail presence.",
    image: "/assets/portfolio/matchaya-1.webp",
    imageAlt: "Matchaya booth fit out dan interior di Living World Alam Sutera",
    href: "#projects",
    sortOrder: 2,
    isActive: true,
    images: [
      "/assets/portfolio/matchaya-2.webp",
      "/assets/portfolio/matchaya-3.webp",
      "/assets/portfolio/matchaya-4.webp",
    ],
  },
  {
    slug: "papa-cookies",
    number: "03",
    title: "Papa Cookies",
    client: "Papa Cookies",
    type: "Fit Out & Store Interior",
    location: "Jakarta",
    year: "2026",
    description:
      "Fit-out and custom furniture for Papa Cookies in Jakarta. For an F&B brand, the store is the stage — so we built one that works as hard as the team behind the counter. The fit-out balances operational efficiency for staff with a warm, appetizing atmosphere for customers, and every piece of custom furniture was built for durability without sacrificing style.",
    image: "/assets/portfolio/papa-cookies-1.webp",
    imageAlt: "Papa Cookies Jakarta store interior dan custom furniture",
    href: "#projects",
    sortOrder: 3,
    isActive: true,
    images: [
      "/assets/portfolio/papa-cookies-2.webp",
      "/assets/portfolio/papa-cookies-3.webp",
      "/assets/portfolio/papa-cookies-4.webp",
    ],
  },
  {
    slug: "shake-shake",
    number: "04",
    title: "Shake Shake",
    client: "Shake Shake",
    type: "Fit Out & Store Interior",
    location: "Mal Ciputra Jakarta",
    year: "2026",
    description:
      "Store fit-out and interior for Shake Shake at Mall Ciputra Jakarta. High-volume mall retail demands a space that can keep up — and this one does. We delivered a fit-out that matches the brand's fun, energetic personality while ensuring smooth customer flow and materials that stay fresh-looking under constant foot traffic, day in and day out.",
    image: "/assets/portfolio/shake-shake-1.webp",
    imageAlt: "Shake Shake Mal Ciputra Jakarta store fit out dan interior",
    href: "#projects",
    sortOrder: 4,
    isActive: true,
    images: [
      "/assets/portfolio/shake-shake-2.webp",
      "/assets/portfolio/shake-shake-3.webp",
    ],
  },
  {
    slug: "axis-nation-cup-2026-series",
    number: "05",
    title: "Axis Nation Cup 2026 Series",
    client: "Axis x Gamefinity",
    type: "Activation Booth & Event Organizer",
    location: "Serang & Tangerang",
    year: "2026",
    description:
      "Activation booth and event management for Axis x Gamefinity at Axis Nation Cup 2026 in Serang and Tangerang. This wasn't just a booth to look at — it was built to pull the crowd in, spark gameplay, and create real engagement. We handled everything from booth construction to on-ground event management, keeping the road to the Grand Final full of hype and seamless activation.",
    image: "/assets/portfolio/axis-nation-cup-1.webp",
    imageAlt: "Axis Nation Cup 2026 Series activation booth di Serang dan Tangerang",
    href: "#projects",
    sortOrder: 5,
    isActive: true,
    images: [
      "/assets/portfolio/axis-nation-cup-2.webp",
      "/assets/portfolio/axis-nation-cup-3.webp",
      "/assets/portfolio/axis-nation-cup-4.webp",
    ],
  },
  {
    slug: "grand-final-axis-nation-cup-2026-series",
    number: "06",
    title: "Grand Final Axis Nation Cup 2026 Series",
    client: "Axis x Gamefinity",
    type: "Activation Booth & Event Organizer",
    location: "Istora Senayan Jakarta",
    year: "2026",
    description:
      "Activation booth and event management for the Grand Final of Axis Nation Cup 2026 at ISTORA Senayan, Jakarta. At a venue of this scale, the activation had to be larger than life — and it was. We delivered a booth that matched the energy of the championship, drew crowds throughout the day, and created moments fans won't forget. Major events demand precision, and we brought it.",
    image: "/assets/portfolio/grand-final-axis-1.webp",
    imageAlt: "Grand Final Axis Nation Cup 2026 Series activation booth di Istora Senayan Jakarta",
    href: "#projects",
    sortOrder: 6,
    isActive: true,
    images: [
      "/assets/portfolio/grand-final-axis-2.webp",
      "/assets/portfolio/grand-final-axis-3.webp",
      "/assets/portfolio/grand-final-axis-4.webp",
    ],
  },
  {
    slug: "spotlite-x",
    number: "07",
    title: "Spotlite X",
    client: "Spotlite X",
    type: "Event Decoration",
    location: "Semarang",
    year: "2026",
    description:
      "Event decoration for Spotlite X in Semarang. We designed and built a proper stage backdrop along with full event decorations — pieces that frame the moment and elevate the entire room. From structural build to finishing details, everything was crafted to make Spotlite X look as good as it felt, proving that event decoration is about more than filling a space — it's about setting the stage.",
    image: "/assets/portfolio/spotlite-x-1.webp",
    imageAlt: "Spotlite X Semarang stage backdrop dan event decoration",
    href: "#projects",
    sortOrder: 7,
    isActive: true,
    images: [
      "/assets/portfolio/spotlite-x-2.webp",
      "/assets/portfolio/spotlite-x-3.webp",
      "/assets/portfolio/spotlite-x-4.webp",
    ],
  },
];
