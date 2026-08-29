"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copies the sibling <pre> of the enclosing <figure>.
 *
 * Reading from the DOM rather than taking the source as a prop keeps the
 * highlighted markup server-rendered — this button is the only JavaScript a
 * blog post ships.
 */
export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const code = event.currentTarget
        .closest("figure")
        ?.querySelector("pre")?.textContent;

      if (!code) return;

      try {
        await navigator.clipboard.writeText(code);
      } catch {
        // Clipboard denied (insecure context or blocked permission).
        return;
      }

      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded px-1.5 py-0.5 font-mono text-[11px] text-subtle transition-colors hover:bg-bg hover:text-fg"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only"> code to clipboard</span>
    </button>
  );
}
