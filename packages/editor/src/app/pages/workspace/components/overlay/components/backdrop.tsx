import React from 'react';
import { motion } from 'framer-motion';
import * as css from '../_overlay.scss';

export const Backdrop = ({ className, isAnimated, ...props }) => {
  let classes = `offcanvas-backdrop fade show ${css.overlayBackdrop}`;

  if (className) {
    classes += ` ${className}`;
  }

  if (!isAnimated) {
    return <motion.div className={classes} {...props} />;
  } else {
    return (
      <motion.div
        className={classes}
        transition={{ opacity: { delay: 0, duration: 0.05 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        {...props}
      />
    );
  }
};

export default {
  Backdrop,
};
