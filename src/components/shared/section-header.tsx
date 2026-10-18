interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2">
        <span className="font-mono text-[11px] font-semibold text-muted-foreground/50 tabular-nums">
          /
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
          {eyebrow}
        </p>
      </div>
      <div>
        <h2 className="max-w-3xl text-balance text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6 h-px bg-border" />
      </div>
    </div>
  );
}
