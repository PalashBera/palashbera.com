import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";
import { JsonLd, profilePageSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-contrast"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
      <JsonLd schema={profilePageSchema()} />
    </>
  );
}
