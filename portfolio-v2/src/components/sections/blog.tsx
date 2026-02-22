import Link from "next/link"
import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"
import { urlFor } from "@/lib/sanity"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  coverImage?: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  tags?: string[]
}

interface BlogProps {
  posts?: Post[]
}

// Fallback posts to show when Sanity is empty
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

export function Blog({ posts = [] }: BlogProps) {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : fallbackPosts.slice(0, 3)
  
  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-zinc-800 pt-4 mb-4">
        <p className="text-zinc-500 text-sm mb-4">
          I love to <span className="font-medium text-zinc-100">write down my thoughts</span> here
        </p>
      </div>

      {/* Tiny buttons for Medium and Substack */}
      <div className="flex gap-2 mb-4">
        <a
          href="https://medium.com/@priyankapudi4u"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-24 py-1.5 text-xs rounded-md bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-blue-400 transition-all"
        >
          <i className="bi bi-medium" />
          Medium
        </a>
        <a
          href="https://substack.com/@priyankapudi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-24 py-1.5 text-xs rounded-md bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-blue-400 transition-all"
        >
          <i className="bi bi-substack" />
          Substack
        </a>
      </div>

      {/* Recent Posts */}
      <div className="space-y-3 mb-4">
        {displayPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block group"
          >
            <div className="flex items-center justify-between gap-4 py-2 border-b border-zinc-800/50">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors truncate">
                  {post.title}
                </h3>
              </div>
              <time className="text-xs text-zinc-500 whitespace-nowrap">
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {/* View all posts link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-blue-400 transition-colors"
      >
        View all posts
        <i className="bi bi-arrow-right" />
      </Link>
    </section>
  )
}
