---
title: "Customising Scrollback"
description: "Change the title, topics, badge colours and more from one config file."
pubDatetime: 2026-09-28T09:00:00Z
category: "Guides"
postType: "How-To"
tags:
  - "configuration"
---

Nearly everything you will want to change lives in `astro-paper.config.ts` at the root of the project.

## Site details

Set your title, description, author and the URL the site will be deployed to. The home page heading and intro text have their own `home` section.

## Topic cards

```ts
topics: {
  source: "category",   // or "tags"
  minPosts: 1,          // hide topics with fewer posts than this
  maxVisible: 6,        // cards shown before "Show more topics"
  exclude: ["others"],  // slugs to leave out
  overrides: {
    "t-sql": { label: "T-SQL", description: "Scripts for SQL Server" },
  },
}
```

Labels are generated automatically, so `home-lab` becomes "Home Lab". Use `overrides` when the auto-generated label is wrong, or to add a short description to a card.

## Badge colours

```ts
postTypes: {
  "How-To": "blue",
  "Deep Dive": "orange",
  Note: "teal",
  Opinion: "purple",
}
```

The available colours are `blue`, `orange`, `teal`, `purple` and `gray`. A type that isn't listed gets a grey badge.

## Colours and fonts

The colour scheme is in `src/styles/theme.css`. Change the CSS variables there for light and dark mode separately.

## Comments

Comments are disabled by default. Scrollback uses [Giscus](https://giscus.app), which stores comments as GitHub Discussions. Anyone wanting to to add comments to your posts will need a GitHub account.

To use them you need a public GitHub repo with Discussions enabled. It doesn't have to be your blog repo, a separate one named something like `my-blog-comments` works fine and keeps your blog repo private.

Go to [giscus.app](https://giscus.app), enter your repo name, and it will generate the values you need. Copy the repo, repoId, category and categoryId into `scrollback.config.ts`, then set `enabled` to `true`:

    comments: {
      enabled: true,
      provider: "giscus",
      giscus: {
        repo: "your-username/your-comments-repo",
        repoId: "R_...",
        category: "Announcements",
        categoryId: "DIC_...",
        mapping: "pathname",
        strict: "0",
        reactionsEnabled: "1",
        emitMetadata: "0",
        inputPosition: "bottom",
        lang: "en",
      },
    },

Comments appear below the share links on every post.

## CMS editor

If you'd rather write posts through a web interface than edit files directly,
you can add Decap CMS. It gives you a form-based editor in the browser and
commits posts straight to GitHub. Cloudflare builds automatically from there.

Create two files in your blog repo:

`public/admin/index.html`:

    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Content Manager</title>
      </head>
      <body>
        <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
      </body>
    </html>

`public/admin/config.yml`:

    backend:
      name: github
      repo: your-username/your-repo
      branch: main

    media_folder: src/assets/images
    public_folder: /assets/images

    collections:
      - name: posts
        label: Posts
        folder: src/content/posts
        create: true
        slug: "{{slug}}"
        fields:
          - { label: Title, name: title, widget: string }
          - { label: Description, name: description, widget: string }
          - { label: Publish Date, name: pubDatetime, widget: datetime }
          - { label: Category, name: category, widget: string }
          - { label: Post Type, name: postType, widget: select, options: [Note, How-To, Deep Dive, Opinion] }
          - { label: Tags, name: tags, widget: list }
          - { label: Draft, name: draft, widget: boolean, default: false }
          - { label: Body, name: body, widget: markdown }

You'll also need a GitHub OAuth app for login. Go to GitHub Settings,
Developer settings, OAuth Apps, New OAuth App. Set the callback URL to
`https://api.netlify.com/auth/v1/callback`. Once set up, your CMS is at
`/admin` on your site.
