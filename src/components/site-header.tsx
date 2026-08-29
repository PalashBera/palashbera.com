import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent"
        >
          {site.name.toLowerCase().replace(" ", "")}
          <span className="text-accent">.</span>
        </Link>

        <NavLinks />

        <ThemeToggle />
      </div>
    </header>
  );
}
