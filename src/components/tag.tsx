import type { Skill } from "@/content/site";

const BASE =
  "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className={`${BASE} border-line bg-surface text-muted`}>{children}</li>
  );
}

export function TagList({
  items,
  label,
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

/**
 * Same pill, but core skills are tinted so the depth of the stack reads at a
 * glance instead of every technology looking equally weighted.
 */
export function SkillList({
  items,
  label,
}: {
  items: readonly Skill[];
  label?: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((skill) => (
        <li
          key={skill.name}
          className={
            skill.core
              ? `${BASE} border-accent/35 bg-accent-soft text-accent`
              : `${BASE} border-line bg-surface text-muted`
          }
        >
          {skill.name}
        </li>
      ))}
    </ul>
  );
}
