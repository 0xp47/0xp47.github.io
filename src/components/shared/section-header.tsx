interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <div className="flex items-center gap-3 md:items-start">
        <span className="mt-2 hidden h-px w-10 bg-border md:block" />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      </div>
      <div>
        <h2 className="max-w-3xl text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 h-px bg-gradient-to-r from-foreground/25 via-border to-transparent" />
      </div>
    </div>
  );
}
