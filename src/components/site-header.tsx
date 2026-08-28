import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-6">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent"
        >
          {site.name.toLowerCase().replace(" ", "")}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
