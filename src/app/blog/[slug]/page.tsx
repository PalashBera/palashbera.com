import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag";
import {
  formatPostDate,
  getPost,
  getPostNeighbours,
  publishedPosts,
} from "@/content/posts";
import { site } from "@/content/site";
import { getPostStats } from "@/lib/post-source";
import { JsonLd, blogPostingSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

/** Anything outside generateStaticParams is a 404 rather than an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: site.name,
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.url],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  const [stats, { default: Body }] = await Promise.all([
    getPostStats(post.slug),
    import(`@/content/posts/${post.slug}.mdx`) as Promise<{
      default: React.ComponentType;
    }>,
  ]);

  const { previous, next } = getPostNeighbours(post.slug);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <article className="pt-12 pb-8 sm:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blog"
              className="font-mono text-xs text-subtle transition-colors hover:text-accent"
            >
              ← Writing
            </Link>
          </nav>

          <header>
            <div className="flex flex-wrap items-baseline gap-x-3 font-mono text-xs text-subtle">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{stats.minutes} min read</span>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {post.description}
            </p>

            <div className="mt-5">
              <TagList items={post.tags} label="Topics" />
            </div>
          </header>

          <div className="mdx mt-10 border-t border-line pt-2">
            <Body />
          </div>
        </article>

        <aside className="border-t border-line py-8">
          <p className="text-[15px] text-muted">
            Working on something similar, or think I got this wrong?{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(post.title)}`}
              className="text-fg underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent"
            >
              Tell me about it
            </a>
            .
          </p>
        </aside>

        {previous || next ? (
          <nav
            aria-label="More posts"
            className="grid gap-4 border-t border-line py-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <span className="font-mono text-[11px] text-subtle">
                  ← Older
                </span>
                <span className="mt-1.5 block text-sm font-medium transition-colors group-hover:text-accent">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong sm:text-right"
              >
                <span className="font-mono text-[11px] text-subtle">
                  Newer →
                </span>
                <span className="mt-1.5 block text-sm font-medium transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </main>

      <SiteFooter />
      <JsonLd schema={blogPostingSchema(post, stats.words)} />
    </>
  );
}
