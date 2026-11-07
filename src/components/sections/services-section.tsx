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
      const gap = 20; // 20px gap between cards
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
    <Section
      id="services"
      eyebrow={sectionMeta.services.eyebrow}
      title={sectionMeta.services.title}
      headerMarginBottom="mb-4 sm:mb-5"
      headerAction={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleManualScroll("left")}
            className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#040404] hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#040404] hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      }
    >
      <div className="relative w-full">
        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none w-full pb-3"
        >
          {services.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative snap-start shrink-0 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] select-none p-[1px] transition-colors duration-200 bg-neutral-800/60 hover:bg-neutral-700"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                <div
                  className="relative flex flex-col justify-between h-full bg-[#040404] p-3.5 sm:p-4 transition-colors duration-200 group-hover:bg-[#080808]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
                  }}
                >
                  {/* Header: Title and Index Number */}
                  <div className="flex items-center justify-between gap-3 w-full pr-1">
                    <h3 className="text-[14px] sm:text-[14.5px] font-semibold text-white tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5 chamfer-btn border border-neutral-800 bg-[#0a0a0a] text-neutral-400 select-none tabular-nums group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200 shrink-0">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Description (concise 2 lines) */}
                  <p className="text-[11.5px] leading-relaxed text-neutral-400 mt-2 line-clamp-2 text-pretty">
                    {service.description}
                  </p>

                  {/* Tech/Keyword tags list */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-800/40 font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-500 truncate">
                    {service.tags.join("  ·  ")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
