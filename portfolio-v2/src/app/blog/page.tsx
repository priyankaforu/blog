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
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8"
      >
        <i className="bi bi-arrow-left" />
        Back to home
      </Link>

      <h1 className="text-4xl font-bold mb-8">All Posts</h1>

      <div className="space-y-4">
        {posts.map((post: Post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="blog-post-card group block p-6 rounded-xl border transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="blog-post-card-title text-xl font-semibold transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="blog-post-card-excerpt mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <span className="blog-post-card-date text-sm">
                    {formatDate(post.publishedAt)}
                  </span>
                  {post.tags && (
                    <div className="flex gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <i className="blog-post-card-icon bi bi-arrow-up-right shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
