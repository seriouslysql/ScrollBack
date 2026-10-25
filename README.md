# Scrollback

A minimal, fast and accessible blog theme for [Astro](https://astro.build/), built on [AstroPaper](https://github.com/satnaing/astro-paper) v6.1.0 by Sat Naing.

Scrollback keeps everything AstroPaper does well (light and dark mode, search, RSS, sitemap, dynamic social images, accessibility) and adds a way to organise a larger blog.

## What Scrollback adds

- **Browse by Topic** on the home page. Topic cards are detected automatically from your posts, so there's no list to maintain.
- **Category pages** at `/categories/<name>/`, with pagination.
- **Post type badges** (How-To, Deep Dive, Note, Opinion, or your own) shown on cards and posts.
- **Home page text in config.** Change the heading and intro without touching a template.
- **Comments via Giscus.** Off by default. Point it at a public GitHub repo and flip one setting to enable.
- **Optional CMS editor.** Add two files to get a browser-based editor that commits posts straight to GitHub.

Topics can be built from a post's `category` (a small, curated set) or from its tags. It's one line in the config.

## Quick start

You need Node.js 22.12 or newer and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Other commands:

```bash
pnpm build      # type-check, build and index for search
pnpm preview    # preview the production build
pnpm lint
pnpm format
```

A dev container is included, so the project also opens ready to run in GitHub Codespaces.

## Writing posts

Posts are Markdown files in `src/content/posts/`. Each starts with frontmatter:

```yaml
---
title: "Your post title"
description: "One or two sentences for cards and search results"
pubDatetime: 2026-10-05T09:00:00Z
category: "Guides"
postType: "How-To"
featured: false
draft: false
tags:
  - "writing"
---
```

`title`, `description` and `pubDatetime` are required. Everything else is optional. See the demo posts for more.

| Field      | Purpose                                 |
| ---------- | --------------------------------------- |
| `category` | Which topic card the post appears under |
| `postType` | The coloured badge shown on the post    |
| `featured` | Pins the post to the Featured section   |
| `draft`    | Hides the post until set to `false`     |
| `tags`     | Free-form detail, used for tag pages    |

## Configuration

Almost everything is in `scrollback.config.ts`:

```ts
topics: {
  source: "category",   // or "tags"
  minPosts: 1,
  maxVisible: 6,
  exclude: ["others"],
  overrides: {
    "t-sql": { label: "T-SQL", description: "Scripts for better T-SQL" },
  },
},
postTypes: {
  "How-To": "blue",
  "Deep Dive": "orange",
  Note: "teal",
  Opinion: "purple",
},
```

Badge colours available: `blue`, `orange`, `teal`, `purple`, `gray`. Colours for the whole site are in `src/styles/theme.css`.

The config file keeps AstroPaper's name on purpose, so changes from upstream are easier to merge.

## Before you publish

1. Replace the demo posts in `src/content/posts/` and the About page in `src/content/pages/`.
2. Set your site URL, title, author and social links in `scrollback.config.ts`.
3. Add your own favicon at `public/favicon.svg`.

## Deploying

Scrollback builds to static files, so it works on Cloudflare Pages, Netlify, Vercel or GitHub Pages.

- Build command: `pnpm build`
- Output directory: `dist`
- Node.js: 22.12 or newer (on Cloudflare Pages, set the `NODE_VERSION` variable to `22`)

Dynamic social preview images download a font from Google Fonts during the build, so the build needs internet access. Most hosts allow this.

## Credits and licence

Scrollback is built on [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing, used under the MIT licence. Both copyright notices are kept in `LICENSE`.

Released under the [MIT licence](LICENSE).
