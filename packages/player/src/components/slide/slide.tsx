import React from 'react';
import { SlideProps } from './slide.types';

export const Slide = ({
  children,
  className,
  options,
  ...props
}: SlideProps) => {
  let classes = 'slide';

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default {
  Slide,
};
