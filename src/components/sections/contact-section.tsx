"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { motion } from "framer-motion";
import { profile, contactDescription } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};



export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const contactLinks = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      isCopy: true,
      icon: copied ? (
        <Check className="size-4 text-green-500 animate-in fade-in zoom-in duration-300" />
      ) : (
        <Mail className="size-4" />
      ),
      onClick: handleCopy,
    },
    {
      label: "GitHub",
      href: profile.github,
      isCopy: false,
      icon: (
        <svg className="size-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      isCopy: false,
      icon: (
        <svg className="size-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: profile.instagram,
      isCopy: false,
      icon: (
        <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: profile.facebook,
      isCopy: false,
      icon: (
        <svg className="size-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
  ];

  return (
    <Section id="contact" eyebrow="Collab" title="Let's build something together.">
      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] mt-8 items-center">
        
        {/* Left Column: Description & Socials */}
        <motion.div variants={cardVariants} className="space-y-6">
          <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
            {contactDescription}
          </p>

          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase text-muted-foreground/50 tracking-wider">
              Connect
            </span>
            <div className="flex flex-wrap gap-4.5">
              {contactLinks.map((link) => {
                const isEmail = link.isCopy;
                const Component = isEmail ? "button" : "a";
                const extraProps = isEmail
                  ? { onClick: link.onClick, type: "button" as const }
                  : { href: link.href, target: "_blank", rel: "noreferrer" };

                return (
                  <Component
                    key={link.label}
                    {...(extraProps as Record<string, unknown>)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer block p-1"
                    aria-label={link.label}
                    title={isEmail ? "Click to copy email address" : `Go to ${link.label}`}
                  >
                    {link.icon}
                  </Component>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Send Email CTA Button */}
        <motion.div variants={cardVariants} className="flex md:justify-end items-center">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-border/30 hover:border-foreground/45 bg-foreground text-background hover:bg-foreground/95 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
          >
            <Mail className="size-4" />
            Send Email
          </a>
        </motion.div>

      </div>
    </Section>
  );
}
