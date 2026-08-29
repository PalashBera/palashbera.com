# palashbera.com

Personal portfolio for Palash Bera — a minimalist, single-page site with light,
dark, and system themes.

## Stack

| Concern  | Choice                                     |
| -------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript (strict)                        |
| Styling  | Tailwind CSS v4 (CSS-first `@theme` config) |
| Content  | MDX via `@next/mdx`, Shiki for build-time highlighting |
| Fonts    | Geist Sans + Geist Mono, self-hosted via `next/font` |
| Runtime  | Node.js 24.16.0 (see `.nvmrc`)             |

No UI or theming libraries — the theme store, icons, animations, and prose
typography are all local. Everything prerenders to static HTML, and the only
JavaScript shipped to the browser is the theme toggle, the nav highlight, the
scroll reveals, and the copy button on code blocks.

One gotcha worth knowing if you touch `src/mdx-components.tsx`: MDX routes both
inline code and the `<code>` inside a fenced block through the same `code`
mapping. Styling it unconditionally nests a bordered pill inside every code
block, so the mapping checks for Shiki's `language-*` class first.

## Getting started

```bash
nvm use          # picks up 24.16.0 from .nvmrc
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server with hot reload            |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint (`eslint-config-next`)         |
| `npm run typecheck` | `tsc --noEmit`                        |

## Editing content

Everything on the page — copy, jobs, skills, projects, links — lives in
[`src/content/site.ts`](src/content/site.ts). Change that one file and the UI
follows; you shouldn't need to touch components for a content update.

A few things worth knowing:

- **Years of experience** is derived from `CAREER_START`, so the hero, about
  copy, stats, and focus areas stay correct without an annual edit.
- **Core skills** are marked with `core: true` and render tinted, so depth reads
  at a glance. Keep that list short — if everything is highlighted, nothing is.
- **Adding a project** — the `projects` array has a commented template above it.
  An entry with an `href` gets a link arrow; `context` renders as the small
  label above the title.
- **Adding a social link** (GitHub, X, Bluesky) means appending to the `socials`
  array; it renders in the footer and feeds the `sameAs` field in the
  structured data automatically.
- **The résumé PDF** is served from `public/Palash-Bera-Resume.pdf`. Replace the
  file in place to publish a new version.
- **`site.availability`** drives the hero badge — swap it to something like
  "Open to new roles" when actively job hunting.

### A note on claims

Every number on the site traces back to the résumé, with one deliberate
correction: the résumé's "240% reduction in load times" is not a possible
quantity — you can't remove more than 100% of something. It's rendered here as
"2.4× faster", which is almost certainly the intended meaning and survives
scrutiny in an interview.

## Writing a blog post

Two steps:

1. Create `src/content/posts/<slug>.mdx` — just the body, starting at the first
   paragraph. No frontmatter and no `# Title`; the page renders the title from
   the registry so it can't drift out of sync with the metadata.
2. Add an entry to the `posts` array in
   [`src/content/posts.ts`](src/content/posts.ts) where `slug` matches the
   filename.

Routing, the OG image, reading time, the RSS feed, the sitemap entry, JSON-LD,
prev/next links, and the "Writing" block on the home page are all derived from
that entry. Set `draft: true` to keep a post out of every public surface, and
set `updated` when you meaningfully revise something already published.

### Markdown notes

- Fenced code blocks are highlighted at build time by Shiki (via
  `@shikijs/rehype`) in both themes at once, emitted as CSS variables — so
  switching theme costs no JavaScript and no re-highlight. Tag the language
  (` ```ruby `) to get colour and a header label.
- Each block is wrapped by
  [`src/components/code-block.tsx`](src/components/code-block.tsx), which adds
  the language label and a copy button, and scrolls long lines horizontally
  rather than wrapping mid-token. Add a language to `LANGUAGE_LABELS` there to
  control how it's displayed.
- `## Headings` become linkable anchors automatically.
- GitHub-flavoured markdown is on, so tables and strikethrough work.
- Element styling lives in [`src/mdx-components.tsx`](src/mdx-components.tsx)
  rather than `@tailwindcss/typography`, so prose uses the same design tokens as
  the rest of the site.

One constraint worth knowing: MDX plugins are configured **by name as strings**
in `next.config.ts`. Turbopack runs the MDX pipeline in Rust and can only accept
serializable options, so importing a plugin and passing the function will fail.

## Theming

Three states — `light`, `dark`, and `system` — with `system` as the default for
first-time visitors. The choice persists in `localStorage` under the `theme`
key and syncs across open tabs.

How it fits together:

- `src/lib/theme.ts` holds the shared constants plus `themeInitScript`, a small
  synchronous script injected into `<head>`. It applies the right class before
  first paint, which is what prevents a flash of the wrong theme.
- `src/lib/use-theme.ts` exposes the theme through `useSyncExternalStore`.
  `localStorage` and the `prefers-color-scheme` media query are external
  systems, so this models them as one rather than mirroring them into React
  state on mount.
- Colours are CSS custom properties on `:root` and `.dark` in
  `src/app/globals.css`, surfaced to Tailwind through `@theme inline`. To
  re-skin the site, edit those two blocks and nothing else.

## Accessibility and motion

- Skip-to-content link, labelled landmarks, and a `radiogroup` theme switcher.
- Scroll reveals are gated behind `html.js`, so with JavaScript disabled the
  full page renders visible instead of stuck at `opacity: 0`.
- `prefers-reduced-motion: reduce` disables animations and smooth scrolling.

## SEO

| Surface | Where |
| --- | --- |
| Canonical URLs, OG and Twitter tags | per-route `metadata` exports |
| OG images | `opengraph-image.tsx` at the root and per post, generated at build |
| Favicon, Apple touch icon, manifest | `icon.tsx`, `apple-icon.tsx`, `manifest.ts` |
| `sitemap.xml` | `src/app/sitemap.ts`, includes every published post with `lastModified` |
| `robots.txt` | `src/app/robots.ts` |
| RSS | `src/app/feed.xml/route.ts`, advertised via `alternates.types` |
| Structured data | `src/lib/seo.tsx` |
| 404 | `src/app/not-found.tsx`, `noindex` |

### Structured data

All JSON-LD is emitted as a single `@graph` per page with stable `@id` values,
and nodes cross-reference by `@id` instead of repeating themselves. That matters:
inlining the same author object on every post reads as several different people
to a crawler, whereas one `Person` node referenced by `@id` consolidates into a
single entity.

- Home — `WebSite` + `Person` + `ProfilePage`
- `/blog` — `Blog` listing every post, plus `BreadcrumbList`
- `/blog/[slug]` — `BlogPosting` with `wordCount`, `keywords`, `datePublished`,
  `dateModified` and image, plus `BreadcrumbList`

Update `site.url` in `src/content/site.ts` if the domain changes — canonicals,
the sitemap, the feed, and every schema URL derive from it.

### Before the first deploy

Add search-console verification tokens to the `metadata.verification` object in
`src/app/layout.tsx` if you want them in the HTML, and submit
`https://palashbera.com/sitemap.xml` to Google Search Console and Bing Webmaster
Tools. Neither is code — they just need doing once.

## Security headers

`next.config.ts` sets CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, and COOP.

The CSP keeps `'unsafe-inline'` for scripts and styles because Next.js streams
inline hydration scripts and `next/font` emits inline styles; locking those down
requires a per-request nonce from middleware, which would opt the entire site
out of static rendering. Everything remains origin-locked, so no third-party
script or style host can be loaded.

## Deploying

Every route prerenders to static output, so any Node host or edge platform
works. On Vercel it's zero-config. Set the production domain in `site.url`
before the first deploy so canonical URLs, the sitemap, and OG tags are right.
