interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  index?: string;
}

export function SectionHeader({ eyebrow, title, index }: SectionHeaderProps) {
  const displayIndex = index || (eyebrow.toLowerCase().includes("project") ? "03" : "04");

  return (
    <div className="relative mb-12 md:mb-16 pl-11 sm:pl-13 md:pl-15 lg:pl-16">
      {/* Short vertical spine segment */}
      <div
        aria-hidden="true"
        className="absolute w-px bg-foreground/20 dark:bg-white/20 pointer-events-none left-[18px] sm:left-[22px] md:left-[26px] lg:left-[30px] top-[10px] bottom-[20px]"
      />

      {/* Target Reticle Circle Node centered on spine */}
      <div
        aria-hidden="true"
        className="absolute -left-11 sm:-left-13 md:-left-15 lg:-left-16 flex size-9 sm:size-10 items-center justify-center -translate-x-[2px] z-10 text-foreground top-[12px] sm:top-[16px] md:top-[22px]"
      >
        <svg viewBox="0 0 36 36" fill="none" className="size-8 sm:size-9 text-foreground">
          <line x1="18" y1="1" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <line x1="18" y1="29" x2="18" y2="35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <line x1="1" y1="18" x2="7" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <line x1="29" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <circle cx="18" cy="18" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <circle cx="18" cy="18" r="4.5" fill="currentColor" />
        </svg>
      </div>

      {/* Massive Section Number sitting flush directly on the dividing line */}
      <div className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.72] select-none">
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
