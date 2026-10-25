import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");
const WORDS_PER_MINUTE = 200;

export interface Post {
  slug: string;
  title: string;
  /** yyyy-mm-dd */
  date: string;
  description?: string;
  tags: string[];
  /** Image shown when the post is shared; not rendered on the page. */
  cover?: string;
  readingMinutes: number;
  content: string;
}

function readPost(slug: string): Post {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    // YAML turns an unquoted date into a Date object
    date: new Date(data.date).toISOString().slice(0, 10),
    description: data.description,
    tags: data.tags ?? [],
    cover: data.cover,
    readingMinutes: Math.max(
      1,
      Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE),
    ),
    content,
  };
}

/** All posts, newest first. */
export function listPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => readPost(name.slice(0, -".md".length)))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function findPost(slug: string): Post | null {
  return listPosts().find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
