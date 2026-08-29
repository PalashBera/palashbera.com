import { DownloadIcon, MailIcon, PinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site, stats, yearsOfExperience } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-16 pb-6 sm:pt-24">
      <Reveal>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          />
          {site.availability}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h1
          id="hero-heading"
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {site.name}
        </h1>
        <p className="mt-3 text-lg text-muted sm:text-xl">
          {site.role} · {yearsOfExperience()}+ years
        </p>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {site.tagline}
        </p>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            <MailIcon className="h-4 w-4" />
            Get in touch
          </a>
          <a
            href={site.resume}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-4 w-4" />
            Résumé
          </a>
          <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
            <PinIcon className="h-4 w-4" />
            {site.location}
          </span>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-xl font-semibold tracking-tight sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-1 block font-mono text-[11px] leading-snug text-subtle">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
