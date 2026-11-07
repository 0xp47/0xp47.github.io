interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  index?: string;
}

const sectionBadgesByIndex: Record<string, { tag: string; range: string }> = {
  "01": { tag: "SECT", range: "01 — BIO" },
  "02": { tag: "SECT", range: "02 — SERV" },
  "03": { tag: "SECT", range: "03 — WORK" },
  "04": { tag: "SECT", range: "04 — POST" },
  "05": { tag: "SECT", range: "05 — HIST" },
  "06": { tag: "SECT", range: "06 — CERT" },
  "07": { tag: "SECT", range: "07 — SYNC" },
};

export function SectionHeader({ eyebrow, title, index }: SectionHeaderProps) {
  const displayIndex = index || (eyebrow.toLowerCase().includes("project") ? "03" : "04");
  const badge = sectionBadgesByIndex[displayIndex] || { tag: "SECT", range: `${displayIndex} — VIEW` };

  return (
    <div className="relative mb-12 md:mb-16 pl-[80px] sm:pl-[96px] md:pl-[112px] lg:pl-[128px]">
      {/* Short vertical spine segment */}
      <div
        aria-hidden="true"
        className="absolute w-px bg-foreground/20 dark:bg-white/20 pointer-events-none left-[80px] sm:left-[96px] md:left-[112px] lg:left-[128px] top-[10px] bottom-[20px]"
      />

      <div className="relative w-full">
        {/* Left bracket badge */}
        {badge && (
          <div
            aria-hidden="true"
            className="absolute right-full mr-7 sm:mr-8 top-1/2 -translate-y-1/2 flex items-center gap-1.5 select-none"
          >
            <svg width="5" height="26" viewBox="0 0 5 26" fill="none" className="text-neutral-500/80 shrink-0">
              <path d="M4 1H1V25H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
            <div className="flex flex-col font-mono text-[9px] uppercase tracking-wider leading-none shrink-0 whitespace-nowrap">
              <span className="text-neutral-500 font-medium tracking-widest text-[7.5px] mb-0.5">{badge.tag}</span>
              <span className="text-neutral-300 font-semibold">{badge.range}</span>
            </div>
          </div>
        )}

        {/* Target Reticle Circle Node centered on spine and aligned with the number */}
        <div
          aria-hidden="true"
          className="absolute left-0 -translate-x-1/2 flex size-8 sm:size-9 items-center justify-center z-10 text-foreground top-1/2 -translate-y-1/2"
        >
          <svg viewBox="0 0 36 36" fill="none" className="size-8 sm:size-9 text-neutral-300">
            <line x1="18" y1="1" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
            <line x1="18" y1="29" x2="18" y2="35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
            <line x1="1" y1="18" x2="7" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
            <line x1="29" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
            <circle cx="18" cy="18" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
            <circle cx="18" cy="18" r="4.5" fill="currentColor" />
          </svg>
        </div>

        {/* Massive Section Number container: bottom ~30% is cleanly hidden by overflow-hidden and border-b */}
        <div className="relative w-full overflow-hidden border-b border-neutral-300 dark:border-neutral-800 h-[68px] sm:h-[86px] md:h-[94px] lg:h-[108px] pl-6 sm:pl-7 md:pl-8">
          <div className="font-sans text-8xl sm:text-9xl md:text-[130px] lg:text-[150px] font-bold tracking-tight text-foreground leading-none select-none">
            {displayIndex}
          </div>
        </div>
      </div>

      {/* Section Title below the line */}
      <div className="pt-3.5 sm:pt-4 pl-6 sm:pl-7 md:pl-8 max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-normal text-neutral-700 dark:text-neutral-300 tracking-tight leading-snug">
          {title}
        </h2>
      </div>
    </div>
  );
}
