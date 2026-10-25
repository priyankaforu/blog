interface TimelineEntry {
  period: string;
  role: string;
  place: string;
  placeUrl?: string;
  summary: string;
  isCurrent?: boolean;
}

const entries: TimelineEntry[] = [
  {
    period: "Jun 2026 – Present",
    role: "Full-Stack Engineer",
    place: "Filently",
    placeUrl: "https://filently.com",
    summary:
      "Working at Filently, which files your documents into Google Drive and other cloud drives automatically.",
    isCurrent: true,
  },
  {
    period: "Jun 2025 – May 2026",
    role: "Solo Builder",
    place: "Self-employed",
    summary:
      "Built and sold my own web products end to end. PostMaker got its first paying customers within 24 hours of launch.",
  },
  {
    period: "Dec 2023 – Apr 2025",
    role: "Freelance UX Designer and Frontend Developer",
    place: "Self-employed",
    summary:
      "Designed and built for 4 clients in e-commerce, consulting and health tech.",
  },
  {
    period: "2019 – 2022",
    role: "M.Sc. Functional Safety Engineering and PLC Programmer",
    place: "University of Kassel, Germany",
    summary:
      "Studied how to design machines and systems that fail safely, and worked as a student assistant programming industrial automation systems, including real-time data exchange between two PLCs. I discontinued the M.Sc. in 2022.",
  },
  {
    period: "2015 – 2019",
    role: "B.Tech in Electrical and Electronics Engineering",
    place: "VR Siddhartha Engineering College",
    summary:
      "Learned how electrical systems work at their core. My final year project automated machines with PLCs.",
  },
];

export function Timeline() {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-6">Timeline</h2>
      <ol className="relative border-l border-[var(--border)] ml-1.5">
        {entries.map((entry) => (
          <li key={entry.period} className="relative pl-6 pb-8 last:pb-0">
            <span
              className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                entry.isCurrent
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--muted-foreground)]"
              }`}
            />
            <p className="text-sm text-[var(--muted-foreground)] tabular-nums">
              {entry.period}
            </p>
            <h3 className="font-semibold mt-0.5">
              {entry.role}{" "}
              <span
                className={
                  entry.isCurrent
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted-foreground)] font-normal"
                }
              >
                ·{" "}
                {entry.placeUrl ? (
                  <a
                    href={entry.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    {entry.place}
                  </a>
                ) : (
                  entry.place
                )}
              </span>
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {entry.summary}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
