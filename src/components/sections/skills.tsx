import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SkillList } from "@/components/tag";
import { skills } from "@/content/site";

export function Skills() {
  return (
    <Section id="skills" index="03" title="Skills">
      <dl className="space-y-7">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 60}>
            <div className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs tracking-wide text-subtle uppercase sm:pt-1.5">
                {group.title}
              </dt>
              <dd>
                <SkillList items={group.items} label={group.title} />
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={skills.length * 60}>
        <p className="mt-8 flex items-center gap-2 font-mono text-[11px] text-subtle">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full border border-accent/35 bg-accent-soft"
          />
          Highlighted pills are where I&apos;m deepest.
        </p>
      </Reveal>
    </Section>
  );
}
