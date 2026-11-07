"use client";

import {
  Layers,
  GitBranch,
  Terminal,
  Database,
  Briefcase,
  Sparkles,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export interface TopicItem {
  id: string;
  name: string;
  icon: LucideIcon;
  matches: (post: BlogPost) => boolean;
}

export const BLOG_TOPICS: TopicItem[] = [
  {
    id: "all",
    name: "All Articles",
    icon: Layers,
    matches: () => true,
  },
  {
    id: "engineering",
    name: "Engineering & Stack",
    icon: Terminal,
    matches: (post) =>
      post.category === "Engineering" ||
      post.tags.some((t) => ["Web Dev", "Tech Stack", "Tools"].includes(t)),
  },
  {
    id: "architecture",
    name: "Backend & Systems",
    icon: Database,
    matches: (post) =>
      post.category === "Architecture" ||
      post.tags.some((t) => ["Backend", "API Design", "Architecture"].includes(t)),
  },
  {
    id: "open-source",
    name: "Open Source",
    icon: GitBranch,
    matches: (post) =>
      post.category === "Open Source" ||
      post.tags.some((t) => ["Open Source", "Community"].includes(t)),
  },
  {
    id: "career",
    name: "Career & Business",
    icon: Briefcase,
    matches: (post) =>
      post.category === "Career" ||
      post.tags.some((t) => ["Freelancing", "Career", "Business"].includes(t)),
  },
  {
    id: "ai-tools",
    name: "AI & Productivity",
    icon: Sparkles,
    matches: (post) =>
      post.category === "AI & Tools" ||
      post.category === "Productivity" ||
      post.tags.some((t) => ["AI", "Productivity", "Developer Tools", "Learning"].includes(t)),
  },
  {
    id: "journey",
    name: "Mobile & Journey",
    icon: Smartphone,
    matches: (post) =>
      post.category === "Journey" ||
      post.category === "Education" ||
      post.tags.some((t) =>
        ["Mobile Coding", "Developer Journey", "Termux", "Education", "GitHub"].includes(t)
      ),
  },
];

interface TopicsSidebarProps {
  posts: BlogPost[];
  selectedTopic: string;
  onSelectTopic: (topicId: string) => void;
  className?: string;
}

export function TopicsSidebar({
  posts,
  selectedTopic,
  onSelectTopic,
  className,
}: TopicsSidebarProps) {
  return (
    <aside className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
          TOPICS
        </h3>
        <span className="font-mono text-[10px] text-neutral-400">
          {BLOG_TOPICS.length - 1} categories
        </span>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Blog Topics">
        {BLOG_TOPICS.map((topic) => {
          const Icon = topic.icon;
          const count = posts.filter(topic.matches).length;
          const isSelected = selectedTopic === topic.id;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-xs transition-colors cursor-pointer select-none",
                isSelected
                  ? "bg-neutral-950 text-white font-medium shadow-2xs"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 font-normal"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    "size-3.5 shrink-0 transition-colors",
                    isSelected ? "text-white" : "text-neutral-400 group-hover:text-neutral-950"
                  )}
                  strokeWidth={1.5}
                />
                <span className="truncate">{topic.name}</span>
              </div>
              <span
                className={cn(
                  "ml-2 shrink-0 rounded-xs px-1.5 py-0.5 font-mono text-[10px]",
                  isSelected
                    ? "bg-neutral-800 text-neutral-200"
                    : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:text-neutral-800"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
