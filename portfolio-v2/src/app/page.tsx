import { client, queries } from "@/lib/sanity"
import { Hero } from "@/components/sections/hero"
import { Testimonials } from "@/components/sections/testimonials"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Ideas } from "@/components/sections/ideas"
import { Blog } from "@/components/sections/blog"
import { Footer } from "@/components/sections/footer"

// Revalidate every 60 seconds for faster subsequent loads
export const revalidate = 60

// Helper to add timeout to promises
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))
  return Promise.race([promise, timeout])
}

async function getData() {
  try {
    const [profile, skills, projects, posts] = await Promise.all([
      withTimeout(client.fetch(queries.profile), 3000),
      withTimeout(client.fetch(queries.skills), 3000),
      withTimeout(client.fetch(queries.projects), 3000),
      withTimeout(client.fetch(queries.posts), 3000),
    ])
    return { profile, skills, projects, posts: posts || [] }
  } catch (error) {
    // Return null if Sanity isn't configured yet
    console.log("Sanity not configured, using fallback data")
    return { profile: null, skills: null, projects: null, posts: [] }
  }
}

export default async function Home() {
  const { profile, skills, projects, posts } = await getData()

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      <Testimonials />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Ideas />
      <Blog posts={posts} />
      <Footer />
    </main>
  )
}
