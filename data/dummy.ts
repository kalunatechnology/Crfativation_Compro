import type { ProjectInput, ServiceInput } from "@/lib/types";

// Data awal (seed) untuk SQLite. Dipakai saat tabel masih kosong
// dan sebagai fallback tampilan bila API belum bisa diakses.

export const dummyServices: ServiceInput[] = [
  {
    slug: "modular",
    name: "Modular",
    description:
      "Paket booth praktis dan minimalis untuk kebutuhan jangka pendek brand Anda.",
    image: "/assets/hub-modular.svg",
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
];

export const dummyProjects: ProjectInput[] = [
  {
    slug: "mid-century-coffeebooth",
    number: "01",
    title: "Mid-Century Coffeebooth",
    client: "MidCafe",
    description:
      "Booth kopi bergaya mid-century dengan panel kayu vertikal untuk area komersial.",
    image: "/assets/portfolio-coffeebooth.webp",
    imageAlt:
      "Booth Mid-Century Coffeebooth dengan interior kayu pada area komersial",
    href: "#projects",
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: "gamefinity-brand-activation",
    number: "02",
    title: "Gamefinity Brand Activation",
    client: "Gamefinity",
    description: "Booth dan brand activation bertema gaming untuk interaksi pengunjung.",
    image: "/assets/portfolio-gamefinity.webp",
    imageAlt: "Booth dan brand activation Gamefinity outdoor",
    href: "#projects",
    sortOrder: 2,
    isActive: true,
  },
  {
    slug: "exhibition-project",
    number: "03",
    title: "Exhibition Project",
    client: "Exhibition",
    description: "Booth pameran dengan area display produk untuk kebutuhan komersial.",
    image: "/assets/portfolio-exhibition.webp",
    imageAlt: "Booth exhibition dengan display produk komersial",
    href: "#projects",
    sortOrder: 3,
    isActive: true,
  },
];
