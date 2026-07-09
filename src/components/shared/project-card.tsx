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
  return (
    <article className={cn("group relative flex flex-col border border-border/10 bg-transparent rounded-xl overflow-hidden hover:border-foreground/20 transition-all duration-500 h-full", className)}>
      {/* macOS-style Window Title Bar Header */}
      <div className="flex items-center justify-between border-b border-border/10 bg-white/[0.02] px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/30" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/10" />
        </div>
        <span className="font-mono text-[8px] text-muted-foreground/50 tracking-wider">
          ~/projects/{project.name.toLowerCase().replace(/[\s-]/g, "")}
        </span>
      </div>

      {/* Window Card Body */}
      <div className="flex-grow p-4 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              {project.isPrivate || !project.live || project.live === project.github ? (
                <span>{project.name}</span>
              ) : (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1 group-hover:text-foreground"
                >
                  {project.name}
                  <ArrowUpRight className="size-3 text-muted-foreground/45 group-hover:text-foreground group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-all duration-300" />
                </a>
              )}
            </h3>
            <span className="font-mono text-[8px] font-bold text-foreground/40 uppercase tracking-widest shrink-0 bg-foreground/[0.03] px-1.5 py-0.5 rounded border border-border/10">
              {project.category}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-neutral-400 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border/5 pt-3 mt-1">
          <div className="font-mono text-[8.5px] text-muted-foreground/50 tracking-wide truncate max-w-[70%]">
            {project.stack.slice(0, 3).join("  •  ")}
          </div>
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="font-mono text-[9px] text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer font-bold flex items-center gap-1 shrink-0"
          >
            <ArrowUpRight className="size-3" />
            details
          </button>
        </div>
      </div>
    </article>
  );
}
