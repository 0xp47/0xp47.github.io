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
  avatarType?: "next" | "axiom" | "pos" | "triangle" | "ccs" | "dotted-triangle" | "ip";
}

export const VERCEL_METADATA_MAP: Record<string, VercelProjectMeta> = {
  tdrive: {
    displayName: "tdrive",
    domain: "tdrv.vercel.app",
    commitMsg: "Remove Copy Link from public share page and ...",
    repo: "0xp47/Tdrive",
    updated: "Oct 31",
    avatarType: "next",
  },
  "axiom-lms": {
    displayName: "axiom-lms",
    domain: "axiom-lms.vercel.app",
    commitMsg: "fix(api): use deterministic bootstrap UUIDs for m...",
    repo: "0xp47/Axiom-LMS",
    updated: "2d ago",
    avatarType: "axiom",
  },
  "pos-and-inventory-system": {
    displayName: "pos-and-inventory-system",
    domain: "pos-and-inventory-system-navy.ver...",
    commitMsg: "Modify project description in README",
    repo: "0xp47/POS-and-Inventory-System",
    updated: "3d ago",
    avatarType: "pos",
  },
  lumora: {
    displayName: "lumora",
    domain: "lumora-social.vercel.app",
    commitMsg: "feat: add dynamic lumens short-url routes, rede...",
    repo: "0xp47/Lumora-Frontend",
    updated: "Aug 12",
    avatarType: "triangle",
  },
  "ccs-assistant": {
    displayName: "ccs-assistant",
    domain: "ccs-assistant.vercel.app",
    commitMsg: "fix(mobile): resolve mobile burger menu drawer ...",
    repo: "0xp47/ccs-assistant",
    updated: "Oct 27",
    avatarType: "ccs",
  },
  "room-209": {
    displayName: "room-209",
    domain: "room-209.vercel.app",
    commitMsg: "fix(admin): use generic placeholders on login pa...",
    repo: "0xp47/room-209",
    updated: "Oct 26",
    avatarType: "dotted-triangle",
  },
  "philnits-ip-exam": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    commitMsg: "feat(presence): accurate cumulative study timer...",
    repo: "0xp47/PhilNITS-IP-Exam",
    updated: "Oct 24",
    avatarType: "ip",
  },
  "philnits-reviewer": {
    displayName: "philnits-reviewer",
    domain: "philnits-prep.vercel.app",
    commitMsg: "feat(presence): accurate cumulative study timer...",
    repo: "0xp47/PhilNITS-IP-Exam",
    updated: "Oct 24",
    avatarType: "ip",
  },
  "ccsas-dashboard": {
    displayName: "ccsas-dashboard",
    domain: "ccsas-dashboard.vercel.app",
    commitMsg: "sync: update dashboard with latest fixes from m...",
    repo: "0xp47/CCSAS-Dashboard",
    updated: "Oct 6",
    avatarType: "triangle",
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
      avatarType: "triangle" as const,
    };
  }, [project]);

  return (
    <article
      onClick={() => onViewDetails(project)}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-5 transition-colors duration-200 hover:border-neutral-700 cursor-pointer select-none",
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Avatar Icon */}
          {meta.avatarType === "next" ? (
            <div className="size-10 rounded-full shrink-0 flex items-center justify-center bg-black border border-neutral-800 overflow-hidden">
              <svg width="22" height="22" viewBox="0 0 180 180" fill="none">
                <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
                  <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#next-mask)">
                  <circle cx="90" cy="90" r="90" fill="black" />
                  <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z"
                    fill="url(#next-paint0_linear)"
                  />
                  <rect x="115" y="54" width="12" height="72" fill="url(#next-paint1_linear)" />
                </g>
                <defs>
                  <linearGradient id="next-paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="next-paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : meta.avatarType === "axiom" ? (
            <div className="size-10 rounded-lg shrink-0 flex items-center justify-center bg-white border border-neutral-200 shadow-xs">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 26H11L16 15L21 26H28L16 4Z" fill="#000000" />
              </svg>
            </div>
          ) : meta.avatarType === "pos" ? (
            <div className="size-10 rounded-lg shrink-0 flex items-center justify-center bg-white border border-neutral-200 shadow-xs">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#fff7ed" />
                <path d="M8 21V11H16V21" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#eff6ff" />
              </svg>
            </div>
          ) : meta.avatarType === "ccs" ? (
            <div className="size-10 rounded-full shrink-0 flex items-center justify-center bg-black border-2 border-orange-500 overflow-hidden shadow-xs">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V6L12 2Z" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
                <text x="12" y="14.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="sans-serif">CCS</text>
              </svg>
            </div>
          ) : meta.avatarType === "dotted-triangle" ? (
            <div className="size-10 rounded-full shrink-0 flex items-center justify-center bg-black border border-neutral-800">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="12,3 3,20 21,20" stroke="#737373" strokeWidth="2" strokeDasharray="3 3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : meta.avatarType === "ip" ? (
            <div className="size-10 rounded-lg shrink-0 flex items-center justify-center bg-black border border-neutral-800">
              <svg width="26" height="20" viewBox="0 0 32 24" fill="none">
                <rect x="2" y="2" width="7" height="20" rx="1.5" fill="white" />
                <path d="M13 2H22C25.5 2 28 4.5 28 8C28 11.5 25.5 14 22 14H19V22H13V2ZM19 6V10H22C23.2 10 24 9.2 24 8C24 6.8 23.2 6 22 6H19Z" fill="white" />
              </svg>
            </div>
          ) : (
            <div className="size-10 rounded-full shrink-0 flex items-center justify-center bg-black border border-neutral-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 4L3 19.5H21L12 4Z" fill="white" />
              </svg>
            </div>
          )}

          {/* Project Title and Domain */}
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
      <div className="mt-5 flex flex-col gap-1.5">
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
