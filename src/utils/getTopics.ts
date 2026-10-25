import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import config from "@/config";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

type TopicKind = "category" | "tags";

export interface Topic {
  slug: string;
  label: string;
  description?: string;
  count: number;
  href: string;
}

const { topics: settings } = config;

/**
 * Turn a tag or category into a readable label.
 * Text written with capitals or spaces ("Home Lab", "T-SQL") is kept as written.
 * Plain lowercase text ("home-lab") is title-cased ("Home Lab").
 */
export function labelFromText(text: string): string {
  if (/[A-Z\s]/.test(text)) return text;
  return text
    .split(/[-_]+/)
    .filter(Boolean)
    .map(word =>
      settings.acronyms.includes(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

/**
 * Label and description for a slug, with any overrides applied.
 * Overrides only apply to the kind of topic shown on the homepage, so a tag
 * and a category with the same slug don't share a description.
 */
export function getTopicInfo(
  slug: string,
  name: string,
  kind: TopicKind = settings.source
) {
  const override =
    kind === settings.source ? settings.overrides[slug] : undefined;
  return {
    label: override?.label ?? labelFromText(name),
    description: override?.description,
  };
}

/** The tags or category a post counts towards, depending on the source. */
function keysFor(post: CollectionEntry<"posts">): string[] {
  if (settings.source === "tags") return post.data.tags;
  return post.data.category ? [post.data.category] : [];
}

/**
 * Build the topic list from published posts.
 * Sorted by post count (highest first), then alphabetically.
 */
export function getTopics(
  posts: CollectionEntry<"posts">[],
  locale: string = config.site.lang
): Topic[] {
  const found = new Map<string, { name: string; count: number }>();
  const folder = settings.source === "tags" ? "tags" : "categories";

  for (const post of posts.filter(postFilter)) {
    // A post counts once per topic, even if two of its tags slugify the same.
    const seen = new Set<string>();
    for (const key of keysFor(post)) {
      const slug = slugifyStr(key);
      if (seen.has(slug)) continue;
      seen.add(slug);
      const entry = found.get(slug);
      if (entry) entry.count += 1;
      else found.set(slug, { name: key, count: 1 });
    }
  }

  return [...found.entries()]
    .filter(([slug]) => !settings.exclude.includes(slug))
    .filter(([, { count }]) => count >= settings.minPosts)
    .map(([slug, { name, count }]) => ({
      slug,
      count,
      href: getRelativeLocaleUrl(locale, `${folder}/${slug}/`),
      ...getTopicInfo(slug, name),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
