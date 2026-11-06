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
      const gap = 24; // 24px gap between cards
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
    }, 4500); // Scroll right every 4.5s
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
    startAutoplay(); // Reset autoplay timer on manual scroll
  };

  return (
    <Section id="services" eyebrow={sectionMeta.services.eyebrow} title={sectionMeta.services.title}>
      <div className="relative w-full">
        {/* Navigation Buttons (Top Right of Carousel) */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            type="button"
            onClick={() => handleManualScroll("left")}
            className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
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
                className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-colors duration-200 hover:border-neutral-700 select-none snap-start shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
              >
                {/* Header: Title and Index Number */}
                <div className="flex items-start justify-between gap-3 w-full">
                  <h3 className="text-[15px] font-semibold text-white tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400 select-none tabular-nums group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200 shrink-0">
                    {formattedIndex}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-neutral-400 mt-2.5 text-pretty">
                  {service.description}
                </p>

                {/* Tech/Keyword tags list */}
                <div className="mt-auto pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500 leading-relaxed">
                  {service.tags.join("  ·  ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
