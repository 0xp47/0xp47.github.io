// Silky, unhurried cubic-bezier curve with a gradual initial acceleration and
// a long, feathered deceleration tail so section reveals glide smoothly.
export const EASE_OUT_EXPO = [0.22, 0.88, 0.26, 1] as const;
export const EASE_OUT_QUART = [0.25, 0.9, 0.35, 1] as const;

export const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.05,
      ease: EASE_OUT_QUART,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const maskRevealVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.14, delayChildren = 0.12) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
