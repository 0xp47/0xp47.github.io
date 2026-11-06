"use client";

import { useMemo } from "react";
import { ChevronsUpDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
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

interface VercelProjectMeta {
  displayName?: string;
  domain?: string;
  commitMsg?: string;
  repo?: string;
  updated?: string;
}

export const VERCEL_METADATA_MAP: Record<string, VercelProjectMeta> = {
  tdrive: {
    displayName: "tdrive",
    domain: "tdrv.vercel.app",
    commitMsg: "Remove Copy Link from public share page and ...",
    repo: "0xp47/Tdrive",
    updated: "Oct 31",
  },
  "axiom-lms": {
    displayName: "axiom-lms",
    domain: "axiom-lms.vercel.app",
    commitMsg: "fix(api): use deterministic bootstrap UUIDs for m...",
    repo: "0xp47/Axiom-LMS",
    updated: "2d ago",
  },
  "pos-and-inventory-system": {
    displayName: "pos-and-inventory-system",
    domain: "pos-and-inventory-system-navy.ver...",
    commitMsg: "Modify project description in README",
    repo: "0xp47/POS-and-Inventory-System",
    updated: "3d ago",
  },
  lumora: {
    displayName: "lumora",
    domain: "lumora-social.vercel.app",
    commitMsg: "feat: add dynamic lumens short-url routes, rede...",
    repo: "0xp47/Lumora-Frontend",
    updated: "Aug 12",
  },
  "ccs-assistant": {
    displayName: "ccs-assistant",
    domain: "ccs-assistant.vercel.app",
    commitMsg: "fix(mobile): resolve mobile burger menu drawer ...",
    repo: "0xp47/ccs-assistant",
    updated: "Oct 27",
  },
  "room-209": {
    displayName: "room-209",
    domain: "room-209.vercel.app",
    commitMsg: "fix(admin): use generic placeholders on login pa...",
    repo: "0xp47/room-209",
    updated: "Oct 26",
  },
  "philnits-ip-exam": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    commitMsg: "feat(presence): accurate cumulative study timer...",
    repo: "0xp47/PhilNITS-IP-Exam",
    updated: "Oct 24",
  },
  "philnits-reviewer": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    commitMsg: "feat(presence): accurate cumulative study timer...",
    repo: "0xp47/PhilNITS-IP-Exam",
    updated: "Oct 24",
  },
  "ccsas-dashboard": {
    displayName: "ccsas-dashboard",
    domain: "ccsas-dashboard.vercel.app",
    commitMsg: "sync: update dashboard with latest fixes from m...",
    repo: "0xp47/CCSAS-Dashboard",
    updated: "Oct 6",
  },
};

export function ProjectCard({ project, onViewDetails, className }: ProjectCardProps) {
  const meta = useMemo(() => {
    const slug = project.name.toLowerCase();
    const found = VERCEL_METADATA_MAP[slug];
    if (found) return found;

    // Derived metadata fallback for other projects
    const cleanDomain = project.live
      ? project.live.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
      : `${slug}.vercel.app`;

    return {
      displayName: slug,
      domain: cleanDomain,
      commitMsg: project.description || "Deploy from GitHub repository",
      repo: `0xp47/${project.name}`,
      updated: project.updatedAt
        ? new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Recent",
    };
  }, [project]);

  return (
    <article
      onClick={() => onViewDetails(project)}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-colors duration-200 hover:border-neutral-700 cursor-pointer select-none",
        className
      )}
    >
      {/* Top Header Row (no avatar icons, clean and compact) */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex flex-col justify-center">
          <h4 className="text-[15px] font-semibold text-white tracking-tight truncate leading-tight group-hover:text-white">
            {meta.displayName || project.name.toLowerCase()}
          </h4>
          <span
            className="text-xs text-neutral-400 truncate hover:text-white hover:underline transition-colors leading-tight mt-1"
            onClick={(e) => {
              if (project.live) {
                e.stopPropagation();
                window.open(project.live, "_blank", "noopener,noreferrer");
              }
            }}
          >
            {meta.domain}
          </span>
        </div>

        {/* Right Status Ring + Up-Down Chevrons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex size-7 items-center justify-center rounded-full bg-[#121212] border border-[#2a2a2a]">
            <svg className="size-7" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="#121212" stroke="#262626" strokeWidth="1.2" />
              <path
                d="M 23 14 A 9 9 0 0 0 14 5"
                fill="none"
                stroke="#0070f3"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8.5 14.5 L11.5 17.5 L17.5 11"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14.5 L14.5 17 L20 11.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <ChevronsUpDown className="size-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
        </div>
      </div>

      {/* Middle/Bottom Commit Details */}
      <div className="mt-4 flex flex-col gap-1.5">
        {/* Latest Commit Message */}
        <div className="flex items-center gap-2 text-neutral-200 min-w-0">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400 shrink-0"
          >
            <circle cx="12" cy="12" r="3" />
            <line x1="3" y1="12" x2="9" y2="12" />
            <line x1="15" y1="12" x2="21" y2="12" />
          </svg>
          <span className="truncate font-sans text-[13px] text-neutral-200 leading-snug">{meta.commitMsg}</span>
        </div>

        {/* GitHub Repository and Relative Time */}
        <div className="flex items-center gap-2 text-neutral-400">
          <SiGithub className="size-3.5 shrink-0 text-neutral-400" />
          <span className="truncate font-sans text-xs text-neutral-400 leading-none mt-0.5">
            {meta.repo} &middot; {meta.updated}
          </span>
        </div>
      </div>
    </article>
  );
}
