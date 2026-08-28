"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Fades content in the first time it scrolls into view.
 *
 * The hidden state is scoped to `html.js` in CSS, so with JavaScript disabled
 * the content simply renders visible instead of getting stuck at opacity 0.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support: unhide directly rather than routing through state.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "true" : "false"}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
