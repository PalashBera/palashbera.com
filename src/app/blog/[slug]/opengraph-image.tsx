import { ImageResponse } from "next/og";
import { formatPostDate, getPost, publishedPosts } from "@/content/posts";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return [
    {
      id: "og",
      size,
      contentType,
      alt: post ? `${post.title} — ${site.name}` : site.name,
    },
  ];
}

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          color: "#f4f4f5",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a5b4fc",
          }}
        >
          <span>{site.url.replace("https://", "")}/blog</span>
          <span style={{ color: "#71717a" }}>
            {post ? formatPostDate(post.date) : ""}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 46 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
          }}
        >
          {post?.title ?? "Writing"}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a1a1aa",
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: "#71717a" }}>
            {post?.tags.join("  ·  ") ?? ""}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
