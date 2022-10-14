import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Settings } from '../../../../models';
import { GlossaryEditor } from './components';

export const Overlay = () => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;

  return (
    <AnimatePresence>
      <GlossaryEditor isAnimated={isAnimated} />
    </AnimatePresence>
  );
};

export default {
  Overlay,
};
