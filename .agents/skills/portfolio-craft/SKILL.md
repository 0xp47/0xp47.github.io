---
name: portfolio-craft
description: Guidelines and best practices for building modern, high-end, award-winning developer portfolios with sleek micro-interactions, clean typography, and Vercel/Linear design craft.
---

# Portfolio Design & Modern Craft Guidelines

Use these principles to evaluate and build high-end developer portfolios:

## 1. Visual Hierarchy & Typography
- **Monospace Accents**: Use monospace font (`Geist Mono`, `JetBrains Mono`) for tags, metadata, dates, commit hashes, and system labels (`text-xs uppercase tracking-wider`).
- **Heading Scale**: Strong contrast between primary headline and supporting copy. Tight line-height on display titles (`leading-[1.1] tracking-tight`).
- **Text Balance**: Apply `text-balance` to headings and `text-pretty` to paragraphs to eliminate typographic widows and orphans.

## 2. Micro-Interactions & Animation (Emil Kowalski Philosophy)
- **Natural Spring Physics**: Prefer spring physics (`damping: 20-30`, `stiffness: 200-300`) over linear transitions.
- **Subtle Hover States**: Interactive cards should have subtle hover states (`scale-[1.01]`, border illumination, soft shadow expansion).
- **Smooth Section Transitions**: Scrollspy and navigation active indicators should smoothly morph or slide between states (`layoutId`).

## 3. Dark & Light Mode Cohesion
- **No Gray Washes**: Dark mode should use rich, deep backgrounds (`#09090b` or `#000000`) with high-contrast text (`#f4f4f5`) and subtle border rings (`ring-1 ring-border/50`).
- **Surface Elevation**: Cards and popovers use subtle alpha backdrops (`bg-background/70 backdrop-blur-xl ring-1 ring-border`).

## 4. Showcase & Case Studies
- **Proof of Work**: Every project should prominently highlight live demo links, source code, primary tech stack badges, and measurable metrics (e.g., performance, users, latency).
- **Interactive Badges**: Verified credentials (e.g. Credly certifications, GitHub stars) should be interactive, clickable, and verified.
