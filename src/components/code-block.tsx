import { isValidElement } from "react";
import { CopyButton } from "@/components/copy-button";

/** Display names for the languages used in posts; anything else falls back to the raw tag. */
const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Shell",
  css: "CSS",
  diff: "Diff",
  erb: "ERB",
  html: "HTML",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  markdown: "Markdown",
  md: "Markdown",
  mdx: "MDX",
  python: "Python",
  rb: "Ruby",
  ruby: "Ruby",
  sh: "Shell",
  shell: "Shell",
  sql: "SQL",
  text: "Text",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  yaml: "YAML",
  yml: "YAML",
};

function languageOf(children: React.ReactNode): string | null {
  if (!isValidElement<{ className?: string }>(children)) return null;
  const match = /language-([\w-]+)/.exec(children.props.className ?? "");
  return match?.[1] ?? null;
}

/**
 * Chrome around a fenced code block: a header strip with the language and a
 * copy button, and a horizontally scrollable <pre>.
 *
 * Shiki has already highlighted `children` at build time, so the props coming
 * in carry its theme CSS variables and must be spread onto the <pre> itself.
 */
export function CodeBlock({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"pre">) {
  const language = languageOf(children);
  const label = language ? (LANGUAGE_LABELS[language] ?? language) : null;

  return (
    <figure className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-3 py-1.5">
        <span className="font-mono text-[11px] tracking-wide text-subtle">
          {label ?? ""}
        </span>
        <CopyButton />
      </figcaption>

      <pre
        {...props}
        className={`overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.65] ${className ?? ""}`}
      >
        {children}
      </pre>
    </figure>
  );
}
