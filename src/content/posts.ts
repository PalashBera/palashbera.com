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
    slug: "when-includes-made-it-slower",
    title: "When includes made it slower",
    description:
      "Fixing an N+1 dropped the query count from 501 to 2 and made the page four times slower. Why object allocation beats query count, and how `includes` silently switches between two completely different strategies.",
    date: "2025-06-11",
    tags: ["Rails", "PostgreSQL", "Performance"],
  },
  {
    slug: "the-dashboard-that-took-twelve-seconds",
    title: "The dashboard that took twelve seconds",
    description:
      "Nine aggregate tiles, nine table scans. Why page caching made it a correctness argument, why counter caches couldn't help, and how one materialized view with filtered aggregates got it to 40ms.",
    date: "2025-07-09",
    tags: ["PostgreSQL", "Rails", "Performance"],
  },
  {
    slug: "the-double-refund",
    title: "The double refund",
    description:
      "Twenty-three orders refunded twice, found by a finance spreadsheet eleven days later. A read-modify-write race that reads as obviously correct, and why wrapping it in a transaction fixes nothing.",
    date: "2025-08-13",
    tags: ["Rails", "Concurrency", "Payments"],
  },
  {
    slug: "two-components-disagreed-about-the-same-user",
    title: "Two components disagreed about the same user",
    description:
      "The sidebar showed the old name until reload. Eleven copies of the same database row, each fetched independently, and the distinction between client state and a cache of someone else's data.",
    date: "2025-09-10",
    tags: ["React", "State management", "Architecture"],
  },
  {
    slug: "the-cron-job-that-ran-once-per-container",
    title: "The cron job that ran once per container",
    description:
      "Scaling from one container to four sent 3,100 customers four copies of the same email. Singleton work in a multi-container deployment: dedicated schedulers, Postgres advisory locks, Kubernetes CronJobs, and why none of them are the actual fix.",
    date: "2025-10-08",
    tags: ["Docker", "Kubernetes", "Rails", "Distributed systems"],
  },
  {
    slug: "the-deploy-that-needed-two-deploys",
    title: "The deploy that needed two deploys",
    description:
      "`rename_column` runs in 8ms and breaks every container still on the previous release. Expand and contract, why removing a column is more dangerous than adding one, and the list of migrations I check before shipping.",
    date: "2025-11-05",
    tags: ["Rails", "PostgreSQL", "Deployment"],
  },
  {
    slug: "the-cache-that-made-it-worse",
    title: "The cache that made it worse",
    description:
      "We cached a 900ms endpoint and the database hit 100% CPU for the first time. Cache stampedes scale with your traffic, stale-while-revalidate is usually the answer, and averages hide the trade you just made.",
    date: "2025-12-03",
    tags: ["Redis", "Rails", "Performance"],
  },
  {
    slug: "the-optimistic-update-that-lied",
    title: "The optimistic update that lied",
    description:
      "Thirty archived threads came back after a tunnel. Optimistic updates are a promise, and rollback needs a snapshot rather than a reverse operation — plus the missing fetch timeout that made every error handler unreachable.",
    date: "2026-01-14",
    tags: ["React", "State management", "Offline"],
  },
  {
    slug: "idempotency-keys-are-not-optional",
    title: "Idempotency keys are not optional",
    description:
      "Their client timed out at 30 seconds, ours completed the charge at 31. A timeout tells the caller nothing, so every mutating endpoint owes them a way to retry safely. The unique index does the arbitrating.",
    date: "2026-02-11",
    tags: ["API design", "Rails", "Payments"],
  },
  {
    slug: "the-p99-that-was-a-lie",
    title: "The p99 that was a lie",
    description:
      "The dashboard said 240ms; support had a video of eleven seconds. You cannot average percentiles, queue time is invisible from inside a request, and fan-out turns a 1% tail into one page load in five.",
    date: "2026-03-11",
    tags: ["Observability", "Performance", "Rails"],
  },
  {
    slug: "the-form-that-dropped-keystrokes",
    title: "The form that dropped keystrokes",
    description:
      "118 controlled fields, one state object, and 70ms per character on a five-year-old laptop. Why I stopped reaching for memoisation, when uncontrolled inputs are correct, and the profiler setting that made the bug visible at all.",
    date: "2026-04-08",
    tags: ["React", "Performance", "Forms"],
  },
  {
    slug: "the-migration-that-ran-fourteen-hundred-times",
    title: "The migration that ran fourteen hundred times",
    description:
      "Schema-per-tenant makes DDL O(tenants), and at 1,412 tenants a nullable boolean took fifty minutes and left the fleet half-migrated. What row-level security actually buys you, and how I'd choose now.",
    date: "2026-05-06",
    tags: ["PostgreSQL", "Multi-tenancy", "Architecture"],
  },
  {
    slug: "sizing-containers-threads-and-cpu-limits",
    title: "Sizing containers: threads, CPU limits, and bin-packing",
    description:
      "24 vCPUs at 11% utilisation, and requests still queueing. Puma workers versus threads under the GVL, the connection-pool arithmetic that autoscaling breaks, and how CFS quota throttling hides behind a healthy-looking average.",
    date: "2026-06-10",
    tags: ["Docker", "Kubernetes", "Rails", "Performance"],
  },
  {
    slug: "the-infinite-scroll-that-broke-the-back-button",
    title: "The infinite scroll that broke the back button",
    description:
      "34% of search sessions ended right after a back navigation and nobody filed a bug. The URL is the only state the browser can restore, and restoring scroll position needs the content to exist first.",
    date: "2026-07-08",
    tags: ["React", "UX", "Routing"],
  },
  {
    slug: "streaming-an-llm-response-through-rails",
    title: "Streaming an LLM response through Rails and React",
    description:
      "Eleven seconds of spinner became 400ms to first token with no speedup at all. Server-sent events over ActionCable, the SSE frame-splitting bug everyone ships, and the capacity arithmetic that breaks when a request holds a thread for eleven seconds.",
    date: "2026-08-12",
    tags: ["Rails", "React", "LLM", "Streaming"],
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
