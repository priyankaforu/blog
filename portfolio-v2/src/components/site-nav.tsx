"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/", label: "Writing" },
  { href: "/random", label: "Random" },
];

function isActive(href: string, pathname: string) {
  // Posts live under /blog but belong to Writing, which is the home page.
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/blog");
  }
  return pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col gap-5 md:gap-3">
      {links.map(({ href, label }) =>
        isActive(href, pathname) ? (
          <Link
            key={href}
            href={href}
            className="relative text-[var(--accent)]"
          >
            <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            {label}
          </Link>
        ) : (
          <Link
            key={href}
            href={href}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            {label}
          </Link>
        ),
      )}
    </nav>
  );
}
