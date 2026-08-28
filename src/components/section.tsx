import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-14 sm:py-20">
      <Reveal>
        <div className="mb-8 flex items-center gap-4 sm:mb-10">
          <h2
            id={`${id}-heading`}
            className="flex items-baseline gap-3 text-sm font-medium tracking-wide uppercase"
          >
            <span className="font-mono text-xs text-accent">{index}</span>
            {title}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}
