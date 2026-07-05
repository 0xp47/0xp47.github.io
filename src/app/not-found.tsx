"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-mono text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full space-y-6"
      >
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            Error Code
          </span>
          <h1 className="text-7xl font-extrabold tracking-tighter text-foreground">
            404
          </h1>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent w-full" />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-foreground/80 tracking-wider">
            Route Not Resolved
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
            The page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/30 hover:border-foreground/45 bg-foreground text-background hover:bg-foreground/95 px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
