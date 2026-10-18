"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
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
        "group relative flex h-full flex-col items-start border-t border-border py-6 transition-colors duration-300 hover:border-foreground/50",
        className,
      )}
    >
      {/* Category + stars (bare text, no chips) */}
      <div className="mb-3 flex w-full items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
          {project.category}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/40 tabular-nums">
          {project.stars ? `${project.stars}★` : ""}
        </span>
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
            <ArrowUpRight className="size-3.5 translate-y-px text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </a>
        ) : (
          project.name
        )}
      </h3>

      <p className="mt-2 text-xs leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-foreground dark:text-neutral-400">
        {project.description}
      </p>

      {/* Stack as plain mono text + details */}
      <div className="mt-auto w-full pt-6">
        <div className="font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground/55">
          {project.stack.slice(0, 3).join("  ·  ")}
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Details
          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
