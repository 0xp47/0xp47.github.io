import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaypatrickcano.dev"),
  title: {
    default: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
    template: "%s | Jay Patrick Cano",
  },
  description:
    "Building custom software, cross-platform mobile apps, and automated workflows.",
  keywords: [
    "Jay Patrick Cano",
    "0xp47",
    "0xp47 GitHub",
    "LeafSense Mobile",
    "POS and Inventory System",
    "HireHub PH",
    "GroundZero Community",
    "CodeTriad Solutions",
    "Software Engineer Philippines",
    "Full‑Stack Engineer Maasin City",
    "React Native Developer",
    "FastAPI Developer",
    "Next.js Developer",
    "PHP developer Philippines",
    "automation developer"
  ],
  authors: [{ name: "Jay Patrick Cano" }],
  creator: "Jay Patrick Cano",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
    description:
      "Building custom software, cross-platform mobile apps, and automated workflows.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "Jay Patrick Cano",
    images: [
      {
        url: "/images/me-thumbnail.png",
        width: 300,
        height: 300,
        alt: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
    description:
      "Building custom software, cross-platform mobile apps, and automated workflows.",
    site: "@0xp47",
    creator: "@0xp47",
    images: [
      {
        url: "/images/me-thumbnail.png",
        width: 300,
        height: 300,
        alt: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
      },
    ],
  },
  facebook: {
    appId: "966242223397117",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#09090b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jay Patrick Cano",
  "alternateName": ["Pat", "0xp47"],
  "jobTitle": "Full-Stack Engineer & Entrepreneur",
  "url": "https://jaypatrickcano.dev",
  "image": "https://avatars.githubusercontent.com/u/76643867?v=4",
  "sameAs": [
    "https://github.com/0xp47",
    "https://www.linkedin.com/in/0xp47",
    "https://www.instagram.com/0xp47",
    "https://www.facebook.com/0xp47"
  ],
  "email": "hello@jaypatrickcano.dev",
  "description": "Developer and entrepreneur building custom software, cross-platform mobile apps, and automated workflows. Founder of GroundZero global community and co-founder of CodeTriad Solutions.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Maasin City",
    "addressRegion": "Southern Leyte",
    "addressCountry": "Philippines"
  },
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Full-Stack Engineer & Entrepreneur",
    "occupationLocation": {
      "@type": "Country",
      "name": "Philippines"
    }
  },
  "memberOf": [
    {
      "@type": "Organization",
      "name": "GroundZero Community",
      "url": "https://github.com/GroundZero-Community"
    },
    {
      "@type": "Organization",
      "name": "Hall of Codes",
      "url": "https://github.com/hallofcodes"
    },
    {
      "@type": "Organization",
      "name": "CodeTriad Solutions",
      "url": "https://github.com/CodetriadSolutions"
    }
  ],
  "knowsAbout": [
    "Software Engineering",
    "Full-Stack Development",
    "Mobile Application Development",
    "Python",
    "FastAPI",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "PHP",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
    "Prisma",
    "Supabase",
    "Docker",
    "Vercel",
    "Git",
    "GitHub",
    "Linux",
    "API Development",
    "Automation Scripts"
  ],
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "English"
    },
    {
      "@type": "Language",
      "name": "Filipino"
    }
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jay Patrick Cano — Developer Portfolio",
  "alternateName": "0xp47 Portfolio",
  "url": "https://jaypatrickcano.dev",
  "description": "Developer portfolio of Jay Patrick Cano (0xp47), a Full-Stack Engineer, entrepreneur, and open-source builder based in the Philippines.",
  "author": {
    "@type": "Person",
    "name": "Jay Patrick Cano"
  },
  "inLanguage": "en-US"
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Software Projects by Jay Patrick Cano",
  "itemListElement": [
    {
      "@type": "SoftwareApplication",
      "position": 1,
      "name": "LeafSense Mobile",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Android, iOS",
      "description": "Cross-platform AI-powered plant disease detection app using CNNs for real-time diagnostic classification, built with React Native and Python FastAPI.",
      "author": { "@type": "Person", "name": "Jay Patrick Cano" }
    },
    {
      "@type": "SoftwareApplication",
      "position": 2,
      "name": "POS and Inventory System",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web (LAN)",
      "description": "Local-first, multi-terminal LAN Point of Sale and inventory control suite optimized for hardware retail stores, built with Next.js, Prisma, and SQLite.",
      "author": { "@type": "Person", "name": "Jay Patrick Cano" }
    },
    {
      "@type": "SoftwareApplication",
      "position": 3,
      "name": "HireHub PH",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Full-stack job platform connecting local talent with recruiters in the Philippines, featuring applicant tracking and real-time chat.",
      "author": { "@type": "Person", "name": "Jay Patrick Cano" }
    },
    {
      "@type": "SoftwareApplication",
      "position": 4,
      "name": "Sparse MoE LLM From Scratch",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Linux, Windows, macOS",
      "description": "Custom PyTorch implementation of a Sparse Mixture-of-Experts Large Language Model with SwiGLU activation, RMSNorm, and a ReAct agent.",
      "codeRepository": "https://github.com/0xp47/moe-llm-from-scratch",
      "author": { "@type": "Person", "name": "Jay Patrick Cano" }
    },
    {
      "@type": "SoftwareApplication",
      "position": 5,
      "name": "Unified API Server",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Linux, Windows, macOS",
      "description": "Auto-loading FastAPI service hub providing unified endpoints for Edge TTS, yt-dlp video downloads, and QR generation.",
      "codeRepository": "https://github.com/0xp47/Unified-API-Server",
      "author": { "@type": "Person", "name": "Jay Patrick Cano" }
    }
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Jay Patrick Cano (0xp47)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jay Patrick Cano, known as 0xp47, is a Full-Stack Software Engineer, open-source developer, and tech entrepreneur based in Maasin City, Southern Leyte, Philippines. He is the founder of GroundZero global developer community and co-founder of CodeTriad Solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What services does Jay Patrick Cano offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jay Patrick Cano offers full-stack web application development (React, Next.js), cross-platform mobile app development (React Native, Expo), API and backend system design (Node.js, Python, FastAPI), business automation and workflow scripting, custom software development, and IT/tech consulting for startups."
      }
    },
    {
      "@type": "Question",
      "name": "What projects has Jay Patrick Cano built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notable projects include LeafSense Mobile (AI plant disease detection app), POS and Inventory System (multi-terminal LAN retail suite), HireHub PH (job platform for the Philippines), Sparse MoE LLM From Scratch (custom PyTorch large language model), and Unified API Server (auto-loading FastAPI microservice hub)."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Jay Patrick Cano based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jay Patrick Cano is based in Maasin City, Southern Leyte, Philippines. He works remotely with local and international clients on freelance and collaborative software projects."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Jay Patrick Cano for a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach Jay Patrick Cano via email at hello@jaypatrickcano.dev, through his GitHub profile at github.com/0xp47, or via his LinkedIn at linkedin.com/in/0xp47. He is available for freelance projects, collaborations, and software partnerships."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
