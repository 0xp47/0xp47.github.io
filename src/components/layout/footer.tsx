"use client";

import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1120px] px-6 pb-10 sm:px-8 lg:px-10">
      <Separator className="mb-6" />
      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
