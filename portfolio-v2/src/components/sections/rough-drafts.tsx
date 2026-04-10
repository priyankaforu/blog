export function RoughDrafts() {
  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-[var(--border)] pt-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight mb-1 font-mono">
          Rough Drafts{" "}
          <span className="text-zinc-500 text-sm font-normal font-sans">
            notes & thinking out loud
          </span>
        </h2>
      </div>

      <div className="w-full rounded-lg overflow-hidden border border-[var(--border)]">
        <iframe
          src="https://embed.figma.com/board/ojqOewoRaq0IJKG0V6EZRg/Priyanka-s-Public-Notes?node-id=0-1&embed-host=share"
          className="w-full"
          style={{ height: "450px", border: "none" }}
          allowFullScreen
        />
      </div>
    </section>
  )
}
