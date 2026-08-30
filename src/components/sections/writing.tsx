import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { formatPostDate, publishedPosts } from "@/content/posts";

const MAX_ON_HOME = 5;

export function Writing() {
  const posts = publishedPosts.slice(0, MAX_ON_HOME);
  if (posts.length === 0) return null;

  return (
    <Section id="writing" index="05" title="Writing">
      <ol className="space-y-1">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group -mx-3 flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:gap-5"
              >
                <time
                  dateTime={post.date}
                  className="font-mono text-xs whitespace-nowrap text-subtle sm:w-32"
                >
                  {formatPostDate(post.date)}
                </time>
                <span className="text-[15px] font-medium transition-colors group-hover:text-accent">
                  {post.title}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={posts.length * 60}>
        <Link
          href="/blog"
          className="mt-6 inline-block font-mono text-xs text-subtle transition-colors hover:text-accent"
        >
          All posts →
        </Link>
      </Reveal>
    </Section>
  );
}
