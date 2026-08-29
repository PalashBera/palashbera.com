import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { TagList } from "@/components/tag";
import { experience } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="space-y-10">
        {experience.map((job, i) => (
          <li key={job.company}>
            <Reveal delay={i * 60}>
              <article className="border-l border-line pl-5 sm:pl-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-medium">
                    {job.title}
                    <span className="text-subtle"> · </span>
                    <span className="text-muted">{job.company}</span>
                  </h3>
                  <p className="flex items-center gap-2 font-mono text-xs whitespace-nowrap text-subtle">
                    {job.current ? (
                      <span
                        aria-label="Current role"
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      />
                    ) : null}
                    {job.period}
                  </p>
                </div>

                <p className="mt-1.5 text-sm text-subtle">{job.context}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight.slice(0, 32)}
                      className="relative pl-4 text-[15px] leading-relaxed text-muted before:absolute before:top-[0.65em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-line-strong"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <TagList items={job.stack} label={`${job.company} stack`} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
