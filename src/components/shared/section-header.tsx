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

      <div className="relative w-full">
        {/* Target Reticle Circle Node centered on spine and aligned with the number */}
        <div
          aria-hidden="true"
          className="absolute -left-11 sm:-left-13 md:-left-15 lg:-left-16 flex size-9 sm:size-10 items-center justify-center -translate-x-[2px] z-10 text-foreground top-1/2 -translate-y-1/2"
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

        {/* Massive Section Number container: calibrated height so numbers are clearly identifiable and sliced cleanly at the bottom */}
        <div className="relative w-full overflow-hidden border-b border-neutral-300 dark:border-neutral-800 h-[60px] sm:h-[80px] md:h-[106px] lg:h-[108px]">
          <div className="font-sans text-7xl sm:text-8xl md:text-9xl lg:text-[130px] font-bold tracking-tight text-foreground leading-none select-none">
            {displayIndex}
          </div>
        </div>
      </div>

      {/* Section Title below the line */}
      <div className="pt-3.5 sm:pt-4 max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 tracking-tight leading-snug">
          {title}
        </h2>
      </div>
    </div>
  );
}
