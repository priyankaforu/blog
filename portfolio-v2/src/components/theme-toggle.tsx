"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons are rendered and CSS shows one, so the server and the browser render the same HTML.
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer hover:opacity-70 transition-opacity"
      aria-label="Toggle theme"
    >
      <i className="bi bi-sun hidden dark:inline" />
      <i className="bi bi-moon-fill dark:hidden" />
    </button>
  );
}
