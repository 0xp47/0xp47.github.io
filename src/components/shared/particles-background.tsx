"use client";

import { useEffect, useRef } from "react";

interface CodeParticle {
  x: number;
  y: number;
  drawX: number;
  drawY: number;
  vx: number;
  vy: number;
  fontSize: number;
  baseAlpha: number;
  alphaRange: number;
  phase: number;
  phaseSpeed: number;
  swayX: number;
  swayY: number;
  symbol: string;
}

const CODE_SYMBOLS = [
  // Brackets & punctuation
  "{", "}", "[", "]", "(", ")",
  "<", ">", "</", "/>", ";", ":", ",", ".",
  "...", "?", "!", "@", "#", "$", "%", "^",

  // Operators
  "=", "==", "===", "!=", "!==",
  ">", "<", ">=", "<=",
  "+", "-", "*", "/", "%",
  "++", "--", "+=", "-=", "*=", "/=",
  "&&", "||", "??", "!",
  "&", "|", "^", "~", "<<", ">>",
  "=>", "->", "::",

  // Programming
  "const", "let", "var",
  "function", "class", "interface",
  "return", "import", "export",
  "async", "await", "new",
  "this", "super", "try",
  "catch", "throw", "if",
  "else", "switch", "case",
  "for", "while", "break",
  "continue", "true", "false",
  "null", "undefined",

  // Web
  "HTML", "CSS", "JS", "TS",
  "React", "Next.js", "Node.js",
  "Vue", "Svelte", "Angular",
  "Tailwind", "Express", "NestJS",

  // Backend & Database
  "API", "REST", "GraphQL",
  "SQL", "NoSQL", "MongoDB",
  "Postgres", "MySQL", "Redis",

  // DevOps
  "Git", "GitHub", "Docker",
  "Linux", "Cloud", "CI/CD",
  "Vercel", "Nginx", "SSH",

  // Package managers
  "npm", "pnpm", "yarn", "bun",

  // File types
  ".js", ".ts", ".tsx", ".jsx",
  ".json", ".html", ".css",
  ".scss", ".env", ".md",

  // HTTP
  "GET", "POST", "PUT",
  "PATCH", "DELETE",
  "200", "301", "404", "500",

  // HTML Tags
  "<div>", "</div>",
  "<main>", "</main>",
  "<section>", "</section>",
  "<script>", "</script>",
  "<style>", "</style>",
  "<html>", "</html>",

  // Organizations & Communities
  "Ground Zero",
  "Hall Of Codes",
  "AXIS",
  "HEX",
  "CodeTriad Solutions",
  "Open Source",
  "Developers",
  "Contributors",
  "Maintainers",
  "Community",
  "Innovation",
  "Collaboration",
  "Hackathon",
  "Build",
  "Deploy",
  "Ship",
  "Scale",

  // Tech Buzzwords
  "AI",
  "ML",
  "LLM",
  "Cloud",
  "DevOps",
  "SaaS",
  "B2B",
  "Full-Stack",
  "AI / LLM",
  "CLI",
  "SDK",
  "IDE",
  "JSON",
  "YAML",
  "Docker",
  "Kubernetes",
  "Serverless",
  "Microservices",
  "Web3",
  "Blockchain",
  "OpenAI",
  "GPT",
  "API",
  "Deploy",
  "Scale",
  "Ship",
];

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: CodeParticle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = "middle";
    };

    const getParticleCount = () =>
      Math.min(Math.floor((width * height) / 11500), 82);

    const createParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        // Slow, laminar velocity so terms glide effortlessly across the canvas
        const speed = Math.random() * 0.16 + 0.06;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x,
          y,
          drawX: x,
          drawY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.85 - 0.03, // Subtle upward buoyancy
          fontSize: Math.floor(Math.random() * 6) + 10, // 10px to 15px
          baseAlpha: Math.random() * 0.15 + 0.09,
          alphaRange: Math.random() * 0.08 + 0.03,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.009 + 0.004,
          swayX: Math.random() * 12 + 5,
          swayY: Math.random() * 10 + 4,
          symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
        });
      }
      // Sort by fontSize so ctx.font only changes 6 times per frame instead of 80+ times
      particles.sort((a, b) => a.fontSize - b.fontSize);
    };

    setupCanvasSize();
    createParticles();

    const handleResize = () => {
      if (!canvas) return;
      const nextW = canvas.offsetWidth;
      const nextH = canvas.offsetHeight;
      if (Math.abs(nextW - width) < 2 && Math.abs(nextH - height) < 2) return;
      setupCanvasSize();
      createParticles();
    };

    let themeIsDark = document.documentElement.classList.contains("dark");
    const currentAlphas = new Float32Array(100);
    let lastTime = performance.now();
    let globalFade = 0;

    const wrapMarginX = 140;
    const wrapMarginY = 48;
    const fadeZone = 72;

    const drawFrame = (now: number) => {
      // Delta-time normalized to 60fps (16.667ms) for buttery smoothness across 60Hz/120Hz/144Hz/240Hz
      const rawDt = (now - lastTime) / 16.6667;
      const dt = Math.min(Math.max(rawDt, 0.2), 2.5);
      lastTime = now;

      if (globalFade < 1) {
        globalFade = Math.min(1, globalFade + 0.018 * dt);
      }

      ctx.clearRect(0, 0, width, height);

      themeIsDark = document.documentElement.classList.contains("dark");
      const rgb = themeIsDark ? "255, 255, 255" : "9, 9, 11";
      const alphaScale = (themeIsDark ? 1 : 0.9) * globalFade;

      let activeFontSize = -1;

      // 1. Update smooth continuous positions + harmonic sway and draw symbols
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.phaseSpeed * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Smooth wrap-around outside extended margins so long words never pop
        if (p.x < -wrapMarginX) p.x = width + wrapMarginX;
        else if (p.x > width + wrapMarginX) p.x = -wrapMarginX;

        if (p.y < -wrapMarginY) p.y = height + wrapMarginY;
        else if (p.y > height + wrapMarginY) p.y = -wrapMarginY;

        // Harmonic Lissajous sway around the drifting center
        const drawX = p.x + Math.sin(p.phase * 0.85) * p.swayX;
        const drawY = p.y + Math.cos(p.phase) * p.swayY;
        p.drawX = drawX;
        p.drawY = drawY;

        // Soft edge attenuation near canvas borders
        let edgeFade = 1;
        if (drawX < fadeZone) {
          edgeFade *= Math.max(0, (drawX + wrapMarginX * 0.5) / (fadeZone + wrapMarginX * 0.5));
        } else if (drawX > width - fadeZone) {
          edgeFade *= Math.max(0, (width + wrapMarginX * 0.5 - drawX) / (fadeZone + wrapMarginX * 0.5));
        }
        if (drawY < fadeZone) {
          edgeFade *= Math.max(0, (drawY + wrapMarginY * 0.5) / (fadeZone + wrapMarginY * 0.5));
        } else if (drawY > height - fadeZone) {
          edgeFade *= Math.max(0, (height + wrapMarginY * 0.5 - drawY) / (fadeZone + wrapMarginY * 0.5));
        }

        const breathing = p.baseAlpha + Math.sin(p.phase) * p.alphaRange;
        const alpha = Math.max(0.01, Math.min(0.34, breathing)) * edgeFade * alphaScale;
        currentAlphas[i] = alpha;

        if (p.fontSize !== activeFontSize) {
          activeFontSize = p.fontSize;
          ctx.font = `${activeFontSize}px "Geist Mono", monospace`;
        }

        ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.fillText(p.symbol, drawX, drawY);
      }

      // 2. Draw subtle connecting lines between nearby code particles
      const maxDistance = 95;
      const maxDistanceSq = maxDistance * maxDistance;
      ctx.lineWidth = 0.55;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const x1 = p1.drawX + p1.fontSize * 0.35;
        const y1 = p1.drawY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const x2 = p2.drawX + p2.fontSize * 0.35;
          const y2 = p2.drawY;

          const dx = x1 - x2;
          if (Math.abs(dx) >= maxDistance) continue;
          const dy = y1 - y2;
          if (Math.abs(dy) >= maxDistance) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / maxDistance;
            // Smooth cubic falloff so connecting lines fade in and out without snapping
            const smoothT = t * t * (3 - 2 * t);
            const lineAlpha =
              smoothT *
              0.09 *
              Math.min(currentAlphas[i], currentAlphas[j]);

            if (lineAlpha > 0.002) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha.toFixed(4)})`;
              ctx.stroke();
            }
          }
        }
      }
    };

    let isVisible = true;

    const startOrStopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(function loop(now) {
          if (!isVisible) return;
          drawFrame(now);
          animationFrameId = requestAnimationFrame(loop);
        });
      }
    };

    startOrStopLoop();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isVisible = entry.isIntersecting;
          startOrStopLoop();
        },
        { threshold: 0 }
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full pointer-events-none z-0 opacity-40 will-change-transform transform-gpu"
      aria-hidden="true"
    />
  );
}
