import Link from "next/link"
import "bootstrap-icons/font/bootstrap-icons.css"
import { client, queries } from "@/lib/sanity"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  tags?: string[]
}

// Fallback posts
const fallbackPosts: Post[] = [
  {
    _id: "1",
    title: "The Evens Of Being Unlike",
    slug: { current: "the-evens-of-unlike" },
    excerpt: "The world encourages, only if you fit in the junk around you...",
    publishedAt: "2025-06-02",
    tags: ["philosophy", "personal-growth"]
  },
  {
    _id: "2",
    title: "Being Priceless",
    slug: { current: "being-priceless" },
    excerpt: "What is the price that I can get your time for? Answer yourself!",
    publishedAt: "2024-10-28",
    tags: ["philosophy", "personal-growth"]
  },
  {
    _id: "3",
    title: "The Zero Player Game",
    slug: { current: "zero-player-game" },
    excerpt: "Exploring the concept of games that play themselves...",
    publishedAt: "2024-10-07",
    tags: ["computers", "technology"]
  }
]

async function getPosts() {
  try {
    const posts = await client.fetch(queries.posts)
    return posts?.length ? posts : fallbackPosts
  } catch {
    return fallbackPosts
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-6"
      >
        <i className="bi bi-arrow-left" />
        Back to home
      </Link>

      <div className="border-t border-zinc-800 pt-4 mb-6">
        <h1 className="text-xl font-bold tracking-tight font-mono">
          All Posts{" "}
          <span className="text-zinc-500 text-sm font-normal font-sans">
            thoughts & ideas
          </span>
        </h1>
      </div>

      <div className="space-y-6">
        {posts.map((post: Post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block group"
          >
            <article className="border-b border-zinc-800 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time className="text-sm text-zinc-500 whitespace-nowrap">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
