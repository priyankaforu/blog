"use client"

import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  category?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  tags?: string[]
  badge?: string
}

interface ProjectsProps {
  projects: Project[] | null
}

// Fallback projects with your real projects
const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "JadaWorks",
    description: "Grow faster on social media with viral content. AI-powered content repurposing.",
    category: "Web",
    liveUrl: "https://jadaworks.com",
    image: "/projects/jadaworks.png",
    tags: ["React", "Supabase", "TailwindCSS", "Netlify", "Stripe"],
    badge: "⭐ Got sales in 7 days"
  },
  {
    _id: "2",
    title: "PostMaker",
    description: "Create stunning social media posts & graphics online in seconds.",
    category: "Web",
    liveUrl: "https://postmaker.online",
    image: "/projects/postmaker.png",
    tags: ["Next.js", "MongoDB", "Vercel", "Dodo Payments"],
    badge: "⭐ Got sales within 24hrs"
  },
  {
    _id: "3",
    title: "DoodleNotes",
    description: "AI-powered visual study notes generator. Transform topics into visual notes.",
    category: "Web",
    liveUrl: "https://doodlenotes.art",
    image: "/projects/doodlenotes.png",
    tags: ["Next.js", "Cloudinary", "Dodo Payments"]
  },
  {
    _id: "4",
    title: "Studde",
    description: "Apply to German universities in minutes, not weeks. AI-powered assistant.",
    category: "Web",
    liveUrl: "https://studde.app",
    image: "/projects/studde.png",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "MongoDB", "Claude API", "Vercel"]
  }
]

export function Projects({ projects }: ProjectsProps) {
  const data = projects?.length ? projects : fallbackProjects

  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-[var(--border)] pt-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight mb-1 font-mono">
          Projects{" "}
          <span className="text-zinc-500 text-sm font-normal font-sans">
            I&apos;ve built
          </span>
        </h2>
      </div>

      <div className="space-y-4">
        {data.map((project) => (
          <a
            key={project._id}
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-blue-500 transition-all relative"
          >
            {/* Project Screenshot */}
            {project.image && (
              <div className="relative w-full md:w-52 h-40 md:h-32 rounded-lg overflow-hidden shrink-0 bg-[var(--muted)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            )}
            
            {/* Project Info */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h4 className="text-base md:text-lg font-medium group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
                  {project.title}
                </h4>
                {project.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'var(--badge-text)', backgroundColor: 'var(--badge-bg)', borderWidth: '1px', borderColor: 'var(--badge-border)' }}>
                    {project.badge}
                  </span>
                )}
                {project.githubUrl && (
                  <i className="bi bi-github text-lg text-zinc-500" />
                )}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">
                {project.description}
              </p>
              {project.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <i className="bi bi-arrow-up-right text-xl text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0 absolute top-4 right-4 md:static md:self-start md:mt-1" />
          </a>
        ))}
      </div>
    </section>
  )
}
