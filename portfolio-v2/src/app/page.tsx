import Link from "next/link";
import { formatPostDate, listPosts } from "@/lib/posts";

export default function WritingPage() {
  return (
    <main>
      <h1 className="sr-only">Writing</h1>
      <ul>
        {listPosts().map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 py-4 border-b border-[var(--border)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <h2 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </h2>
              <time
                dateTime={post.date}
                className="shrink-0 sm:w-40 text-[var(--muted-foreground)]"
              >
                {formatPostDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
