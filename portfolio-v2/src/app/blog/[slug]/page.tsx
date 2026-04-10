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
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto mt-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full mb-8 transition-all hover:border-blue-500"
        style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)', borderWidth: '1px', borderColor: 'var(--border)' }}
      >
        <i className="bi bi-arrow-left" />
        Back to all posts
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-zinc-500">
            <time>{formatDate(post.publishedAt)}</time>
            {post.tags && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', borderWidth: '1px', borderColor: 'var(--border)' }}
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
        <div className="prose prose-zinc dark:prose-invert max-w-none" style={{ color: 'var(--foreground)' }}>
          {post.body ? (
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }: { value: any }) => {
                    if (!value?.asset) return null
                    return (
                      <div className="my-6 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(value).width(1200).url()}
                          alt={value.alt || "Blog image"}
                          width={1200}
                          height={675}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>
                    )
                  },
                },
              }}
            />
          ) : (
            <p className="text-[var(--muted-foreground)]">
              {post.excerpt || "No content available."}
            </p>
          )}
        </div>
      </article>
    </main>
  )
}
