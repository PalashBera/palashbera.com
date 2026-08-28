import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { TagList } from "@/components/tag";
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
                <TagList items={group.items} label={group.title} />
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
