---
title: "How topics, categories and tags fit together"
description: "Three ways to organise posts, and when to use each one."
pubDatetime: 2026-09-27T09:00:00Z
category: "Guides"
postType: "Deep Dive"
tags:
  - "topics"
  - "organising"
---

Each post in Scrollback has three labels. They do different jobs.

## Category: the subject

A post has one category. It decides which topic card the post appears under on the home page. Keep the list short. Five to eight categories is plenty. Posts without a category still work, they just don't appear in the topic browser.

## Post type: the format

The post type describes the kind of thing you wrote. A quick note is different from a long guide, even if they cover the same subject. It shows as a coloured badge on cards and on the post itself. The colours are set in `astro-paper.config.ts`.

## Tags: the detail

Tags are free-form. A post can have as many as it needs. They power the tag pages and help search.

## Using tags for topics instead

If you would rather build the topic cards from tags, change one line in `astro-paper.config.ts`:

```ts
topics: {
  source: "tags",
}
```

With lots of tags the home page gets busy. Use `minPosts` to hide topics that only have one or two posts.
