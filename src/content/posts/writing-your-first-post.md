---
title: "Writing your first post"
description: "Where posts live, what goes in the frontmatter, and how to publish."
pubDatetime: 2026-09-26T09:00:00Z
category: "Guides"
postType: "How-To"
tags:
  - "getting-started"
  - "writing"
---

Every post is a Markdown file in `src/content/posts/`. Create a new file, add frontmatter at the top, write below it.

## Table of contents

## Frontmatter

```yaml
    ---
    title: "Your post title"
    description: "One or two sentences shown on cards and in search results"
    pubDatetime: 2026-10-05T09:00:00Z
    category: "Guides"
    postType: "How-To"
    featured: false
    draft: false
    tags:
      - "writing"
    ---
```

Only `title`, `description` and `pubDatetime` are required.

| Field      | What it does                                           |
| ---------- | ------------------------------------------------------ |
| `category` | Puts the post under a topic card on the home page      |
| `postType` | Shows a coloured badge, such as How-To or Opinion      |
| `featured` | Pins the post to the Featured section on the home page |
| `draft`    | Keeps the post hidden until you set it to `false`      |
| `tags`     | Finer detail, used for tag pages and search            |

## Publishing

Commit and push. If the site is connected to Cloudflare Pages, Netlify or Vercel, it rebuilds on its own. Posts with a future `pubDatetime` stay hidden until that time.
