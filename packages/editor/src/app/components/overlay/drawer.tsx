import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DrawerProps, DrawerOpts, DrawerStyles } from './overlay.types';

export const Drawer = ({
  isAnimated,
  isOpen,
  slideFrom,
  children,
  className,
  style,
  onClick,
  onClose,
}: DrawerProps) => {
  let classes = 'offcanvas show support-high-contrast';
  const direction = slideFrom === 'right' ? 'right' : 'left';
  let offcanvasWidth = 400;
  let offcanvasOffset = -1 * offcanvasWidth;
  let styles: DrawerStyles = {
    maxWidth: offcanvasWidth,
    width: offcanvasWidth,
  };
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

  if (style) {
    styles = Object.assign(styles, style);
    offcanvasWidth = styles.width;
    offcanvasOffset = -1 * offcanvasWidth;
  }

  switch (direction) {
    case 'left':
      classes += ' left-overlay-panel offcanvas-start';
      styles.left = 0;

      if (!isAnimated) {
        opts.initial.left = 0;
      } else {
        opts.initial.left = offcanvasOffset;
        opts.animate.left = isOpen ? 0 : offcanvasOffset;
        opts.exit.transition.left = { duration: 0.15 };
        opts.exit.left = offcanvasOffset;
        opts.transition.left = { duration: 0.25 };
      }
      break;
    case 'right':
      classes += ' right-overlay-panel offcanvas-end';
      styles.right = offcanvasOffset;

      if (!isAnimated) {
        opts.initial.right = offcanvasOffset;
      } else {
        opts.initial.right = offcanvasOffset;
        opts.animate.right = isOpen ? 0 : offcanvasOffset;
        opts.exit.transition.right = { duration: 0.15 };
        opts.exit.right = offcanvasOffset;
        opts.transition.right = { duration: 0.25 };
      }
      break;
  }

  useEffect(() => {
    const handleControls = (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Escape':
          onClose();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleControls);
    } else {
      window.removeEventListener('keydown', handleControls);
    }

    return () => {
      window.removeEventListener('keydown', handleControls);
    };
  }, [isOpen]);

  return (
    <motion.div
      onClick={onClick}
      className={classes}
      style={styles}
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
