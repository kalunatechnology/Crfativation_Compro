export type ServiceCardVariant =
  | "light"
  | "dark-gray"
  | "burgundy-curve"
  | "photo-fade"
  | "burgundy-right"
  | "burgundy-stage";

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  variant: ServiceCardVariant;
  image: string;
  secondaryImage?: string;
  imageAlt: string;
  bentoSpan: "full" | "half";
}

export const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: "booth-pameran",
    title: "Booth Pameran",
    description: "Mewujudkan konsep desain menjadi booth berkelas tinggi.",
    variant: "light",
    image: "/assets/services/booth-pameran.webp",
    imageAlt: "Isometrik Booth Pameran Craftivation dengan struktur kayu dan display",
    bentoSpan: "full",
  },
  {
    id: "desain-display-3d",
    title: "Desain Display 3D",
    description:
      "Visualisasi konsep display 3D presisi untuk memaksimalkan daya tarik brand.",
    variant: "dark-gray",
    image: "/assets/services/desain-display-3d.webp",
    imageAlt: "Desain Display 3D booth pameran modern dan pencahayaan",
    bentoSpan: "half",
  },
  {
    id: "kustom-booth-properti",
    title: "Kustom Booth & Properti Brand",
    description:
      "Pembuatan booth kustom dan properti brand sesuai karakter bisnis Anda.",
    variant: "burgundy-curve",
    image: "/assets/services/kustom-properti-1.webp",
    secondaryImage: "/assets/services/kustom-properti-2.webp",
    imageAlt: "Kustom booth dan properti brand berukuran besar untuk aktivasi",
    bentoSpan: "half",
  },
  {
    id: "instalasi-aktivasi",
    title: "Instalasi & Aktivasi",
    description:
      "Pemasangan presisi di lokasi acara hingga aktivasi brand berjalan lancar.",
    variant: "photo-fade",
    image: "/assets/services/instalasi-aktivasi.webp",
    imageAlt: "Tim instalasi Craftivation memasang struktur booth secara presisi",
    bentoSpan: "full",
  },
  {
    id: "interior-fit-out",
    title: "Interior Fit-Out",
    description:
      "Pengerjaan interior komersial, kafe, dan gerai ritel berstandar tinggi.",
    variant: "burgundy-right",
    image: "/assets/services/interior-fit-out.webp",
    imageAlt: "Isometrik Interior Fit-Out gerai ritel dan display produk",
    bentoSpan: "half",
  },
  {
    id: "fabrikasi-event",
    title: "Fabrikasi Event",
    description:
      "Produksi panggung, backdrop, dan struktur acara dengan material terbaik.",
    variant: "burgundy-stage",
    image: "/assets/services/fabrikasi-event.webp",
    imageAlt: "Fabrikasi panggung event dengan backdrop dan sistem pencahayaan",
    bentoSpan: "half",
  },
  {
    id: "dekorasi-event",
    title: "Dekorasi Event",
    description:
      "Penataan dekorasi acara yang estetis untuk menciptakan pengalaman berkesan.",
    variant: "photo-fade",
    image: "/assets/services/dekorasi-event.webp",
    imageAlt: "Dekorasi event outdoor dengan panggung dan instalasi balon",
    bentoSpan: "full",
  },
];
