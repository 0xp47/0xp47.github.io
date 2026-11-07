"use client";

import { motion } from "framer-motion";

export function BlogAbstractVisual() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto select-none overflow-hidden rounded-sm border border-neutral-200/90 bg-[#fafafa] p-6 flex items-center justify-center">
      {/* Subtle background technical grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #eaeaea 1px, transparent 1px),
            linear-gradient(to bottom, #eaeaea 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial soft fade to edge */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#fafafa]/50 to-[#fafafa]" />

      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-neutral-400">+</div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-neutral-400">+</div>
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-neutral-400">+</div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-neutral-400">+</div>

      {/* Top and Bottom Technical Metadata */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
        <span>ARCH // SYS.04</span>
        <span className="flex items-center gap-1.5 text-neutral-600">
          <span className="inline-block size-1.5 rounded-full bg-neutral-900" />
          ACTIVE
        </span>
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
        <span>8 ARTICLES</span>
        <span>LATENCY: 12ms</span>
      </div>

      {/* Center Geometric Illustration */}
      <div className="relative size-56 sm:size-64 flex items-center justify-center">
        {/* Outer subtle rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-neutral-300"
        />

        {/* Middle concentric circle */}
        <div className="absolute inset-6 rounded-full border border-neutral-200" />

        {/* Inner concentric ring */}
        <div className="absolute inset-14 rounded-full border border-neutral-300/80" />

        {/* Isometric Wireframe Planes */}
        <svg
          viewBox="0 0 200 200"
          className="relative z-10 size-48 text-neutral-900"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          {/* Axis markers */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="#d4d4d4" strokeDasharray="2 3" strokeWidth="1" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#d4d4d4" strokeDasharray="2 3" strokeWidth="1" />

          {/* Top isometric diamond */}
          <polygon
            points="100,45 155,75 100,105 45,75"
            fill="#ffffff"
            stroke="#171717"
            strokeWidth="1.4"
          />

          {/* Bottom left isometric side */}
          <polygon
            points="45,75 100,105 100,165 45,135"
            fill="#f5f5f5"
            stroke="#171717"
            strokeWidth="1.4"
          />

          {/* Bottom right isometric side */}
          <polygon
            points="100,105 155,75 155,135 100,165"
            fill="#eaeaea"
            stroke="#171717"
            strokeWidth="1.4"
          />

          {/* Floating node points */}
          <circle cx="100" cy="45" r="2.5" fill="#171717" />
          <circle cx="155" cy="75" r="2.5" fill="#171717" />
          <circle cx="45" cy="75" r="2.5" fill="#171717" />
          <circle cx="100" cy="105" r="3" fill="#171717" />
          <circle cx="100" cy="165" r="2.5" fill="#171717" />
          <circle cx="45" cy="135" r="2" fill="#737373" />
          <circle cx="155" cy="135" r="2" fill="#737373" />

          {/* Delicate internal diagonal vectors */}
          <line x1="100" y1="105" x2="100" y2="60" stroke="#737373" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="72" y1="90" x2="128" y2="90" stroke="#737373" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>

        {/* Orbiting data tag */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 top-10 rounded-xs border border-neutral-300 bg-white px-2 py-0.5 font-mono text-[9px] font-semibold text-neutral-800 shadow-xs"
        >
          v2026.4
        </motion.div>

        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-2 bottom-12 rounded-xs border border-neutral-300 bg-white px-2 py-0.5 font-mono text-[9px] font-semibold text-neutral-800 shadow-xs"
        >
          0xp47 // IO
        </motion.div>
      </div>
    </div>
  );
}
