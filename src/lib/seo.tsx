import {
  education,
  experience,
  site,
  skills,
  socials,
} from "@/content/site";
import type { Post } from "@/content/posts";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, site.url).toString();
}

/**
 * One canonical Person node, referenced by @id from every other schema on the
 * site. Search engines treat repeated inline author objects as separate
 * entities; a single node with stable identity is what actually consolidates.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    jobTitle: site.role,
    description: site.summary[0],
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    sameAs: socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
    knowsAbout: skills.flatMap((group) =>
      group.items.map((skill) => skill.name),
    ),
    alumniOf: education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
    worksFor: {
      "@type": "Organization",
      name: experience[0].company,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: `${site.name} — ${site.role}`,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

/** The home page: a profile page whose main entity is the person. */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** The blog index: a Blog node listing every published post. */
export function blogSchema(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      {
        "@type": "Blog",
        "@id": `${site.url}/blog#blog`,
        url: absoluteUrl("/blog"),
        name: `Writing — ${site.name}`,
        description: `Notes on Ruby on Rails, PostgreSQL, performance work and shipping software, by ${site.name}.`,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/blog" },
      ]),
    ],
  };
}

/** A single post. */
export function blogPostingSchema(post: Post, wordCount: number) {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        wordCount,
        keywords: post.tags,
        articleSection: post.tags[0],
        inLanguage: "en",
        // `generateImageMetadata` in the route names this image "og"; the hash
        // Next appends is cache-busting only, so the bare path resolves too.
        image: [`${url}/opengraph-image/og`],
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": `${site.url}/blog#blog` },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}

/** Renders a schema object as a JSON-LD script tag. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Static, server-generated content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
