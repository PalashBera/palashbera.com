# palashbera.com

Personal portfolio for Palash Bera — a minimalist, single-page site with light,
dark, and system themes.

## Stack

| Concern  | Choice                                     |
| -------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript (strict)                        |
| Styling  | Tailwind CSS v4 (CSS-first `@theme` config) |
| Fonts    | Geist Sans + Geist Mono, self-hosted via `next/font` |
| Runtime  | Node.js 24.16.0 (see `.nvmrc`)             |

No UI or theming libraries — the theme store, icons, and animations are all
local, so the only runtime dependencies are React and Next.

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

- **Years of experience** is derived from `CAREER_START`, so the hero and about
  copy stay correct without an annual edit.
- **Adding a social link** (GitHub, X, Bluesky) means appending to the `socials`
  array; it renders in the footer and feeds the `sameAs` field in the
  structured data automatically.
- **The résumé PDF** is served from `public/Palash-Bera-Resume.pdf`. Replace the
  file in place to publish a new version.

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

Static metadata, a generated OG image (`src/app/opengraph-image.tsx`), a
generated favicon (`src/app/icon.tsx`), `sitemap.xml`, `robots.txt`, and
`Person` JSON-LD. Update `site.url` in `src/content/site.ts` if the domain
changes — everything else derives from it.

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
