export default function RoughNotes() {
  return (
    <main className="min-h-screen flex flex-col mt-12">
      <div className="px-6 py-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono mb-1">
          Rough Notes
        </h1>
        <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
          My public notes, drafts & thinking out loud
        </p>
      </div>
      <div className="flex-1 w-full">
        <iframe
          src="https://embed.figma.com/board/ojqOewoRaq0IJKG0V6EZRg/Priyanka-s-Public-Notes?node-id=0-1&embed-host=share"
          className="w-full h-[calc(100vh-160px)]"
          style={{ border: "none" }}
          allowFullScreen
        />
      </div>
    </main>
  )
}
