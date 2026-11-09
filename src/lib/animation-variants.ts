/**
 * Reusable Framer Motion animation variants designed for high-end,
 * modern, smooth scroll-down reveals (Emil Kowalski / Linear curve).
 */

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE_SMOOTH,
    },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE_SMOOTH,
    },
  },
};

export const lineDrawHorizontal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.75,
      ease: EASE_SMOOTH,
    },
  },
};

export const lineDrawVertical = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.85,
      ease: EASE_SMOOTH,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
