import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Settings } from '../../../../models';
import {
  AssetBrowser as AB,
  GlossaryOverlay as GO,
  ResourceOverlay as RO,
} from './components';

export const AssetBrowser = AB;
export const GlossaryOverlay = GO;
export const ResourceOverlay = RO;

export const Overlay = () => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;

  return <AnimatePresence></AnimatePresence>;
};

export default {
  AssetBrowser,
  GlossaryOverlay,
  ResourceOverlay,
};
