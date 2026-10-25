import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

type Category = {
  category: string;
  categoryName: string;
};

/**
 * Builds a de-duplicated, sorted category list from posts.
 * `category` is the URL slug; `categoryName` is the label as written.
 */
export function getUniqueCategories(posts: CollectionEntry<"posts">[]) {
  const categories: Category[] = posts
    .filter(postFilter)
    .flatMap(post => (post.data.category ? [post.data.category] : []))
    .map(name => ({ category: slugifyStr(name), categoryName: name }))
    .filter(
      (value, index, self) =>
        self.findIndex(c => c.category === value.category) === index
    )
    .sort((a, b) => a.category.localeCompare(b.category));
  return categories;
}
