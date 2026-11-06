"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  description: string;
  category: string;
  stack: string[];
  live?: string;
  github?: string;
  readme?: string;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  stars?: number;
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  className?: string;
}

export function ProjectCard({ project, onViewDetails, className }: ProjectCardProps) {
  const isLive = !project.isPrivate && project.live && project.live !== project.github;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col items-start border-t border-border py-6 transition-all duration-300 hover:border-foreground/60 hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Category + Live Status / Stars */}
      <div className="mb-3 flex w-full items-center justify-between gap-3">
        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="inline-flex items-center gap-1 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
          {project.stars ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/40 font-mono text-[9px] text-muted-foreground/75 tabular-nums">
              <span className="text-amber-400">★</span>
              {project.stars}
            </span>
          ) : null}
        </div>
      </div>

      {/* Title — links out when live */}
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {isLive ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-baseline gap-1 transition-colors duration-300"
          >
            {project.name}
            <ArrowUpRight className="size-3.5 translate-y-px text-muted-foreground/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </a>
        ) : (
          project.name
        )}
      </h3>

      <p className="mt-2 text-xs leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-foreground dark:text-neutral-400">
        {project.description}
      </p>

      {/* Stack Tags + Details Action */}
      <div className="mt-auto w-full pt-5">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-2 py-0.5 rounded border border-border/50 bg-foreground/[0.02] text-muted-foreground/75 transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="mt-3.5 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Details
          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
