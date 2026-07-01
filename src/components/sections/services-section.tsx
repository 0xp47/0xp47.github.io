"use client";

import { motion } from "framer-motion";
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
  return (
    <Section id="services" eyebrow="Services" title="What I offer to help your business grow.">
      <motion.div 
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 }
          }
        }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-6"
      >
        {services.map((service, index) => {
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group flex flex-col items-start"
            >
              {/* Large low-opacity index number */}
              <span className="font-mono text-5xl font-extrabold tracking-tighter text-foreground/10 group-hover:text-foreground/30 transition-colors duration-500 select-none">
                {formattedIndex}
              </span>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground mt-4 tracking-tight group-hover:text-foreground transition-colors duration-300">
                {service.title}
              </h3>

              {/* Animated divider line */}
              <div className="mt-3.5 h-px w-8 bg-foreground/15 group-hover:w-full group-hover:bg-foreground/30 transition-all duration-700 ease-out" />

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-300 mt-4 text-pretty">
                {service.description}
              </p>

              {/* Tech/Keyword tags list */}
              <div className="font-mono text-[9px] text-muted-foreground/60 tracking-wider mt-auto pt-6 group-hover:text-foreground/70 transition-colors duration-500">
                {service.tags.join("  ·  ")}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
