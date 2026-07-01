"use client";

import { useEffect, useRef } from "react";

interface CodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fontSize: number;
  alpha: number;
  alphaSpeed: number;
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

    // Code particles count based on screen area (increased density and cap)
    const particleCount = Math.min(Math.floor((width * height) / 10000), 95);

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.20, // Slow calm drift
          vy: (Math.random() - 0.5) * 0.20,
          fontSize: Math.floor(Math.random() * 6) + 10, // Font sizes from 10px to 15px
          alpha: Math.random() * 0.25 + 0.05,
          alphaSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
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

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Move and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Pulse opacity (glow fade)
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.03 || p.alpha >= 0.35) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Keep inside boundaries (wrap around)
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw coding symbol
        ctx.beginPath();
        ctx.font = `${p.fontSize}px font-mono, monospace`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillText(p.symbol, p.x, p.y);
      });

      // 2. Draw connecting lines between nearby code particles (matching particles.js style)
      const maxDistance = 90; // Pixels
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          // Target centers of the text particles
          const x1 = p1.x + p1.fontSize / 3;
          const y1 = p1.y - p1.fontSize / 3;
          const x2 = p2.x + p2.fontSize / 3;
          const y2 = p2.y - p2.fontSize / 3;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fade lines as they get further away
            const lineAlpha = (1 - dist / maxDistance) * 0.09 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
