import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPost } from "@/content/posts";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

const WORDS_PER_MINUTE = 225;

export type PostStats = {
  words: number;
  minutes: number;
};

/**
 * Reads a post's raw MDX so we can report an honest word count and reading time
 * in the UI and in the BlogPosting schema.
 *
 * The slug is resolved through the registry rather than used directly, so a
 * value from the URL can never be joined into a filesystem path.
 */
export async function getPostStats(slug: string): Promise<PostStats> {
  const post = getPost(slug);
  if (!post) return { words: 0, minutes: 1 };

  const source = await readFile(
    path.join(POSTS_DIR, `${post.slug}.mdx`),
    "utf8",
  );
  return countWords(source);
}

export function countWords(source: string): PostStats {
  const prose = source
    // Fenced code isn't read at prose speed, so leave it out of the estimate.
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}
