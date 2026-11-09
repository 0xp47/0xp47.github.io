"use client";

import { useEffect, useRef } from "react";

interface CodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fontSize: number;
  baseAlpha: number;
  alphaRange: number;
  phase: number;
  phaseSpeed: number;
  floatAmp: number;
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
  "GPT"
];

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: CodeParticle[] = [];
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Code particles count based on screen area
    const getParticleCount = () =>
      Math.min(Math.floor((width * height) / 11000), 85);

    const createParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16, // Calm horizontal drift
          vy: (Math.random() - 0.5) * 0.14 - 0.02, // Slight upward bias
          fontSize: Math.floor(Math.random() * 6) + 10, // Font sizes from 10px to 15px
          baseAlpha: Math.random() * 0.16 + 0.08,
          alphaRange: Math.random() * 0.09 + 0.03,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.012 + 0.005,
          floatAmp: Math.random() * 0.12 + 0.04,
          symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      createParticles();
    };

    createParticles();

    let themeIsDark = true;
    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const currentAlphas = new Float32Array(100);

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Adapt particle color to the active theme (checked cheaply per frame)
      const themeChanged = isDark() !== themeIsDark;
      if (themeChanged) themeIsDark = isDark();

      // 1. Move and draw particles with gentle sinusoidal floating & smooth opacity breathing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.phaseSpeed;
        p.x += p.vx + Math.cos(p.phase * 0.7) * p.floatAmp * 0.35;
        p.y += p.vy + Math.sin(p.phase) * p.floatAmp;

        const alpha = Math.max(
          0.03,
          Math.min(0.34, p.baseAlpha + Math.sin(p.phase) * p.alphaRange)
        );
        currentAlphas[i] = alpha;

        // Keep inside boundaries (wrap around smoothly)
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -24) p.y = height + 24;
        if (p.y > height + 24) p.y = -24;

        // Draw coding symbol
        ctx.font = `${p.fontSize}px "Geist Mono", monospace`;
        ctx.fillStyle = themeIsDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(9, 9, 11, ${alpha * 0.9})`;
        ctx.fillText(p.symbol, p.x, p.y);
      }

      // 2. Draw subtle connecting lines between nearby code particles
      const maxDistance = 90;
      const maxDistanceSq = maxDistance * maxDistance;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const x1 = p1.x + p1.fontSize / 3;
          const y1 = p1.y - p1.fontSize / 3;
          const x2 = p2.x + p2.fontSize / 3;
          const y2 = p2.y - p2.fontSize / 3;

          const dx = x1 - x2;
          if (Math.abs(dx) >= maxDistance) continue;
          const dy = y1 - y2;
          if (Math.abs(dy) >= maxDistance) continue;

          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha =
              (1 - dist / maxDistance) *
              0.085 *
              Math.min(currentAlphas[i], currentAlphas[j]);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = themeIsDark
              ? `rgba(255, 255, 255, ${lineAlpha})`
              : `rgba(9, 9, 11, ${lineAlpha * 0.9})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }
    };

    let isVisible = true;

    const renderStaticOrLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
      if (isVisible) {
        animationFrameId = requestAnimationFrame(function loop() {
          if (!isVisible) return;
          drawFrame();
          animationFrameId = requestAnimationFrame(loop);
        });
      }
    };

    renderStaticOrLoop();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isVisible = entry.isIntersecting;
          renderStaticOrLoop();
        },
        { threshold: 0 }
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
