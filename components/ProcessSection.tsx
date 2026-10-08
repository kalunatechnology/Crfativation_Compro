"use client";
import { useEffect, useState } from "react";

const processSteps = [
  {
    step: "01",
    title: "Pemahaman Brand & Ruang",
    description:
      "Menganalisis identitas brand, fungsi komersial, target pengunjung, dan regulasi venue pameran untuk merumuskan ruang ideal.",
  },
  {
    step: "02",
    title: "Konsep & Desain Visual 3D",
    description:
      "Merancang konsep 3D fotorealistik dengan pertimbangan alur sirkulasi, pencahayaan dramatis, dan seleksi material berkualitas tinggi.",
  },
  {
    step: "03",
    title: "Fabrikasi Workshop Presisi",
    description:
      "Proses produksi booth di workshop Bogor oleh tenaga ahli berpengalaman dengan kontrol kualitas ketat pada setiap detail struktur.",
  },
  {
    step: "04",
    title: "Instalasi & On-Site Handover",
    description:
      "Pengiriman dan instalasi tepat waktu di lokasi event, dilanjutkan pengawasan teknis penuh hingga seluruh aktivasi selesai dengan sempurna.",
  },
];

export default function ProcessSection() {
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  useEffect(() => {
    if (isProcessPaused) return;
    const timer = window.setInterval(() => setActiveProcessIdx(previous => (previous + 1) % processSteps.length), 4500);
    return () => window.clearInterval(timer);
  }, [isProcessPaused]);
  return (
<section className="metodeSection" aria-labelledby="metode-title">
          <div className="metodeGlow" aria-hidden="true" />

          <div
            className="metodeContent"
            onMouseEnter={() => setIsProcessPaused(true)}
            onMouseLeave={() => setIsProcessPaused(false)}
          >
            <h2 id="metode-title" className="metodeTitle">
              Bagaimana cara kami bekerja?
            </h2>

            {/* Interactive Step Card with Glassmorphic styling */}
            <div className="metodeCard">
              <div className="metodeCard__stepTag">
                <span className="metodeCard__stepNum">
                  {processSteps[activeProcessIdx].step}
                </span>
                <span className="metodeCard__stepTotal">/ 04</span>
              </div>

              <h3 className="metodeCard__title">
                {processSteps[activeProcessIdx].title}
              </h3>
              <p className="metodeCard__desc">
                {processSteps[activeProcessIdx].description}
              </p>
            </div>

            {/* 4 Indicator Dots from Figma (80px width, 8px dots) */}
            <div
              className="metodeDots"
              role="tablist"
              aria-label="Tahap cara kerja"
            >
              {processSteps.map((item, idx) => (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={activeProcessIdx === idx}
                  aria-label={`Langkah ${item.step}: ${item.title}`}
                  className={`metodeDot ${activeProcessIdx === idx ? "is-active" : ""}`}
                  onClick={() => setActiveProcessIdx(idx)}
                />
              ))}
            </div>
          </div>
        </section>
  );
}
