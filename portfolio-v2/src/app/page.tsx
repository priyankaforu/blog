import { client, queries } from "@/lib/sanity"
import { Hero } from "@/components/sections/hero"
import { Testimonials } from "@/components/sections/testimonials"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Ideas } from "@/components/sections/ideas"
import { Blog } from "@/components/sections/blog"
import { Footer } from "@/components/sections/footer"

async function getData() {
  try {
    const [profile, skills, projects, posts] = await Promise.all([
      client.fetch(queries.profile),
      client.fetch(queries.skills),
      client.fetch(queries.projects),
      client.fetch(queries.posts),
    ])
    return { profile, skills, projects, posts }
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
