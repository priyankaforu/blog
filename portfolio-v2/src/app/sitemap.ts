import { MetadataRoute } from "next"
import { client, queries } from "@/lib/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://priyankapudi.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  // Dynamic blog posts from Sanity
  try {
    const posts = await client.fetch(queries.posts)
    const blogPages: MetadataRoute.Sitemap = (posts || []).map(
      (post: { slug: { current: string }; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    )
    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}
