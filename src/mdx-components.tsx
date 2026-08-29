import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

/**
 * Typography for MDX content, mapped element by element instead of pulling in
 * @tailwindcss/typography — the design tokens here are the same ones the rest
 * of the site uses, so prose stays visually consistent for free.
 *
 * Headings are wrapped in anchors by rehype-autolink-headings, hence the
 * `[&_a]:` resets: the link should be clickable but shouldn't look like one.
 */
const headingLink = "[&_a]:no-underline [&_a]:text-inherit";

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className={`mt-12 scroll-mt-24 text-xl font-semibold tracking-tight ${headingLink}`}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className={`mt-9 scroll-mt-24 text-base font-semibold ${headingLink}`}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="mt-5 text-[15px] leading-[1.75] text-muted">
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => {
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <a
        {...props}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-fg underline decoration-accent/40 underline-offset-[3px] transition-colors hover:decoration-accent"
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul {...props} className="mt-5 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="mt-5 space-y-3">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      {...props}
      className="relative pl-5 text-[15px] leading-[1.75] text-muted before:absolute before:top-[0.68em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-line-strong marker:text-subtle"
    >
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-fg">
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em {...props} className="italic">
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 border-accent/40 pl-5 text-[15px] leading-relaxed text-muted italic"
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr {...props} className="my-10 border-line" />,
  table: ({ children, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      {...props}
      className="border-b border-line-strong pb-2 pr-4 font-medium"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td {...props} className="border-b border-line py-2 pr-4 text-muted">
      {children}
    </td>
  ),
  /**
   * MDX routes both inline code and the <code> inside a fenced block through
   * this one mapping, so the pill treatment has to be conditional. Shiki tags
   * fenced blocks with `language-*`; inline code has no className, and styling
   * it unconditionally nests a bordered box inside every code block.
   */
  code: ({ children, className, ...props }) =>
    className ? (
      <code {...props} className={className}>
        {children}
      </code>
    ) : (
      <code
        {...props}
        className="rounded border border-line bg-surface px-1 py-0.5 font-mono text-[0.85em] text-fg"
      >
        {children}
      </code>
    ),
  pre: CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
