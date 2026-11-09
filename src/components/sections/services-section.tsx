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
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);

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
      if (!isPausedRef.current && isVisibleRef.current) {
        scroll("right");
      }
    }, 4500); // Scroll right every 4.5s
  }, [scroll]);

  useEffect(() => {
    startAutoplay();
    const container = scrollContainerRef.current;
    let observer: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisibleRef.current = entry.isIntersecting;
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(container);
    }
    return () => {
      observer?.disconnect();
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
            className="group flex size-8 items-center justify-center chamfer-btn border border-neutral-300 bg-white hover:border-neutral-400 text-neutral-600 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404] dark:hover:border-neutral-700 dark:text-neutral-400 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="group flex size-8 items-center justify-center chamfer-btn border border-neutral-300 bg-white hover:border-neutral-400 text-neutral-600 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404] dark:hover:border-neutral-700 dark:text-neutral-400 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      }
    >
      <div
        className="relative w-full"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
        onFocusCapture={() => {
          isPausedRef.current = true;
        }}
        onBlurCapture={() => {
          isPausedRef.current = false;
        }}
      >
        {/* Carousel Container */}
        <motion.div
          ref={scrollContainerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25, margin: "0px 0px -10% 0px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.16 },
            },
          }}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none w-full pt-1 pb-3"
        >
          {services.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative snap-start shrink-0 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] select-none p-[1px] transition-all duration-300 ease-out bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-600/80 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                <div
                  className="relative flex flex-col justify-between h-full bg-white p-3.5 sm:p-4 transition-colors duration-300 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  {/* Header: Title and Index Number */}
                  <div className="flex items-center justify-between gap-3 w-full pr-1">
                    <h3 className="text-[14px] sm:text-[14.5px] font-semibold text-neutral-900 dark:text-white tracking-tight leading-snug transition-colors duration-200">
                      {service.title}
                    </h3>
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5 chamfer-btn border border-neutral-200 bg-neutral-100 text-neutral-600 select-none tabular-nums group-hover:border-neutral-300 group-hover:text-neutral-900 group-hover:scale-105 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-400 dark:group-hover:border-neutral-700 dark:group-hover:text-white transition-all duration-300 shrink-0">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Description (concise 2 lines) */}
                  <p className="text-[11.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 text-pretty">
                    {service.description}
                  </p>

                  {/* Tech/Keyword tags list */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800/40 font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 truncate">
                    {service.tags.join("  ·  ")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
