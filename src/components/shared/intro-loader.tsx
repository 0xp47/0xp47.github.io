"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: init command, 1: loading bar, 2: complete delay

  useEffect(() => {
    // Phase 0: Type init command (lasts 400ms)
    const phase0Timer = setTimeout(() => {
      setPhase(1);
    }, 450);

    return () => clearTimeout(phase0Timer);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;

    // Phase 1: Tick loading progress up to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase(2);
          return 100;
        }
        // Random incremental tick
        const next = prev + Math.floor(Math.random() * 12) + 6;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;

    // Phase 2: Fade out delay (lasts 500ms)
    const phase2Timer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(phase2Timer);
  }, [phase, onComplete]);

  // Compute loading bar characters (20 total slots)
  const barLength = 20;
  const filledSlots = Math.floor((progress / 100) * barLength);
  const loadingBarText =
    "[" +
    "█".repeat(filledSlots) +
    "░".repeat(barLength - filledSlots) +
    `] ${progress}%`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground p-6 select-none font-mono"
    >
      <div className="w-full max-w-md flex flex-col gap-3 items-center justify-center text-center">
        {/* Terminal Line 1: User details and command */}
        <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <span className="text-foreground/80">guest@0xp47</span>
          <span>:</span>
          <span className="text-muted-foreground/60">~</span>
          <span>$</span>
          <span className="text-foreground font-semibold">
            {phase >= 0 ? "initialize --portfolio" : ""}
          </span>
          {phase === 0 && (
            <span className="w-1.5 h-3 bg-foreground animate-pulse ml-0.5 inline-block" />
          )}
        </div>

        {/* Terminal Line 2: Loading Status */}
        <div className={`text-xs text-foreground/90 space-y-1.5 transition-all duration-300 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>
          <div className="text-muted-foreground/50">
            {progress < 100 ? "Retrieving system assets..." : "System assets loaded."}
          </div>
          <div className="tracking-widest font-mono text-foreground text-[10px] sm:text-xs">
            {loadingBarText}
          </div>
        </div>

        {/* Terminal Line 3: Done */}
        <div className={`text-xs text-muted-foreground/45 transition-all duration-300 ${phase === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>
          Launching core...
        </div>
      </div>
    </motion.div>
  );
}
