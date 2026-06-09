export const ERA_STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const ERA_CARD_VARIANT = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const BRANCH_VARIANT = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
};

export const FOSSIL_REVEAL_VARIANT = {
  hidden: { opacity: 0, filter: 'blur(8px)', scale: 0.95 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export const EXTINCTION_FLASH_VARIANT = {
  hidden: { opacity: 0, backgroundColor: 'rgba(192, 57, 43, 0)' },
  show: {
    opacity: 1,
    backgroundColor: 'rgba(192, 57, 43, 0.06)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const STATS_COUNT_VARIANT = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const PAGE_ENTER_VARIANT = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};
