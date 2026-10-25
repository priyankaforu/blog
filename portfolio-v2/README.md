# Portfolio and blog

The personal site at priyankapudi.online. This file explains how to run it and how to write a blog post.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

## Write a post

A post is one Markdown file in `posts/`. The file name becomes the address: `posts/my-post.md` is shown at `/blog/my-post`.

Start the file with this block:

```md
---
title: "The title of the post"
date: 2026-10-25
description: "One or two sentences. Shown in the post list and when the link is shared."
tags: ["tech", "backend"]
cover: /blog/my-post/cover.png
---
```

- `description`, `tags` and `cover` are optional.
- `cover` is the image shown when someone shares the link. It is not shown on the page; put it in the text too if you want readers to see it.

Write the text in normal Markdown: headings, lists, quotes, tables, links and code blocks. Give each code block its language (for example `ts` or `python`) to get colours.

### Images and PDFs

Put the files in `public/blog/<post-name>/`, then reference them from the post without `public`:

```md
![What the image shows](/blog/my-post/diagram.png "Caption under the image")

![Title shown above the PDF](/blog/my-post/report.pdf)
```

An image on its own line is shown full width with its caption. A `.pdf` written the same way is shown inside the page, with a button to open it.

### Publish

Commit the new files and push. The site builds every post into a plain page, so a post is live after the next deploy.
