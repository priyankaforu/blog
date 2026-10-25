import { MarkdownAsync, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import "bootstrap-icons/font/bootstrap-icons.css";

const shikiOptions = {
  themes: { light: "kanagawa-lotus", dark: "kanagawa-dragon" },
};

const components: Components = {
  // An image alone in a paragraph becomes a block (figure or PDF), and a block cannot sit inside <p>.
  p({ node, children }) {
    const onlyChild =
      node?.children.length === 1 ? node.children[0] : undefined;
    if (onlyChild?.type === "element" && onlyChild.tagName === "img") {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  img({ src, alt, title }) {
    if (typeof src === "string" && src.endsWith(".pdf")) {
      return <PdfEmbed src={src} title={alt} />;
    }
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element -- post images have no known size */}
        <img src={src} alt={alt ?? ""} loading="lazy" />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  },
};

function PdfEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <div className="not-prose my-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all hover:border-[var(--accent)] shrink-0 bg-[var(--muted)] border border-[var(--border)]"
          style={{ color: "var(--foreground)" }}
        >
          <i className="bi bi-file-earmark-pdf" />
          Open PDF
        </a>
      </div>
      <iframe
        src={`${src}#navpanes=0&view=FitH`}
        title={title ?? "PDF"}
        className="w-full h-[80vh] rounded-lg border border-[var(--border)]"
      />
    </div>
  );
}

export function Markdown({ content }: { content: string }) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeShiki, shikiOptions]]}
      components={components}
    >
      {content}
    </MarkdownAsync>
  );
}
