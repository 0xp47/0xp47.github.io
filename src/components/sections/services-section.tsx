"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cpu,
  Server,
  Terminal,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { services, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Cpu,
  Server,
  Terminal,
  Briefcase,
};

const SERVICE_TITLE_PARTS: Record<string, { line1: string; line2: string }> = {
  "Full-Stack Web Apps": { line1: "Full-Stack", line2: "Web Apps" },
  "Mobile App Development": { line1: "Mobile App", line2: "Development" },
  "Automation & Workflows": { line1: "Automation &", line2: "Workflows" },
  "API & Backend Systems": { line1: "API & Backend", line2: "Systems" },
  "Custom Software Development": { line1: "Custom Software", line2: "Development" },
  "IT & Tech Consulting": { line1: "IT & Tech", line2: "Consulting" },
};

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
            const IconComponent = SERVICE_ICONS[service.icon] || Globe;
            const titleParts = SERVICE_TITLE_PARTS[service.title] || {
              line1: "Service",
              line2: service.title,
            };

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative flex rounded-tl-[24px] sm:rounded-tl-[28px] rounded-br-[28px] sm:rounded-br-[36px] rounded-tr-none rounded-bl-none border border-neutral-800/90 bg-[#0a0a0a] hover:border-neutral-600 transition-all duration-300 select-none snap-start shrink-0 w-full sm:w-[calc((100%-24px)/2)] overflow-hidden min-h-[175px] sm:min-h-[185px] shadow-lg"
              >
                {/* Left Section Background (contrasting metallic graphite gradient with subtle sheen) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[36%] sm:w-[34%] bg-gradient-to-br from-neutral-800/90 via-neutral-900/95 to-neutral-800/85 z-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%)",
                  }}
                />

                {/* Subtle specular highlight sheen along the top of left section */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-[36%] sm:w-[34%] bg-gradient-to-r from-white/40 via-white/20 to-transparent z-10 pointer-events-none"
                />

                {/* Crisp Diagonal Accent Highlight Stripe */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[36%] sm:w-[34%] bg-gradient-to-b from-white via-neutral-300 to-white/70 pointer-events-none z-10"
                  style={{
                    clipPath: "polygon(calc(100% - 2.5px) 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 34.5px) 100%)",
                  }}
                />

                {/* Dark hairline shadow behind the stripe */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[36%] sm:w-[34%] bg-black/70 pointer-events-none z-10"
                  style={{
                    clipPath: "polygon(calc(100% - 5px) 0, calc(100% - 2.5px) 0, calc(100% - 34.5px) 100%, calc(100% - 32px) 100%)",
                  }}
                />

                {/* Left Content Column */}
                <div className="relative z-20 flex flex-col justify-between w-[34%] sm:w-[32%] p-4 sm:p-5 pr-1">
                  {/* Two-line Service Title (matching reference stream alert typography) */}
                  <div className="flex flex-col select-none pr-1">
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-neutral-400 uppercase leading-tight">
                      {titleParts.line1}
                    </span>
                    <span className="font-sans text-[13px] sm:text-[15px] font-bold text-white tracking-tight leading-snug mt-1">
                      {titleParts.line2}
                    </span>
                  </div>

                  {/* Circular Icon Emblem (matching reference star/heart/emblem circle badge) */}
                  <div className="mt-auto pt-4">
                    <div className="flex size-9 sm:size-10 items-center justify-center rounded-full border-2 border-white/90 bg-[#0a0a0a] text-white shadow-md group-hover:border-white group-hover:scale-105 transition-all duration-200">
                      <IconComponent className="size-4.5 sm:size-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="relative z-20 flex flex-col justify-between flex-1 p-4 sm:p-5 pl-7 sm:pl-9 bg-transparent">
                  {/* Header with index badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold">
                      SERVICE // {formattedIndex}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11.5px] sm:text-xs leading-relaxed text-neutral-300/90 my-auto py-2.5 text-pretty font-normal">
                    {service.description}
                  </p>

                  {/* Tags list */}
                  <div className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-neutral-500 truncate pt-1">
                    {service.tags.slice(0, 4).join("  ·  ")}
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
