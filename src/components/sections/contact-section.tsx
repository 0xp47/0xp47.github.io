"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { SiCredly } from "react-icons/si";
import { motion } from "framer-motion";
import { profile, contactDescription, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

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
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Credly", href: profile.credly },
    { label: "Instagram", href: profile.instagram },
    { label: "Facebook", href: profile.facebook },
  ];

  const iconFor = (label: string) => {
    switch (label) {
      case "GitHub":
        return (
          <svg className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "Credly":
        return <SiCredly className="size-4 fill-current" />;
      case "Instagram":
        return (
          <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case "Facebook":
        return (
          <svg className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Section id="contact" eyebrow={sectionMeta.contact.eyebrow} title={sectionMeta.contact.title}>
      <div className="grid gap-8 md:grid-cols-2 md:items-stretch max-w-[900px]">
        {/* Left: description + socials */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-5 sm:p-6 transition-colors duration-200 hover:border-neutral-700 select-none"
        >
          <div>
            <span className="block font-mono text-[9.5px] uppercase text-neutral-400 tracking-[0.2em] mb-2">
              Let&apos;s Talk
            </span>
            <p className="text-sm leading-relaxed text-neutral-400 text-pretty">
              {contactDescription}
            </p>
          </div>

          <div className="pt-6">
            <span className="block font-mono text-[9px] uppercase text-neutral-500 tracking-[0.2em] mb-3">
              Social Profiles
            </span>
            <div className="flex flex-wrap gap-2.5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center chamfer-btn border border-neutral-800 bg-[#121212] text-neutral-400 hover:border-neutral-700 hover:bg-[#181818] hover:text-white transition-colors duration-200"
                  aria-label={link.label}
                  title={link.label}
                >
                  {iconFor(link.label)}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: email CTA card */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-5 sm:p-6 transition-colors duration-200 hover:border-neutral-700 select-none"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-semibold tracking-wider uppercase mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Available for new projects
            </div>

            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Direct Contact
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:underline transition-colors block break-all"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex items-center gap-2.5 pt-6 flex-wrap">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300 transition-colors duration-200 hover:border-neutral-700 hover:bg-[#181818] hover:text-white"
            >
              <Mail className="size-3.5" />
              Send Email
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300 transition-colors duration-200 hover:border-neutral-700 hover:bg-[#181818] hover:text-white"
              title="Copy email address"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
