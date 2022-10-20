import React from 'react';
import * as css from './_player-slide.scss';
import { SlideProps, AspectRatios } from './player-slide.types';

const aspectRatios: AspectRatios = {
  '4:3': {
    label: 'Standard 4:3',
    width: 1920,
    height: 1440,
  },
  '16:9': {
    label: 'Widescreen 16:9',
    width: 1920,
    height: 1080,
  },
  '16:10': {
    label: 'Widescreen 16:10',
    width: 1920,
    height: 1200,
  },
};

export const Slide = ({
  children,
  className,
  options,
  ...props
}: SlideProps) => {
  const cssClasses = className ? `${css.slide} ${className}` : `${css.slide}`;
  const ratio = options.aspect || '16:9';
  const aspect = aspectRatios[ratio];
  const styles = {
    width: `${aspect.width}px`,
    height: `${aspect.height}px`,
  };

  return (
    <div className={cssClasses} style={styles} {...props}>
      {children}
    </div>
  );
};

export default {
  Slide,
};
