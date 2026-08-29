"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

/**
 * Highlights the section currently in view on the home page, and the Writing
 * link on any /blog route. The observer band sits in the upper third of the
 * viewport so the highlight tracks what you're reading rather than whatever
 * happens to be scrolling past the bottom.
 */
export function NavLinks() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const visible = useRef(new Set<string>());

  useEffect(() => {
    // Off the home page there are no sections to track, and the render below
    // ignores `activeSection` anyway, so leaving it stale is harmless.
    if (!onHome || typeof IntersectionObserver === "undefined") return;

    const ids = nav
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id));

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // Document order wins, so the topmost visible section is the active one.
        setActiveSection(ids.find((id) => visible.current.has(id)) ?? null);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <nav aria-label="Sections" className="hidden md:block">
      <ul className="flex items-center gap-6">
        {nav.map((item) => {
          const active = item.sectionId
            ? onHome && activeSection === item.sectionId
            : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
