import Image from "next/image";

/**
 * Footer follows the supplied 1440 × 669 main-footer.svg artboard.
 * SVG logo stays vector-sharp; content remains selectable, accessible and
 * responsive rather than embedding a screenshot of the design.
 */
const footerLinks = [
  { label: "Portofolio", href: "/projects" },
  { label: "Pendekatan", href: "/approach" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Kontak", href: "#contact" },
];

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.01 2a9.96 9.96 0 0 0-8.58 15.03L2 22l5.12-1.34A10 10 0 1 0 12.01 2Zm0 18.12a8.1 8.1 0 0 1-4.11-1.12l-.29-.17-3.04.8.81-2.96-.19-.31A8.12 8.12 0 1 1 12.01 20.12Zm4.45-6.08c-.25-.13-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.95c-.14.16-.28.18-.52.06-1.4-.7-2.33-1.26-3.26-2.85-.25-.42.25-.39.72-1.28.08-.15.04-.28-.02-.4l-.74-1.79c-.19-.46-.39-.39-.54-.4h-.46c-.16 0-.42.06-.64.31-.22.24-.84.82-.84 2.02s.87 2.37.99 2.53c.13.16 1.7 2.6 4.14 3.65 1.54.67 2.14.72 2.92.61.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M3.5 4.5h17A2.5 2.5 0 0 1 23 7v.37l-10.23 7.08a1.38 1.38 0 0 1-1.54 0L1 7.37V7a2.5 2.5 0 0 1 2.5-2.5ZM1 9.62l9.1 6.29a3.37 3.37 0 0 0 3.8 0L23 9.62V17a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 17V9.62Z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M22.16 7.05a2.8 2.8 0 0 0-1.97-1.99C18.46 4.6 12 4.6 12 4.6s-6.46 0-8.19.46a2.8 2.8 0 0 0-1.97 1.99C1.38 8.8 1.38 12 1.38 12s0 3.2.46 4.95a2.8 2.8 0 0 0 1.97 1.99c1.73.46 8.19.46 8.19.46s6.46 0 8.19-.46a2.8 2.8 0 0 0 1.97-1.99c.46-1.75.46-4.95.46-4.95s0-3.2-.46-4.95ZM10 15.36V8.64L15.73 12 10 15.36Z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M4.52 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 9h4.2v13H2.4V9Zm7.1 0h4v1.77h.06A4.38 4.38 0 0 1 17.5 8.6c4.23 0 5 2.78 5 6.4v7h-4.2v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.61-2.37 3.27V22H9.5V9Z"/>
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-1.6 19.87v-7.04H7.86V12h2.54V9.85c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 2.83h-2.34v7.04A10 10 0 0 0 12 2Z"/>
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/craftivation.io?cplk=MXVrZ3RlNDB4czN6Mw==",
    icon: <InstagramIcon />,
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@craftivation.io?igshid=NTc4MTIwNjQ2YQ==",
    icon: <ThreadsIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/craftivationio/",
    icon: <LinkedinIcon />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1A1biMXH2d/?mibextid=wwXIfr",
    icon: <FacebookIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Informasi Craftivation">
      <div className="footer__inner pageShell">
        <div className="footer__brandBlock" data-home-reveal="rise">
          <a className="footer__logoLink" href="/" aria-label="Craftivation — kembali ke beranda">
            <Image
              className="footer__logo"
              src="/assets/logo-white.svg"
              alt="Craftivation Exhibition Contractor"
              width={374}
              height={77}
              sizes="(max-width: 600px) 60vw, 240px"
            />
          </a>
        </div>

        <div className="footer__col footer__contact" data-home-reveal="rise">
          <h2 className="footer__sectionTitle">KONTAK</h2>
          <div className="footer__contactLinks">
            <a
              href="https://wa.me/6282322308719"
              className="footer__contactItem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi Craftivation melalui WhatsApp di +62 823-2230-8719"
            >
              <span className="footer__contactIcon" aria-hidden="true"><WhatsappIcon /></span>
              <span>+62 823-2230-8719</span>
            </a>
            <a href="mailto:corporate@craftivation.com" className="footer__contactItem">
              <span className="footer__contactIcon" aria-hidden="true"><EmailIcon /></span>
              <span className="footer__email">corporate@craftivation.com</span>
            </a>
          </div>
        </div>

        <nav className="footer__col footer__quickLinks" aria-label="Navigasi footer" data-home-reveal="rise">
          <h2 className="footer__sectionTitle">TAUTAN CEPAT</h2>
          <ul className="footer__nav">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer__navLink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__locations" data-home-reveal="rise">
          <div className="footer__locationGroup">
            <h2 className="footer__sectionTitle">BUSINESS OFFICE</h2>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Menara+Rajawali+Mega+Kuningan+Jakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__addressLink"
              aria-label="Buka lokasi Business Office Menara Rajawali di Google Maps"
            >
              <span className="footer__addressText">
                Menara Rajawali 26th Floor Jl. DR. Ide Anak Agung Gde Agung, Jakarta, Indonesia 12950
              </span>
              <span className="footer__addressArrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="footer__locationGroup">
            <h2 className="footer__sectionTitle">PRODUCTION WORKSHOP</h2>
            <a
              href="https://maps.app.goo.gl/wMhkBfd8HkyLqMyDA"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__addressLink"
              aria-label="Buka lokasi Production Workshop di Google Maps"
            >
              <span className="footer__addressText">
                Kavling Tiga Belas, Jl. Djaman Nairin, Sasak Panjang, Tajurhalang, Kab. Bogor, Jawa Barat 16936
              </span>
              <span className="footer__addressArrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom pageShell" data-home-reveal="fade">
        <p className="footer__copy">© 2026 Craftivation</p>
        <nav className="footer__socials" aria-label="Media sosial Craftivation">
          {socials.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
            >
              {icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
