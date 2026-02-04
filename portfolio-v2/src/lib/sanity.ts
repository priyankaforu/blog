import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Queries
export const queries = {
  profile: `*[_type == "profile"][0]{
    name,
    tagline,
    bio,
    image,
    location,
    email,
    resumeUrl,
    availableForWork,
    socials[]{
      platform,
      url,
      username
    }
  }`,
  
  skills: `*[_type == "skill"] | order(order asc) {
    _id,
    category,
    items[]{
      name,
      icon
    }
  }`,
  
  projects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    image,
    category,
    githubUrl,
    liveUrl,
    featured,
    tags
  }`,
  
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    tags
  }`,
  
  postBySlug: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    body,
    tags
  }`,
}
