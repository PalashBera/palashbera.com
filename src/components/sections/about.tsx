import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { education, site } from "@/content/site";

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
    </Section>
  );
}
