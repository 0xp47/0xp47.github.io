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
      <div className="font-sans text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-foreground leading-[0.72] select-none">
        {displayIndex}
      </div>

      {/* Full-width razor-sharp horizontal dividing line */}
      <div className="w-full h-px bg-neutral-300 dark:bg-neutral-800 -mt-px" />

      {/* Section Title below the line */}
      <div className="pt-3.5 max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 tracking-tight leading-snug">
          {title}
        </h2>
      </div>
    </div>
  );
}
