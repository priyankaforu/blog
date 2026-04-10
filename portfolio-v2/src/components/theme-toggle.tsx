"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide on scroll for mobile
  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < 10 || y < lastY)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Hide on home page — hero has its own inline toggle
  if (!mounted || pathname === "/") return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-transform duration-300 sm:translate-y-0"
      style={{
        backgroundColor: 'var(--background)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity"
        style={{ color: 'var(--foreground)' }}
      >
        <i className="bi bi-house text-sm" />
        Home
      </Link>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="cursor-pointer hover:opacity-70 transition-opacity"
        style={{ color: 'var(--foreground)' }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <i className="bi bi-sun text-lg" />
        ) : (
          <i className="bi bi-moon-fill text-lg" />
        )}
      </button>
    </div>
  )
}
