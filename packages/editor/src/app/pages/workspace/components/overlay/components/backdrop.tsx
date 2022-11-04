import React from 'react';
import { motion } from 'framer-motion';
import * as css from '../_overlay.scss';

export const Backdrop = ({ className, onClick, children }) => {
  let classes = `offcanvas-backdrop fade show ${css.overlayBackdrop}`;

  if (className) {
    classes += ` ${className}`;
  }

  const handleClose = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;

    if (!ev.currentTarget.isSameNode(target)) {
      return;
    }

    onClick(ev);
  };

  return (
    <motion.div
      className={classes}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default {
  Backdrop,
};
