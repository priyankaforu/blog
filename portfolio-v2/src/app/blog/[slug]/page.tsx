import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { findPost, formatPostDate, listPosts } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Priyanka Pudi`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    notFound();
  }

  const posts = listPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <main className="max-w-2xl">
      <article>
        <header className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-3">{post.title}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            <time dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
            {" · "}
            {post.readingMinutes} min read
          </p>
        </header>

        <div className="prose max-w-none">
          <Markdown content={post.content} />
        </div>
      </article>

      <nav className="grid grid-cols-2 gap-4 mt-12 pt-6 border-t border-[var(--border)] text-sm">
        {older ? (
          <Link href={`/blog/${older.slug}`} className="group">
            <span className="block text-[var(--muted-foreground)]">
              Previous
            </span>
            <span className="font-medium group-hover:text-[var(--accent)] transition-colors">
              {older.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/blog/${newer.slug}`} className="group text-right">
            <span className="block text-[var(--muted-foreground)]">Next</span>
            <span className="font-medium group-hover:text-[var(--accent)] transition-colors">
              {newer.title}
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
