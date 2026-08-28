export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </li>
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
