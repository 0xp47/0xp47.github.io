interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  index?: string;
}

export function SectionHeader({ eyebrow, title, index }: SectionHeaderProps) {
  const displayIndex = index || (eyebrow.toLowerCase().includes("project") ? "03" : "04");

  return (
    <div className="mb-12 md:mb-16">
      {/* Massive Section Number sitting flush directly on the dividing line */}
      <div className="flex items-end justify-between border-b border-border/80 dark:border-white/15">
        <span className="inline-block font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.78] translate-y-[0.14em] select-none">
          {displayIndex}
        </span>
        <span className="mb-2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/60 select-none">
          {eyebrow}
        </span>
      </div>

      {/* Section Title below the line */}
      <div className="pt-4 sm:pt-5 max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 dark:text-neutral-300 tracking-tight leading-snug text-balance">
          {title}
        </h2>
      </div>
    </div>
  );
}
