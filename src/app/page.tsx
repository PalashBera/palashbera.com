import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { education, experience, site, skills, socials } from "@/content/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
  sameAs: socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
  knowsAbout: skills.flatMap((group) => group.items),
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.institution,
  })),
  worksFor: {
    "@type": "Organization",
    name: experience[0].company,
  },
};

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
        <div id="top" />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
