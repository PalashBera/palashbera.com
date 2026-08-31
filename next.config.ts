import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Baseline hardening headers.
 *
 * `script-src`/`style-src` allow 'unsafe-inline' because Next.js streams inline
 * hydration scripts, next/font emits inline styles, and Shiki emits per-token
 * inline styles; locking those down needs a per-request nonce from middleware,
 * which would opt the whole site out of static rendering. Everything is still
 * origin-locked, so no third-party script or style host can be pulled in.
 *
 * Development additionally needs 'unsafe-eval' (React's dev build uses eval for
 * debugging features), websockets for hot reload, and no HTTPS upgrade so that
 * http://localhost keeps working. None of those relaxations ship to production.
 *
 * Vercel Analytics needs no allowance in production: it serves its script from
 * /_vercel/insights/script.js and beacons to /_vercel/insights/event, both
 * first-party, so 'self' already covers them. Only the development build pulls
 * a debug script from va.vercel-scripts.com.
 */
const VERCEL_ANALYTICS_DEV_HOST = "https://va.vercel-scripts.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? ` 'unsafe-eval' ${VERCEL_ANALYTICS_DEV_HOST}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ` ws: wss: ${VERCEL_ANALYTICS_DEV_HOST}` : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

/**
 * Plugins are referenced by name rather than imported: Turbopack runs the MDX
 * pipeline in Rust and can only receive serializable options, so a JS function
 * passed here would fail to cross the boundary.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
      [
        "@shikijs/rehype",
        {
          // Both themes are emitted as CSS variables in a single build, so
          // switching colour scheme costs no JavaScript and no re-highlight.
          themes: { light: "github-light", dark: "github-dark-dimmed" },
          defaultColor: false,
          // Puts `language-*` on the <code>, which is how the code block header
          // knows what to label itself.
          addLanguageClass: true,
          fallbackLanguage: "text",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
