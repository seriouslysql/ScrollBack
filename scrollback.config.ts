import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // Change this to your deployed address, e.g. "https://myblog.pages.dev/"
    url: "https://example.com/",
    title: "Scrollback",
    description: "A minimal, accessible blog theme with topics and post types.",
    author: "Your Name",
    // profile: "https://example.com/about",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "UTC",
    dir: "ltr",
  },
  // Text at the top of the home page. Both fall back to the site title and
  // description above if you leave them out.
  home: {
    heading: "Welcome to Scrollback",
    intro:
      "A small, fast blog theme. Replace this text in scrollback.config.ts.",
  },
  topics: {
    source: "category",
    minPosts: 1,
    exclude: ["others"],
    maxVisible: 6,
    // Optional: a nicer name or a short description for each topic card.
    // The key is the category name in lowercase with hyphens for spaces,
    // so "Home Lab" becomes "home-lab". Keys that don't match are ignored.
    overrides: {
      guides: { description: "Step-by-step help for getting things working" },
      notes: { description: "Short posts and quick findings" },
      opinion: { description: "Where I say what I think" },
      // "t-sql-tips": { label: "T-SQL", description: "Scripts and techniques" },
    },
  },
  // Coloured badges for the `postType` frontmatter field.
  // Colours: blue, orange, teal, purple, gray
  postTypes: {
    "How-To": "blue",
    "Deep Dive": "orange",
    Note: "teal",
    Opinion: "purple",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/your-username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/your-username/" },
    { name: "mail",     url: "mailto:you@example.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
  comments: {
  enabled: false,
  provider: "giscus" as const,
  giscus: {
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    mapping: "pathname" as const,
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom" as const,
    lang: "en",
  },
},
});
