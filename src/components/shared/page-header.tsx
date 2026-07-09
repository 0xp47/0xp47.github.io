"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  backHref: string;
  backLabel: string;
  rightLabel: string;
}

export function PageHeader({ backHref, backLabel, rightLabel }: PageHeaderProps) {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-border/10 pb-4">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
        {backLabel}
      </Link>
      <span className="font-mono text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
        {rightLabel}
      </span>
    </header>
  );
}
