"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ContactModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global listener jika ada bagian lain yang ingin memicu pembukaan popup
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("craftivation:open-contact-modal", handleOpenEvent);
    return () => {
      window.removeEventListener("craftivation:open-contact-modal", handleOpenEvent);
    };
  }, []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Craftivation Contact Pop Up"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-[5px] animate-[fadeIn_200ms_ease-out_both]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Outer Wrapper untuk memposisikan Tombol X di Pojok Luar agar tidak menutupi logo di dalam SVG */}
      <div
        className="relative w-full max-w-[316px] sm:max-w-[330px] animate-[scaleUp_240ms_cubic-bezier(0.16,1,0.3,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup X Mengambang Elegan di Sudut Kanan Atas */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup popup kontak"
          className="absolute -top-3.5 -right-3.5 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#181818] shadow-[0_4px_14px_rgba(0,0,0,0.22)] border border-black/10 transition-all duration-200 hover:bg-[#52002F] hover:text-white hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#52002F] cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Card Body dengan Sudut Membulat Halus & Shadow Presisi */}
        <div className="relative w-full rounded-[22px] bg-white shadow-[0_25px_60px_-10px_rgba(0,0,0,0.38)] overflow-hidden border border-black/10">
          {/* 100% Desain Asli dari File Contact Card Pop Up.svg Tanpa Distorsi */}
          <div className="relative w-full aspect-[304/433]">
            <Image
              src="/contact-card-pop-up.svg"
              alt="Craftivation Solusi Booth Anda — Contact Card"
              fill
              priority
              unoptimized
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Area Interaktif Tombol 1: Hubungi WhatsApp */}
            <a
              href="https://wa.me/6282322308719"
              target="_blank"
              rel="noopener noreferrer"
              title="Hubungi WhatsApp: +62 823-2230-8719"
              aria-label="Hubungi WhatsApp di +62 823-2230-8719"
              className="group absolute left-[7.89%] top-[52.19%] w-[84.21%] h-[11.31%] rounded-[10px] border border-[#4B002B]/15 bg-transparent transition-all duration-200 hover:border-[#4B002B] hover:bg-[#4B002B]/[0.06] hover:shadow-[0_2px_12px_rgba(75,0,43,0.12)] active:scale-[0.98] cursor-pointer"
            >
              <span className="sr-only">Hubungi WhatsApp: +62 823-2230-8719</span>
            </a>

            {/* Area Interaktif Tombol 2: Kirim Email */}
            <a
              href="mailto:corporate@craftivation.com"
              title="Kirim Email: corporate@craftivation.com"
              aria-label="Kirim Email ke corporate@craftivation.com"
              className="group absolute left-[7.89%] top-[67.67%] w-[84.21%] h-[11.31%] rounded-[10px] border border-[#4B002B]/15 bg-transparent transition-all duration-200 hover:border-[#4B002B] hover:bg-[#4B002B]/[0.06] hover:shadow-[0_2px_12px_rgba(75,0,43,0.12)] active:scale-[0.98] cursor-pointer"
            >
              <span className="sr-only">Kirim Email: corporate@craftivation.com</span>
            </a>

            {/* Area Interaktif Tombol 3: Kunjungi Workshop */}
            <a
              href="https://share.google/Ff9TjKAXUJAPW4JWO"
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi Workshop Craftivation (Buka Google Maps)"
              aria-label="Kunjungi Workshop Craftivation di Google Maps"
              className="group absolute left-[7.89%] top-[83.14%] w-[84.21%] h-[11.31%] rounded-[10px] border border-[#4B002B]/15 bg-transparent transition-all duration-200 hover:border-[#4B002B] hover:bg-[#4B002B]/[0.06] hover:shadow-[0_2px_12px_rgba(75,0,43,0.12)] active:scale-[0.98] cursor-pointer"
            >
              <span className="sr-only">Kunjungi Workshop Craftivation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
