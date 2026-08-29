import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag";
import { formatPostDate, publishedPosts } from "@/content/posts";
import { site } from "@/content/site";
import { getPostStats } from "@/lib/post-source";
import { JsonLd, blogSchema } from "@/lib/seo";

const title = "Writing";
const description = `Notes from ${site.name} on Ruby on Rails, PostgreSQL, background jobs and the gap between a prototype and a production system. Mostly things that broke and what they taught me.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
  },
};

export default async function BlogIndex() {
  const posts = await Promise.all(
    publishedPosts.map(async (post) => ({
      ...post,
      stats: await getPostStats(post.slug),
    })),
  );

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <section className="pt-16 pb-10 sm:pt-24">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Things I ran into and had to work out. Mostly Rails, Postgres and
              background jobs, usually written up because I&apos;d have wanted
              to read it six hours earlier.
            </p>
            <p className="mt-4 font-mono text-xs text-subtle">
              <a
                href="/feed.xml"
                className="transition-colors hover:text-accent"
              >
                RSS feed
              </a>
            </p>
          </Reveal>
        </section>

        <ol className="border-t border-line">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 60}>
                <article className="group border-b border-line py-8">
                  <div className="flex flex-wrap items-baseline gap-x-3 font-mono text-xs text-subtle">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.stats.minutes} min read</span>
                  </div>

                  <h2 className="mt-2 text-lg font-medium tracking-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors group-hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {post.description}
                  </p>

                  <div className="mt-4">
                    <TagList items={post.tags} label={`${post.title} topics`} />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="py-12">
          <Link
            href="/"
            className="font-mono text-xs text-subtle transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
      <JsonLd schema={blogSchema(publishedPosts)} />
    </>
  );
}
