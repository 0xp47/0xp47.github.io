"use client";

import { useMemo } from "react";
import { ChevronsUpDown, GitBranch } from "lucide-react";
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
  latestCommit?: {
    message: string;
    date?: string;
    sha?: string;
  };
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  className?: string;
}

interface VercelProjectMeta {
  displayName?: string;
  domain?: string;
  liveUrl?: string;
  commitMsg?: string;
  repo?: string;
  updated?: string;
}

export const VERCEL_METADATA_MAP: Record<string, VercelProjectMeta> = {
  tdrive: {
    displayName: "tdrive",
    domain: "tdrv.vercel.app",
    liveUrl: "http://tdrv.vercel.app/",
    repo: "0xp47/Tdrive",
  },
  "axiom-lms": {
    displayName: "axiom-lms",
    domain: "axiom-lms.vercel.app",
    liveUrl: "https://axiom-lms.vercel.app",
    repo: "0xp47/Axiom-LMS",
  },
  "pos-and-inventory-system": {
    displayName: "pos-and-inventory-system",
    domain: "pos-and-inventory-system-navy.ver...",
    liveUrl: "https://pos-and-inventory-system-navy.vercel.app",
    repo: "0xp47/POS-and-Inventory-System",
  },
  lumora: {
    displayName: "lumora",
    domain: "lumora-social.vercel.app",
    liveUrl: "https://lumora-social.vercel.app",
    repo: "0xp47/Lumora-Frontend",
  },
  "lumora-frontend": {
    displayName: "lumora",
    domain: "lumora-social.vercel.app",
    liveUrl: "https://lumora-social.vercel.app",
    repo: "0xp47/Lumora-Frontend",
  },
  "ccs-assistant": {
    displayName: "ccs-assistant",
    domain: "ccs-assistant.vercel.app",
    liveUrl: "https://ccs-assistant.vercel.app",
    repo: "0xp47/ccs-assistant",
  },
  "room-209": {
    displayName: "room-209",
    domain: "room-209.vercel.app",
    liveUrl: "https://room-209.vercel.app",
    repo: "0xp47/room-209",
  },
  "philnits-ip-exam": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    liveUrl: "https://philnits-prep.vercel.app",
    repo: "0xp47/PhilNITS-IP-Exam",
  },
  "philnits-reviewer": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    liveUrl: "https://philnits-prep.vercel.app",
    repo: "0xp47/PhilNITS-IP-Exam",
  },
  "ccsas-dashboard": {
    displayName: "ccsas-dashboard",
    domain: "ccsas-dashboard.vercel.app",
    liveUrl: "https://ccsas-dashboard.vercel.app",
    repo: "0xp47/CCSAS-Dashboard",
  },
};

export function formatCommitDate(dateStr?: string): string {
  if (!dateStr) return "Recent";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Recent";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "1d ago";
  if (diffDays <= 7) return `${diffDays}d ago`;

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: isCurrentYear ? undefined : "numeric",
  });
}

export function ProjectCard({ project, onViewDetails, className }: ProjectCardProps) {
  const meta = useMemo(() => {
    const slug = project.name.toLowerCase();
    return VERCEL_METADATA_MAP[slug] || null;
  }, [project.name]);

  // A project is considered deployed if it has an active live URL not pointing to github.com
  const isDeployed = Boolean(
    (project.live && !project.live.includes("github.com")) || meta?.liveUrl
  );

  const effectiveLive = isDeployed
    ? (project.live && !project.live.includes("github.com") ? project.live : meta?.liveUrl)
    : undefined;

  const repoSlug = useMemo(() => {
    if (meta?.repo) return meta.repo;
    if (project.github) {
      return project.github.replace(/^https?:\/\/github\.com\//, "");
    }
    return `0xp47/${project.name}`;
  }, [project, meta]);

  const displayName = meta?.displayName || project.name.toLowerCase();

  const subtitle = useMemo(() => {
    if (isDeployed) {
      if (meta?.domain) return meta.domain;
      if (effectiveLive) {
        return effectiveLive.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      }
    }
    return repoSlug;
  }, [isDeployed, meta, effectiveLive, repoSlug]);

  const commitMsg =
    project.latestCommit?.message ||
    meta?.commitMsg ||
    project.description ||
    "Deploy from GitHub repository";

  const commitDate = project.latestCommit?.date || project.updatedAt;
  const relativeDate = formatCommitDate(commitDate);

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const targetUrl = isDeployed
      ? effectiveLive
      : (project.github || `https://github.com/0xp47/${project.name}`);
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      onClick={() => onViewDetails(project)}
      className={cn(
        "group relative flex flex-col justify-between cursor-pointer select-none p-[1px] transition-colors duration-200 bg-neutral-200/80 hover:bg-neutral-300 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 h-full",
        className
      )}
      style={{
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      <div
        className="relative flex flex-col justify-between h-full bg-white p-3.5 sm:p-4 transition-colors duration-200 group-hover:bg-neutral-50/90 dark:bg-[#040404] dark:group-hover:bg-[#080808]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
        }}
      >
        {/* Top Header Row (no avatar icons, clean and compact) */}
        <div className="flex items-center justify-between gap-3 w-full pr-1">
          <div className="min-w-0 flex flex-col justify-center">
            <h4
              className="text-[14px] sm:text-[14.5px] font-semibold text-neutral-900 dark:text-white tracking-tight truncate leading-tight group-hover:text-black dark:group-hover:text-white hover:underline cursor-pointer"
              onClick={handleHeaderClick}
            >
              {displayName}
            </h4>
            <span
              className="text-xs text-neutral-500 dark:text-neutral-400 truncate hover:text-neutral-900 dark:hover:text-white hover:underline transition-colors leading-tight mt-1 cursor-pointer font-mono"
              onClick={handleHeaderClick}
            >
              {subtitle}
            </span>
          </div>

          {/* Right Status Ring + Up-Down Chevrons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isDeployed ? (
              /* Circular Deployed Status Ring (Double checkmark + blue arc) */
              <div
                className="relative flex size-7 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 dark:bg-[#0a0a0a] dark:border-neutral-800 shrink-0"
                title="Deployed to Production"
                aria-label="Deployed to Production"
              >
                <svg className="size-7" viewBox="0 0 28 28">
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    className="fill-neutral-100 stroke-neutral-200 dark:fill-[#0a0a0a] dark:stroke-[#1f1f1f]"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 23 14 A 9 9 0 0 0 14 5"
                    fill="none"
                    stroke="currentColor" className="text-foreground"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8.5 14.5 L11.5 17.5 L17.5 11"
                    fill="none"
                    className="stroke-neutral-800 dark:stroke-white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14.5 L14.5 17 L20 11.5"
                    fill="none"
                    className="stroke-neutral-800 dark:stroke-white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              /* Non-deployed repository badge */
              <div
                className="relative flex size-7 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 dark:bg-[#0a0a0a] dark:border-neutral-800 shrink-0"
                title="Source Repository"
                aria-label="Source Repository"
              >
                <GitBranch className="size-3.5 text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition-colors" strokeWidth={1.8} />
              </div>
            )}
            <ChevronsUpDown className="size-3.5 text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors" />
          </div>
        </div>

        {/* Middle/Bottom Commit Details */}
        <div className="mt-3.5 pt-2.5 border-t border-neutral-200 dark:border-neutral-800/60 flex flex-col gap-1.5">
          {/* Latest Commit Message */}
          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 min-w-0" title={commitMsg}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400 dark:text-neutral-400 shrink-0"
            >
              <circle cx="12" cy="12" r="3" />
              <line x1="3" y1="12" x2="9" y2="12" />
              <line x1="15" y1="12" x2="21" y2="12" />
            </svg>
            <span className="truncate font-sans text-xs text-neutral-700 dark:text-neutral-300 leading-snug">{commitMsg}</span>
          </div>

          {/* GitHub Repository and Relative Time */}
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <SiGithub className="size-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
            <span
              className="truncate font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 leading-none"
              suppressHydrationWarning
            >
              {repoSlug} &middot; {relativeDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
