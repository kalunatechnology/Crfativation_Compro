import Image from "next/image";

/**
 * Footer follows the supplied 1440 × 669 main-footer.svg artboard.
 * SVG logo stays vector-sharp; content remains selectable, accessible and
 * responsive rather than embedding a screenshot of the design.
 */
const footerLinks = [
  { label: "Project", href: "/#projects" },
  { label: "Approach", href: "/approach" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "#contact" },
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

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
  { name: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
  { name: "YouTube", href: "https://youtube.com", icon: <YoutubeIcon /> },
  { name: "LinkedIn", href: "https://linkedin.com", icon: <LinkedinIcon /> },
  { name: "X", href: "https://x.com", icon: <XIcon /> },
  { name: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
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
              sizes="(max-width: 600px) 80vw, 374px"
            />
          </a>

          <div className="footer__details">
            <h2 className="footer__sectionTitle">CRAFTIVATION WORKSHOP</h2>
            <p className="footer__address">Alamat Bogor</p>

            <h3 className="footer__eyebrow">CONTACT</h3>
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
        </div>

        <nav className="footer__quickLinks" aria-label="Navigasi footer" data-home-reveal="rise">
          <h2 className="footer__sectionTitle">QUICK LINKS</h2>
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
