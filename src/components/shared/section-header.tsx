interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  index?: string;
}

export function SectionHeader({ eyebrow, title, index }: SectionHeaderProps) {
  const displayIndex = index || (eyebrow.toLowerCase().includes("project") ? "03" : "04");

  return (
    <div className="mb-12 md:mb-16">
      {/* Massive Section Number sitting flush on the dividing line */}
      <div className="flex items-end justify-between">
        <span className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-none select-none">
          {displayIndex}
        </span>
        <span className="mb-2 sm:mb-3 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/60 select-none">
          {eyebrow}
        </span>
      </div>

      {/* Horizontal Divider Line directly under the number */}
      <div className="h-px w-full bg-border" />

      {/* Section Title below the line */}
      <div className="mt-4 sm:mt-5 max-w-2xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground/90 tracking-tight leading-snug">
          {title}
        </h2>
      </div>
    </div>
  );
}
