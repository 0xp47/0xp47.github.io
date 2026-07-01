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
  metadataBase: new URL("https://0xp47.github.io"),
  title: {
    default: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
    template: "%s | Jay Patrick Cano",
  },
  description:
    "Developer portfolio of Jay Patrick Cano (0xp47), a Full-Stack Engineer, entrepreneur, and open-source builder. Founder of GroundZero global community and co-founder of CodeTriad Solutions.",
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
      "Helping businesses grow through technology by building custom software, cross-platform mobile applications, and intelligent automation solutions that improve efficiency, streamline operations, and solve real-world business challenges",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/me.png",
        width: 1024,
        height: 1024,
        alt: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Patrick Cano (0xp47) - Full-Stack Engineer & Entrepreneur",
    description:
      "Helping businesses grow through technology by building custom software, cross-platform mobile applications, and intelligent automation solutions that improve efficiency, streamline operations, and solve real-world business challenges",
    images: ["/images/me.png"],
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
  "url": "https://0xp47.github.io",
  "image": "https://avatars.githubusercontent.com/u/76643867?v=4",
  "sameAs": [
    "https://github.com/0xp47",
    "https://www.linkedin.com/in/0xp47",
    "https://www.instagram.com/0xp47",
    "https://www.facebook.com/0xp47"
  ],
  "email": "0xp47.dev@gmail.com",
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
      </body>
    </html>
  );
}
