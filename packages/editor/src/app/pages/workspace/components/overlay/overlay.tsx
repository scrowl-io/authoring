import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Settings } from '../../../../models';
import { GlossaryEditor } from './components';
import { AssetBrowser as AssetOverlay } from './components';

export const AssetBrowser = AssetOverlay;

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
  AssetBrowser,
};
