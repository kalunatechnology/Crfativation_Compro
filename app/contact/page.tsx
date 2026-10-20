import type { Metadata } from "next";
import Image from "next/image";
import HomepageNavbar from "@/components/HomepageNavbar";
import HomepageMotion from "@/components/HomepageMotion";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { SITE_URL, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hubungi Kami | Craftivation Exhibition Contractor",
  description:
    "Jadwalkan konsultasi proyek booth pameran Anda bersama tim ahli Craftivation via WhatsApp +62 823-2230-8719, email resmi corporate@craftivation.com, atau kunjungi kantor Menara Rajawali Jakarta dan workshop Bogor.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Hubungi Kami | Craftivation Exhibition Contractor",
    description:
      "Konsultasikan konsep booth, exhibition stand, dan aktivasi brand Anda bersama Craftivation. Solusi fabrikasi presisi dari ide hingga instalasi.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: ["/assets/hero-booth.webp"],
  },
};

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: "Hubungi Kami", path: "/contact" },
]);

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Hubungi Kami | Craftivation Exhibition Contractor",
  description:
    "Layanan kontak dan konsultasi resmi Craftivation untuk kebutuhan desain booth pameran, fabrikasi stan komersial, dan aktivasi brand di Indonesia.",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomepageMotion />
      <HomepageNavbar variant="contact" />

      <main className="homepage pt-[90px] md:pt-[110px] bg-[#FAF8F7]">
        {/* Hero Section */}
        <section
          className="relative px-[clamp(20px,4.5vw,70px)] py-12 md:py-20 max-w-[1440px] mx-auto"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-[860px]">
            <p className="font-[family-name:var(--font-arsenal)] text-[14px] md:text-[16px] tracking-[0.2em] uppercase text-[#4B002B] font-bold mb-3">
              Konsultasi & Kemitraan
            </p>
            <h1
              id="contact-heading"
              className="font-[family-name:var(--font-arsenal)] text-[34px] sm:text-[44px] md:text-[56px] leading-[1.08] text-[#181818] font-bold"
            >
              Wujudkan booth pameran <br className="hidden sm:inline" />
              berstandar tinggi bersama kami
            </h1>
            <p className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] text-[#555] leading-relaxed max-w-[720px]">
              Tim spesialis Craftivation siap mendampingi brand Anda mulai dari
              brainstorming konsep visual 3D, pemilihan material fabrikasi,
              hingga instalasi presisi dan on-site maintenance.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: WhatsApp & Email */}
            <article className="rounded-[20px] bg-white p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4B002B]/10 flex items-center justify-center text-[#4B002B] mb-5">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.01 2a9.96 9.96 0 0 0-8.58 15.03L2 22l5.12-1.34A10 10 0 1 0 12.01 2Zm0 18.12a8.1 8.1 0 0 1-4.11-1.12l-.29-.17-3.04.8.81-2.96-.19-.31A8.12 8.12 0 1 1 12.01 20.12Zm4.45-6.08c-.25-.13-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.95c-.14.16-.28.18-.52.06-1.4-.7-2.33-1.26-3.26-2.85-.25-.42.25-.39.72-1.28.08-.15.04-.28-.02-.4l-.74-1.79c-.19-.46-.39-.39-.54-.4h-.46c-.16 0-.42.06-.64.31-.22.24-.84.82-.84 2.02s.87 2.37.99 2.53c.13.16 1.7 2.6 4.14 3.65 1.54.67 2.14.72 2.92.61.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29Z" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-arsenal)] text-[22px] md:text-[24px] font-bold text-[#181818] mb-2">
                  Konsultasi Langsung
                </h2>
                <p className="text-[15px] text-[#666] leading-relaxed mb-6">
                  Diskusikan rancangan booth, estimasi jadwal, dan penawaran teknis dengan tim konsultan kami.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">WhatsApp Resmi</span>
                    <p className="text-[17px] font-bold text-[#181818]">+62 823-2230-8719</p>
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">Email Korespondensi</span>
                    <p className="text-[16px] font-semibold text-[#181818] break-all">corporate@craftivation.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/6282322308719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-arsenal)] inline-flex items-center justify-center h-[44px] px-5 rounded-lg bg-[#4B002B] text-white text-[16px] font-semibold transition-all hover:bg-[#34001e] shadow-sm active:scale-[0.98]"
                >
                  Chat WhatsApp
                </a>
                <a
                  href="mailto:corporate@craftivation.com"
                  style={{ color: "#181818" }}
                  className="font-[family-name:var(--font-arsenal)] inline-flex items-center justify-center h-[44px] px-5 rounded-lg border border-black/20 bg-gray-50 text-[16px] font-semibold transition-colors hover:bg-black/5"
                >
                  Kirim Email
                </a>
              </div>
            </article>

            {/* Card 2: Business Office */}
            <article className="rounded-[20px] bg-white p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4B002B]/10 flex items-center justify-center text-[#4B002B] mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-arsenal)] text-[22px] md:text-[24px] font-bold text-[#181818] mb-2">
                  Business Office
                </h2>
                <p className="text-[15px] text-[#666] leading-relaxed mb-6">
                  Pusat administrasi, konsultasi tatap muka, dan koordinasi strategis proyek client.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">Lokasi</span>
                    <p className="text-[15px] font-medium text-[#181818] leading-snug">
                      Menara Rajawali 26th Floor, Jl. DR. Ide Anak Agung Gde Agung, Mega Kuningan, Jakarta Selatan 12950
                    </p>
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">Jam Operasional</span>
                    <p className="text-[15px] text-[#181818]">Senin – Sabtu: 08:30 – 18:00 WIB</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5 border-t border-black/[0.06]">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Menara+Rajawali+Mega+Kuningan+Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4B002B" }}
                  className="font-[family-name:var(--font-arsenal)] inline-flex items-center justify-center w-full h-[44px] px-5 rounded-lg border border-[#4B002B] bg-white text-[16px] font-bold transition-all hover:bg-[#4B002B] hover:!text-white"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </article>

            {/* Card 3: Production Workshop */}
            <article className="rounded-[20px] bg-white p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4B002B]/10 flex items-center justify-center text-[#4B002B] mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-arsenal)] text-[22px] md:text-[24px] font-bold text-[#181818] mb-2">
                  Production Workshop
                </h2>
                <p className="text-[15px] text-[#666] leading-relaxed mb-6">
                  Fasilitas fabrikasi presisi, mock-up assembly, dan quality control booth pameran komprehensif.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">Lokasi</span>
                    <p className="text-[15px] font-medium text-[#181818] leading-snug">
                      Kavling Tiga Belas, Jl. Djaman Nairin, Sasak Panjang, Tajurhalang, Kab. Bogor, Jawa Barat 16936
                    </p>
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider font-semibold text-[#888]">Layanan</span>
                    <p className="text-[15px] text-[#181818]">Fabrikasi Kayu, Logam, Acrylic, & Lighting</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5 border-t border-black/[0.06]">
                <a
                  href="https://maps.app.goo.gl/wMhkBfd8HkyLqMyDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4B002B" }}
                  className="font-[family-name:var(--font-arsenal)] inline-flex items-center justify-center w-full h-[44px] px-5 rounded-lg border border-[#4B002B] bg-white text-[16px] font-bold transition-all hover:bg-[#4B002B] hover:!text-white"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Visual Callout Section */}
        <section className="px-[clamp(20px,4.5vw,70px)] pb-16 max-w-[1440px] mx-auto">
          <div className="relative rounded-[24px] overflow-hidden bg-[#181818] text-white p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-[620px] z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[13px] font-medium tracking-wide uppercase mb-4 text-[#E6C6D6]">
                Respons Cepat
              </span>
              <h2 className="font-[family-name:var(--font-arsenal)] text-[28px] sm:text-[36px] md:text-[42px] font-bold leading-tight mb-4">
                Punya tenggat waktu pameran yang ketat?
              </h2>
              <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed">
                Tim Craftivation terbiasa dengan jadwal eksekusi cepat tanpa mengorbankan kualitas detail dan kerapian finishing. Kirimkan brief atau layout stan Anda sekarang.
              </p>
            </div>
            <div className="shrink-0 z-10">
              <a
                href="https://wa.me/6282322308719"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4B002B" }}
                className="font-[family-name:var(--font-arsenal)] inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-white text-[18px] font-bold transition-all hover:bg-[#F3E8EE] shadow-lg active:scale-95"
              >
                Mulai Diskusi via WhatsApp
              </a>
            </div>
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#4B002B]/40 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
