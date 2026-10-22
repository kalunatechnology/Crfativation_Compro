export interface BreadcrumbNavProps {
  items: { name: string; href: string }[];
  className?: string;
  theme?: "light" | "dark";
}

/**
 * BreadcrumbNav: Komponen navigasi breadcrumb semantik untuk SEO Sitelinks Google
 * dan navigasi pengguna yang jelas. Mendukung schema markup visual.
 */
export default function BreadcrumbNav({
  items,
  className = "",
  theme = "light",
}: BreadcrumbNavProps) {
  const isDark = theme === "dark";
  const linkColor = isDark
    ? "text-white/70 hover:text-white"
    : "text-[#666] hover:text-[#4B002B]";
  const activeColor = isDark
    ? "text-white font-semibold"
    : "text-[#181818] font-semibold";
  const dividerColor = isDark ? "text-white/40" : "text-black/30";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-[13px] md:text-[14px] ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 list-none m-0 p-0 font-[family-name:var(--font-sans)]">
        <li>
          <a
            href="/"
            className={`transition-colors no-underline ${linkColor}`}
          >
            Beranda
          </a>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-1.5">
              <span className={`select-none ${dividerColor}`} aria-hidden="true">
                /
              </span>
              {isLast ? (
                <span aria-current="page" className={activeColor}>
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={`transition-colors no-underline ${linkColor}`}
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
