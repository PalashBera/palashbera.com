import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/posts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = publishedPosts[0];

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: newestPost
        ? new Date(newestPost.updated ?? newestPost.date)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...publishedPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
