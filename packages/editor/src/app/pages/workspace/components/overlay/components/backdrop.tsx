import React from 'react';
import { motion } from 'framer-motion';

export const Backdrop = ({ className, isAnimated, ...props }) => {
  const classes = `offcanvas-backdrop fade show ${className ? className : ''}`;

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
