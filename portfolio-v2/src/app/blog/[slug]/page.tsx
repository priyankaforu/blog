import Link from "next/link"
import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"
import { client, queries, urlFor, getFileUrl } from "@/lib/sanity"
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
                  pdfEmbed: ({ value }: { value: any }) => {
                    if (!value?.file?.asset?._ref) return null
                    const pdfUrl = getFileUrl(value.file.asset._ref)
                    return (
                      <div className="my-8">
                        {value.title && (
                          <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                        )}
                        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                          <iframe
                            src={`${pdfUrl}#toolbar=1&navpanes=0`}
                            className="w-full"
                            style={{ height: '80vh', minHeight: '600px' }}
                            title={value.title || 'Embedded PDF'}
                          />
                        </div>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm mt-3 px-4 py-2 rounded-full transition-all hover:border-blue-500"
                          style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)', borderWidth: '1px', borderColor: 'var(--border)' }}
                        >
                          <i className="bi bi-download" />
                          Download PDF
                        </a>
                      </div>
                    )
                  },
                  dataTable: ({ value }: { value: any }) => {
                    const headers: string[] = value?.headers || []
                    const rows: { cells?: string[] }[] = value?.rows || []
                    return (
                      <div className="my-8 overflow-x-auto">
                        {value.title && (
                          <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                        )}
                        <table className="w-full text-sm border-collapse rounded-lg overflow-hidden" style={{ borderWidth: '1px', borderColor: 'var(--border)' }}>
                          {headers.length > 0 && (
                            <thead>
                              <tr style={{ backgroundColor: 'var(--muted)' }}>
                                {headers.map((h: string, i: number) => (
                                  <th
                                    key={i}
                                    className="text-left px-4 py-3 font-semibold"
                                    style={{ borderBottomWidth: '1px', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {rows.map((row, ri) => (
                              <tr key={ri} className="transition-colors" style={ri % 2 === 1 ? { backgroundColor: 'var(--muted)', opacity: 0.7 } : {}}>
                                {(row.cells || []).map((cell: string, ci: number) => (
                                  <td
                                    key={ci}
                                    className="px-4 py-3"
                                    style={{ borderBottomWidth: '1px', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
