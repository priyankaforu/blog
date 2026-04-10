export function Footer() {
  return (
    <footer className="px-6 py-6 max-w-3xl mx-auto border-t border-[var(--border)]">
      <div className="text-center space-y-1">
        <p className="text-xs text-zinc-500">
          Designed & built with ☕ and curiosity
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} Priyanka Pudi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
