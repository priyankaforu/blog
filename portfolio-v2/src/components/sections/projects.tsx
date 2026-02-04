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
      <div className="border-t border-zinc-800 pt-4 mb-6">
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
            className="group flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500 transition-all"
          >
            {/* Project Screenshot */}
            {project.image && (
              <div className="relative w-52 h-32 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
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
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-medium text-zinc-100 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>
                {project.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {project.badge}
                  </span>
                )}
                {project.githubUrl && (
                  <i className="bi bi-github text-lg text-zinc-500" />
                )}
              </div>
              <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              {project.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <i className="bi bi-arrow-up-right text-xl text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 self-start mt-1" />
          </a>
        ))}
      </div>
    </section>
  )
}
