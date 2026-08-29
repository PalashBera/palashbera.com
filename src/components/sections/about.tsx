import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { education, focusAreas, site } from "@/content/site";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-4 text-[15px] leading-relaxed text-muted">
          {site.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={80}>
          <h3 className="mb-3 font-mono text-xs tracking-wide text-subtle uppercase">
            Education
          </h3>
          {education.map((item) => (
            <div key={item.institution} className="text-sm">
              <p className="font-medium">{item.degree}</p>
              <p className="mt-1 text-muted">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-subtle">
                {item.period} · {item.detail}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={140}>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {focusAreas.map((area) => (
            <li key={area.title} className="bg-surface p-5">
              <h3 className="text-sm font-medium">{area.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {area.body}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
