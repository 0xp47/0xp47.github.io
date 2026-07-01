"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, projectFilters } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <Section id="projects" eyebrow="Featured Projects" title="A selection of projects I've built.">
      <div className="mb-8 inline-flex rounded-full border border-border/20 bg-black/20 p-1 backdrop-blur-sm">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300",
              activeFilter === filter
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div 
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 }
          }
        }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8"
      >
        {filteredProjects.map((project) => (
          <motion.article
            key={project.name}
            variants={cardVariants}
            className="group relative flex flex-col gap-3"
          >
            {/* Compact borderless aspect-locked image */}
            {project.isPrivate ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/15 bg-black/30 shadow-sm transition-all duration-500">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover grayscale contrast-[1.01] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
                />
              </div>
            ) : (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/15 bg-black/30 shadow-sm transition-all duration-500 hover:border-foreground/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover grayscale contrast-[1.01] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
                />
              </a>
            )}

            {/* Project metadata and text details underneath */}
            <div className="flex flex-col gap-1 px-0.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {project.isPrivate ? (
                    <span className="flex items-center gap-1">
                      {project.name}
                    </span>
                  ) : (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      {project.name}
                      <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px" />
                    </a>
                  )}
                </h3>
                <span className="font-mono text-[8.5px] font-bold tracking-[0.12em] text-foreground/40 uppercase flex items-center gap-1.5">
                  {project.category}
                  {project.isPrivate && (
                    <span className="text-muted-foreground/80 font-semibold tracking-wider text-[8px] bg-foreground/5 px-1.5 py-0.5 rounded border border-border/25 normal-case">
                      Private
                    </span>
                  )}
                </span>
              </div>
              
              <p className="text-xs leading-relaxed text-neutral-300">
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-2 pt-1">
                {/* Dot-separated tech stack list */}
                <div className="font-mono text-[9px] text-muted-foreground tracking-wide">
                  {project.stack.join("  •  ")}
                </div>
                
                {/* Minimal Source Link */}
                {project.isPrivate ? (
                  <span className="font-mono text-[9px] text-muted-foreground/50 flex items-center gap-1">
                    <Lock className="size-2.5" />
                    private
                  </span>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[9px] text-muted-foreground hover:text-foreground hover:underline transition-colors flex items-center gap-1"
                  >
                    <GitBranch className="size-3" />
                    source
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
