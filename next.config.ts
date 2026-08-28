import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Baseline hardening headers.
 *
 * `script-src`/`style-src` allow 'unsafe-inline' because Next.js streams inline
 * hydration scripts and next/font emits inline styles; locking those down needs
 * a per-request nonce from middleware, which would opt the whole site out of
 * static rendering. Everything is still origin-locked, so no third-party script
 * or style host can be pulled in.
 *
 * Development additionally needs 'unsafe-eval' (React's dev build uses eval for
 * debugging features), websockets for hot reload, and no HTTPS upgrade so that
 * http://localhost keeps working. None of those relaxations ship to production.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
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
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
