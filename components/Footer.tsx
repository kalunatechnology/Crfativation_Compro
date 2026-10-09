import Image from "next/image";

const footerLinks = [
  { label: "Project", href: "#projects" },
  { label: "Approach", href: "#approach" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner pageShell">
        <div className="footer__brandBlock" data-home-reveal="rise">
          <Image
            className="footer__logo"
            src="/assets/logo-white.svg"
            alt="Craftivation Exhibition Contractor"
            width={340}
            height={70}
          />

          <div className="footer__details">
            <h3 className="footer__sectionTitle">CRAFTIVATION WORKSHOP</h3>
            <p className="footer__address">Alamat Bogor</p>

            <span className="footer__eyebrow">CONTACT</span>
            <div className="footer__contactLinks">
              <a href="tel:+6282322308719" className="footer__contactItem">
                <span className="footer__contactIcon" aria-hidden="true">📞</span>
                +62 823-2230-8719
              </a>
              <a href="mailto:corporate@craftivation.com" className="footer__contactItem">
                <span className="footer__contactIcon" aria-hidden="true">✉</span>
                corporate@craftivation.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer__quickLinks" data-home-reveal="rise">
          <h3 className="footer__sectionTitle">QUICK LINKS</h3>
          <ul className="footer__nav">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer__navLink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom pageShell" data-home-reveal="fade">
        <p className="footer__copy">© 2026 Craftivation. All Rights Reserved.</p>
        <div className="footer__socials" aria-label="Media Sosial Craftivation">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
            <XIcon />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
