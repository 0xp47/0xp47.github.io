# Jay Patrick Cano (0xp47) — Portfolio

My personal developer portfolio built with Next.js (App Router), Tailwind CSS, and Framer Motion. It showcases my projects, work experience, and developer journey, optimized for clean performance and readability.

---

## 🚀 Key Features

* **Modular Architecture**: Clean separation of concerns with components structured by logical usage.
* **Search & AI Discoverability**:
  * **Structured Data**: JSON-LD Schema (`Person` entity) mapping aliases (`0xp47`), location details, and technical expertise.
  * **Crawler Friendly**: Configured `robots.txt` rules and automated dynamic `sitemap.xml` mapping.
  * **FAQ Structure**: Structured FAQ microdata compliant with schema formats to enhance readability for search engines and AI assistants.
* **Interactive Design**:
  * **Particle Background**: Code symbol background animations that dynamically connect on scroll.
  * **Cursor Aura**: Subtle glowing radial gradient tracking cursor movements.
  * **Smooth Scrolling**: Custom ease-in-out-cubic scroll animations for navigating anchor sections.
  * **Motion Reduction Support**: Respects system preferences (`prefers-reduced-motion`) to disable animations when requested.

---

## 🛠️ Technology Stack

* **Core**: Next.js 16 (App Router / Turbopack), React 19, TypeScript
* **Styling**: Tailwind CSS v4, Framer Motion (v12)
* **Icons**: Lucide React, Simple Icons (`react-icons/si`)
* **Fonts**: Geist Sans & Geist Mono (optimized local loading)

---

## 📁 Codebase Directory Structure

The components and hooks are organized using Next.js path aliases (`@/*`) to prevent relative directory path nesting:

```text
src/
├── app/                                # App Router Configurations
│   ├── favicon.ico
│   ├── globals.css                     # Custom Tailwind Theme Setup
│   ├── layout.tsx                      # Root Layout, Metadata & JSON-LD
│   ├── page.tsx                        # Home Route
│   ├── robots.ts                       # Robots.txt generator
│   └── sitemap.ts                      # Sitemap.xml generator
├── hooks/
│   └── use-safe-reduced-motion.ts      # Media query reduced-motion checker
├── components/
│   ├── layout/
│   │   ├── site-nav.tsx                # Page header sticky navigation
│   │   └── footer.tsx                  # Page copyright footer
│   ├── sections/
│   │   ├── hero-section.tsx            # Landing header & tech marquee loop
│   │   ├── about-section.tsx           # Bio highlights
│   │   ├── projects-section.tsx        # Project catalog with category filtering
│   │   ├── experience-section.tsx      # Chronological history timeline
│   │   ├── faq-section.tsx             # Factual FAQ schema block
│   │   └── contact-section.tsx         # CTAs & mail/linktree redirects
│   ├── shared/
│   │   ├── section.tsx                 # Shared viewport animate sections wrapper
│   │   ├── social-link.tsx             # Shared custom social icon button
│   │   └── particles-background.tsx    # Shared background code particle canvas
│   ├── portfolio.tsx                   # Main layout compositor
│   └── providers.tsx                   # Tooltip context provider wrapper
├── lib/
│   ├── portfolio-data.ts               # Local data model profiles & projects
│   └── utils.ts                        # Tailwind class mergers (clsx/tailwind-merge)
```

---

## 💻 Development Commands

In the project directory, you can run:

### Start Development Server
Starts the Next.js development server with Turbopack enabled on [http://localhost:3000](http://localhost:3000):
```bash
npm run dev
```

### Production Build Check
Compiles the application, runs TypeScript type-checking, and generates optimized static pages:
```bash
npm run build
```

### Run Production Server
Starts the built application in production mode:
```bash
npm run start
```

### Linting Check
Scans the project files for ESLint errors:
```bash
npm run lint
```
