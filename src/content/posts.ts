/**
 * Blog post registry.
 *
 * To publish a post:
 *   1. Add `src/content/posts/<slug>.mdx` with the body (no frontmatter — the
 *      metadata lives here so it stays typed and usable from the sitemap, the
 *      RSS feed and the JSON-LD without compiling MDX).
 *   2. Add an entry below. `slug` must match the filename.
 *
 * Everything else — routing, OG image, reading time, feed, sitemap, prev/next
 * links — is derived automatically.
 */

export type Post = {
  slug: string;
  title: string;
  /** Used verbatim as the meta description and the index-page summary. */
  description: string;
  /** ISO date. Drives ordering, `datePublished` and the feed. */
  date: string;
  /** Optional ISO date; set this when you meaningfully revise a published post. */
  updated?: string;
  tags: string[];
  /** Set to true to keep a post out of the index, feed, sitemap and OG tags. */
  draft?: boolean;
};

const posts: Post[] = [
  {
    slug: "postgres-migration-locked-users-table",
    title: "The migration that locked our users table for nine minutes",
    description:
      "Adding a boolean column took 30ms locally and took the site down in production. A walk through Postgres lock queues, why ALTER TABLE blocks reads it has no business blocking, and the one line of SQL that would have prevented it.",
    date: "2026-03-14",
    tags: ["PostgreSQL", "Rails", "Incidents"],
  },
  {
    slug: "sidekiq-job-that-ran-forty-thousand-times",
    title: "The Sidekiq job that ran 40,000 times",
    description:
      "Two harmless bugs — enqueueing inside a transaction, and bundling three failure modes into one job — combined into 40,312 executions and a very patient support email. What at-least-once delivery actually demands of you.",
    date: "2026-05-22",
    tags: ["Sidekiq", "Rails", "Idempotency"],
  },
  {
    slug: "what-changes-when-a-prototype-becomes-production",
    title: "What changes when a prototype becomes production",
    description:
      "Most of the proofs of concept I've built ended up shipping, which taught me that prototypes aren't disposable — the wrong parts survive. How I decide what to fake, what to write down, and what to harden first.",
    date: "2026-07-08",
    tags: ["Engineering practice", "Prototyping"],
  },
];

export const allPosts: Post[] = [...posts].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

/** Posts safe to expose publicly, newest first. */
export const publishedPosts: Post[] = allPosts.filter((post) => !post.draft);

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

/** Newer and older neighbours, for the footer of a post. */
export function getPostNeighbours(slug: string): {
  previous?: Post;
  next?: Post;
} {
  const index = publishedPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    previous: publishedPosts[index + 1],
    next: publishedPosts[index - 1],
  };
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
