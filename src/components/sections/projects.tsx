import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { TagList } from "@/components/tag";
import { projects } from "@/content/site";

export function Projects() {
  return (
    <Section id="projects" index="04" title="Projects">
      <ul className="grid gap-4">
        {projects.map((project, i) => (
          <li key={project.name}>
            <Reveal delay={i * 60}>
              <article className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-medium">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-accent"
                      >
                        {project.name}
                        <ArrowUpRightIcon className="h-3.5 w-3.5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="font-mono text-xs whitespace-nowrap text-subtle">
                    {project.period}
                  </p>
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-4">
                  <TagList
                    items={project.stack}
                    label={`${project.name} stack`}
                  />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
