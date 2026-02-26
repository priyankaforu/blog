import Link from "next/link"
import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"
import { client, queries, urlFor } from "@/lib/sanity"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  try {
    const post = await client.fetch(queries.postBySlug(slug))
    return post
  } catch {
    return null
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8"
      >
        <i className="bi bi-arrow-left" />
        Back to all posts
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-zinc-500">
            <time>{formatDate(post.publishedAt)}</time>
            {post.tags && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          {post.coverImage && (
            <div className="mt-6 rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(1200).height(630).url()}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </header>

        {/* Render Sanity portable text or fallback */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              {post.excerpt || "No content available."}
            </p>
          )}
        </div>
      </article>
    </main>
  )
}
