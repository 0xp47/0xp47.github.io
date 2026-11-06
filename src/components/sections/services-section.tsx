"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth : container.clientWidth;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        const isEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 5;
        if (isEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      scroll("right");
    }, 4500);
  }, [scroll]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [startAutoplay]);

  const handleManualScroll = (direction: "left" | "right") => {
    scroll(direction);
    startAutoplay();
  };

  return (
    <Section id="services" eyebrow={sectionMeta.services.eyebrow} title={sectionMeta.services.title}>
      <div className="relative w-full">
        {/* Navigation Controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            type="button"
            onClick={() => handleManualScroll("left")}
            className="flex size-8 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.02] text-muted-foreground transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="flex size-8 items-center justify-center rounded-full border border-border/80 bg-foreground/[0.02] text-muted-foreground transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            aria-label="Next service"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none w-full pb-4"
        >
          {services.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group flex flex-col items-start p-5 sm:p-6 rounded-xl border border-border/80 bg-card/40 backdrop-blur-xs transition-all duration-200 hover:border-foreground/30 hover:bg-card/70 hover:-translate-y-0.5 snap-start shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shadow-xs"
              >
                {/* Header: Title and Index Number */}
                <div className="flex items-baseline justify-between w-full">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border border-border/70 text-muted-foreground select-none tabular-nums">
                    {formattedIndex}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty transition-colors duration-200 group-hover:text-foreground">
                  {service.description}
                </p>

                {/* Tech tags */}
                <div className="mt-auto pt-6 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 leading-relaxed transition-colors duration-200 group-hover:text-foreground/80">
                  {service.tags.join(" · ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
