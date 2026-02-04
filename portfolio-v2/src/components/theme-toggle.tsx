"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-[var(--muted)] z-50 w-9 h-9"
        aria-label="Toggle theme"
      />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded-full bg-[var(--muted)] hover:bg-[var(--border)] transition-colors z-50"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun text-lg"></i>
      ) : (
        <i className="bi bi-moon-fill text-lg"></i>
      )}
    </button>
  )
}
