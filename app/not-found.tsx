import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAVIGATION_ITEMS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Halaman yang Anda cari tidak ditemukan di situs Craftivation.",
};

/** 404 kustom: Next.js otomatis mengirim status 404 dan meta noindex. */
export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#FAF8F7] px-6 py-24 text-center text-[#181818]">
      <p className="font-[family-name:var(--font-arsenal)] text-[14px] font-bold uppercase tracking-[0.2em] text-[#4B002B]">
        Error 404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-arsenal)] text-[clamp(32px,5vw,56px)] leading-[1.1]">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-[#181818]/70">
        Alamat yang Anda tuju tidak tersedia atau sudah dipindahkan. Silakan kembali ke beranda atau pilih salah satu halaman berikut.
      </p>
      <nav aria-label="Halaman utama" className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-[44px] items-center border border-[#4B002B] bg-[#4B002B] px-6 font-[family-name:var(--font-arsenal)] text-[18px] text-white no-underline transition-opacity hover:opacity-85"
        >
          Kembali ke Beranda
        </Link>
        {SITE_NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex h-[44px] items-center border border-[#181818] px-6 font-[family-name:var(--font-arsenal)] text-[18px] text-[#181818] no-underline transition-colors hover:bg-[#181818] hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </main>
  );
}
