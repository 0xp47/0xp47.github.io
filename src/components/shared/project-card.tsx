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
        "group relative flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card/40 p-5 backdrop-blur-xs transition-all duration-200 hover:border-foreground/30 hover:bg-card/70 hover:-translate-y-0.5 shadow-xs",
        className
      )}
    >
      <div>
        {/* Category + Live Status / Stars */}
        <div className="mb-3 flex w-full items-center justify-between gap-3">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
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
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/60 font-mono text-[9px] text-muted-foreground/75 tabular-nums">
                <span className="text-amber-400">★</span>
                {project.stars}
              </span>
            ) : null}
          </div>
        </div>

        {/* Title — links out when live */}
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {isLive ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-baseline gap-1 transition-colors duration-200 hover:text-primary focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            >
              {project.name}
              <ArrowUpRight className="size-3 translate-y-px text-muted-foreground/50 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Stack Tags + Details Action */}
      <div className="mt-5 w-full pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-2 py-0.5 rounded border border-border/60 bg-foreground/[0.02] text-muted-foreground/80 transition-colors duration-200 group-hover:border-foreground/20 group-hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
        >
          Details
          <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
