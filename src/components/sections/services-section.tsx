"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth : container.clientWidth;
      const gap = 32; // gap-8 in Tailwind is 32px
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
  };

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      scroll("right");
    }, 4500); // Scroll right every 4.5s
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualScroll = (direction: "left" | "right") => {
    scroll(direction);
    startAutoplay(); // Reset autoplay timer on manual scroll
  };

  return (
    <Section id="services" eyebrow="Services" title="What I offer to help your business grow.">
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="relative w-full">
        {/* Navigation Buttons (Top Right of Carousel) */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            type="button"
            onClick={() => handleManualScroll("left")}
            className="flex size-8 items-center justify-center rounded-full border border-border/30 bg-background/50 hover:bg-foreground hover:text-background text-muted-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="flex size-8 items-center justify-center rounded-full border border-border/30 bg-background/50 hover:bg-foreground hover:text-background text-muted-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none w-full pb-4"
        >
          {services.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group flex flex-col items-start border-t border-border/10 pt-5 snap-start shrink-0 w-full sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] hover:border-foreground/35 transition-colors duration-500"
              >
                {/* Header: Title and Index Number side-by-side */}
                <div className="flex items-baseline justify-between w-full">
                  <h3 className="text-sm font-bold text-foreground tracking-tight">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[10px] font-bold text-foreground/35 group-hover:text-foreground/75 transition-colors duration-500 select-none">
                    {formattedIndex}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-muted-foreground/80 mt-3 text-pretty group-hover:text-neutral-200 transition-colors duration-500">
                  {service.description}
                </p>

                {/* Tech/Keyword tags list */}
                <div className="font-mono text-[8.5px] text-muted-foreground/50 tracking-wider mt-5 group-hover:text-foreground/50 transition-colors duration-500">
                  {service.tags.join("  •  ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
