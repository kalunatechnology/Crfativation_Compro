"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Error boundary segment: API Next.js versi ini memakai prop `retry` (bukan `reset`). */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#FAF8F7] px-6 py-24 text-center text-[#181818]">
      <p className="font-[family-name:var(--font-arsenal)] text-[14px] font-bold uppercase tracking-[0.2em] text-[#4B002B]">
        Terjadi Kendala
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-arsenal)] text-[clamp(32px,5vw,56px)] leading-[1.1]">
        Halaman gagal dimuat
      </h1>
      <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-[#181818]/70">
        Terjadi kesalahan saat memuat halaman ini. Silakan coba lagi atau kembali ke beranda.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-[44px] cursor-pointer items-center border border-[#4B002B] bg-[#4B002B] px-6 font-[family-name:var(--font-arsenal)] text-[18px] text-white transition-opacity hover:opacity-85"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="inline-flex h-[44px] items-center border border-[#181818] px-6 font-[family-name:var(--font-arsenal)] text-[18px] text-[#181818] no-underline transition-colors hover:bg-[#181818] hover:text-white"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
