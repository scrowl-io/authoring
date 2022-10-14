import React from 'react';
import { motion } from 'framer-motion';
import { DrawerProps, DrawerOpts, DrawerStyles } from './components.types';

export const Drawer = ({
  isAnimated,
  isOpen,
  slideFrom,
  children,
  className,
}: DrawerProps) => {
  let classes = 'offcanvas offcanvas-start show support-high-contrast';
  const direction = slideFrom === 'right' ? 'right' : 'left';
  const styles: DrawerStyles = {};
  const opts: DrawerOpts = {
    initial: {},
    animate: {},
    exit: {
      transition: {},
    },
    transition: {},
  };

  if (className) {
    classes += ' ' + className;
  }

  switch (direction) {
    case 'left':
      classes += ' left-overlay-panel';
      styles.left = 0;

      if (!isAnimated) {
        opts.initial.left = 0;
      } else {
        opts.initial.left = 'calc(-1 * var(--bs-offcanvas-width))';
        opts.animate.left = isOpen ? 0 : 'calc(-1 * var(--bs-offcanvas-width))';
        opts.exit.transition.left = { duration: 0.15 };
        opts.exit.left = 'calc(-1 * var(--bs-offcanvas-width))';
        opts.transition.left = { duration: 0.25 };
      }
      break;
    case 'right':
      classes += ' right-overlay-panel';
      styles.right = 0;
      opts.initial.right = 'calc(-1 * var(--bs-offcanvas-width))';
      opts.animate.right = isOpen
        ? '0px'
        : 'calc(-1 * var(--bs-offcanvas-width))';
      opts.exit.transition.right = { duration: 0.15 };
      opts.exit.right = 'calc(-1 * var(--bs-offcanvas-width))';

      if (!isAnimated) {
        opts.transition.right = { duration: 0 };
      } else {
        opts.transition.right = { duration: 0.25 };
      }
      break;
  }
  console.log('');
  console.log('drawer opts', opts);
  return (
    <motion.div
      className={classes}
      initial={opts.initial}
      animate={opts.animate}
      exit={opts.exit}
      transition={opts.transition}
    >
      {children}
    </motion.div>
  );
};

export default {
  Drawer,
};
