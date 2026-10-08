import type { ProjectInput, ServiceInput } from "@/lib/types";

// Data awal (seed) untuk SQLite. Dipakai saat tabel masih kosong
// dan sebagai fallback tampilan bila API belum bisa diakses.

export const dummyServices: ServiceInput[] = [
  {
    slug: "modular",
    name: "Modular",
    description:
      "Paket booth praktis dan minimalis untuk kebutuhan jangka pendek brand Anda.",
    image: "/assets/hub-modular.webp",
    href: "#contact",
    sortOrder: 1,
    isActive: true,
  },
  {
    slug: "versatile",
    name: "Versatile",
    description:
      "Paket booth lengkap dan fungsional. Menyesuaikan kebutuhan brand Anda.",
    image: "/assets/hub-versatile.webp",
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
    image: "/assets/hub-midcafe.webp",
    imageAlt:
      "Booth Mid-Century Coffeebooth dengan interior kayu pada area komersial",
    href: "#projects",
    sortOrder: 1,
    isActive: true,
  },
];
