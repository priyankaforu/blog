import { EMAIL, socialLinks } from "@/components/socials";

export function Footer() {
  return (
    <footer className="mt-24 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
      <p>© {new Date().getFullYear()} Priyanka Pudi.</p>
      <div className="flex items-center gap-4 text-lg">
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          <i className="bi bi-envelope-fill" />
        </a>
        {socialLinks.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
