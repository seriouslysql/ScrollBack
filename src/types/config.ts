interface SiteConfig {
  /** Deployed URL of the site, e.g. "https://example.com" */
  url: string;
  /** Blog title shown in header and meta tags */
  title: string;
  /** Short description used in SEO meta and RSS feed */
  description: string;
  /** Default post author name */
  author: string;
  /** Author profile URL (used in structured data) */
  profile?: string;
  /** Fallback OG image filename in /public, e.g. "og.jpg" */
  ogImage?: string;
  /** HTML lang attribute, defaults to "en" */
  lang?: string;
  /** IANA timezone for post dates, e.g. "Asia/Bangkok" */
  timezone?: string;
  /** Text direction */
  dir?: "ltr" | "rtl" | "auto";
  /** Google Search Console verification meta tag value */
  googleVerification?: string;
}

interface PostsConfig {
  /** Posts per page on paginated listing pages */
  perPage?: number;
  /** Posts shown on the index/home page */
  perIndex?: number;
  /**
   * Scheduled posts within this window (ms) of their pubDatetime
   * are shown as published. Defaults to 15 minutes.
   */
  scheduledPostMargin?: number;
}

interface FeaturesConfig {
  /** Enable light/dark mode toggle. Defaults to true. */
  lightAndDarkMode?: boolean;
  /**
   * Generate dynamic OG images per post and provide `/og.png` when the static
   * `public/{site.ogImage}` file is absent. When false, that file is required
   * for the default layout OG image (build fails if missing).
   */
  dynamicOgImage?: boolean;
  /** Show the /archives page and link it in nav. Defaults to true. */
  showArchives?: boolean;
  /** Show back button on post detail pages. Defaults to true. */
  showBackButton?: boolean;
  /** "Edit page" link shown on post detail pages. */
  editPost?:
    | {
        enabled: true;
        /** Base URL for the edit link, e.g. GitHub edit URL */
        url: string;
      }
    | { enabled: false };
  /**
   * Search provider. "pagefind" ships in the base template.
   * Set to false to disable search entirely.
   */
  search?: "pagefind" | false;
}

interface SocialLink {
  /**
   * Must match an SVG filename in src/assets/icons/socials/.
   * e.g. "github" → src/assets/icons/socials/github.svg
   */
  name: string;
  url: string;
  /**
   * Accessible label for the icon link (aria-label, title attribute).
   * Auto-generated if omitted: "{site.title} on GitHub", "Send an email to {site.title}", etc.
   * Override when the default wording doesn't fit.
   */
  linkTitle?: string;
}

interface ShareLink {
  /**
   * Must match an SVG filename in src/assets/icons/socials/.
   * e.g. "facebook" → src/assets/icons/socials/facebook.svg
   */
  name: string;
  /** Base share URL. The post URL will be appended as a query param. */
  url: string;
  /**
   * Accessible label for the icon link (aria-label, title attribute).
   * Auto-generated if omitted: "Share this post on Facebook", "Share this post via WhatsApp", etc.
   * Override when the default wording doesn't fit.
   */
  linkTitle?: string;
}

interface TopicOverride {
  /** Display name, e.g. "t-sql" -> "T-SQL" */
  label?: string;
  /** Short description shown on the topic card and topic page */
  description?: string;
}

interface TopicsConfig {
  /**
   * Where topic cards come from:
   * - "category": the `category` field in each post's frontmatter (one per
   *   post, so a small curated set). Recommended.
   * - "tags": every tag on every post. More granular, but busier.
   * Posts without a category are left out when using "category".
   */
  source?: "category" | "tags";
  /** Only show a topic once it has at least this many posts. Defaults to 1. */
  minPosts?: number;
  /** Slugs that should never appear as topic cards. Defaults to ["others"]. */
  exclude?: string[];
  /** Topic cards shown before the "Show more" button. Defaults to 6. */
  maxVisible?: number;
  /** Words always shown in capitals when a label is built from a slug. */
  acronyms?: string[];
  /** Optional label/description overrides, keyed by slug. */
  overrides?: Record<string, TopicOverride>;
}

export type BadgeColor = "blue" | "orange" | "teal" | "purple" | "gray";

interface HomeConfig {
  /** Large heading at the top of the home page */
  heading?: string;
  /** Short intro paragraph under the heading */
  intro?: string;
}

interface GiscusConfig {
  /** GitHub repo hosting Discussions, e.g. "username/repo" */
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  strict?: "0" | "1";
  reactionsEnabled?: "0" | "1";
  emitMetadata?: "0" | "1";
  inputPosition?: "top" | "bottom";
  lang?: string;
}

interface CommentsConfig {
  /** Enable comments on posts. Defaults to false. */
  enabled: boolean;
  provider: "giscus";
  giscus?: GiscusConfig;
}

interface AstroPaperConfig {
  site: SiteConfig;
  /** Text shown at the top of the home page. */
  home?: HomeConfig;
  /** Homepage "Browse by Topic" section and topic pages. */
  topics?: TopicsConfig;
  /**
   * Post types shown as coloured badges, keyed by the `postType` frontmatter
   * value. Types not listed here get a neutral grey badge.
   */
  postTypes?: Record<string, BadgeColor>;
  posts?: PostsConfig;
  features?: FeaturesConfig;
  /** Social profile links shown in header/footer */
  socials?: SocialLink[];
  /** Share links shown on post detail pages */
  shareLinks?: ShareLink[];
  /** Comments section on post detail pages */
  comments?: CommentsConfig;
}

type ResolvedSiteConfig = Required<
  Pick<
    SiteConfig,
    | "url"
    | "title"
    | "description"
    | "author"
    | "lang"
    | "timezone"
    | "dir"
    | "ogImage"
  >
> &
  Pick<SiteConfig, "profile" | "googleVerification">;

export interface ResolvedAstroPaperConfig {
  site: ResolvedSiteConfig;
  home: Required<HomeConfig>;
  topics: Required<TopicsConfig>;
  postTypes: Record<string, BadgeColor>;
  posts: Required<PostsConfig>;
  features: Required<FeaturesConfig>;
  socials: SocialLink[];
  shareLinks: ShareLink[];
  comments?: CommentsConfig;
}

/**
 * Type helper for astro-paper.config.ts.
 * Provides full IntelliSense without any runtime overhead.
 */
export function defineAstroPaperConfig(
  config: AstroPaperConfig
): AstroPaperConfig {
  return config;
}
