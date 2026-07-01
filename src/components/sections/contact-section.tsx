"use client";

import { Mail, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile, contactDescription } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface SocialChipProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialChip({ href, label, icon }: SocialChipProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
    >
      {icon}
      {label}
    </a>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together.">
      <motion.div 
        variants={cardVariants}
        className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
      >
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
          {contactDescription}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <Button asChild size="lg" className="h-11 rounded-full px-5">
            <a href={`mailto:${profile.email}`}>
              Email Me
              <Mail />
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="mt-7 flex flex-wrap gap-3"
      >
        <motion.div variants={cardVariants}>
          <SocialChip href={profile.facebook} label="Facebook" icon={<FacebookIcon className="size-4" />} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SocialChip href={profile.instagram} label="Instagram" icon={<InstagramIcon className="size-4" />} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SocialChip href={profile.github} label="GitHub" icon={<GitBranch className="size-4" />} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SocialChip href={profile.linkedin} label="LinkedIn" icon={<LinkedinIcon className="size-4" />} />
        </motion.div>
      </motion.div>
    </Section>
  );
}
