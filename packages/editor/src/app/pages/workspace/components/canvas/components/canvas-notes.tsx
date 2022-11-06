import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@owlui/lib';
import * as css from '../_canvas.scss';
import { useActiveSlide, setActiveSlide } from '../../../';
import { Settings } from '../../../../../models';

export const CanvasNotes = () => {
  const notes = useActiveSlide('notes');
  const slideId = useActiveSlide('id');
  const hasSlide = slideId !== -1;
  const animationSettings = Settings.useAnimation();
  const reducedAnimations = animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const [isShow, setIsShow] = useState(false);
  let motionHeight = isShow ? '102px' : '27px';

  document.documentElement.style.setProperty(
    '--workspace-notes-height',
    isShow ? '75px' : ''
  );

  return (
    <motion.div
      initial={{ opacity: reducedAnimations ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay }}
      style={{ pointerEvents: hasSlide ? 'initial' : 'none' }}
    >
      <motion.div
        className={css.canvasFooter}
        style={{ overflow: 'hidden' }}
        initial={{ height: '27px' }}
        animate={{ height: motionHeight }}
        transition={{ duration: reducedAnimations ? 0 : 0.2 }}
        onUpdate={(val: any) => {
          let notesHeight = parseInt(val.height) - 27;
          if (notesHeight <= 0) {
            document.documentElement.style.setProperty(
              '--workspace-notes-height',
              ''
            );

            return;
          }
          document.documentElement.style.setProperty(
            '--workspace-notes-height',
            notesHeight + 'px'
          );
        }}
      >
        <a
          className={`${css.canvasFooterLink} ${isShow ? '' : 'collapsed'}`}
          href="#"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          <label
            className={`form-label ${css.canvasFooterLinkLabel}`}
            htmlFor="slideNotes"
          >
            Slide Notes
          </label>
          {hasSlide && (
            <Icon icon="arrow_drop_down" display="sharp" opsz={20} />
          )}
        </a>
        <motion.div
          className={'collapse show'}
          initial={{ opacity: 0 }}
          animate={{ opacity: hasSlide ? 1 : 0 }}
          transition={{ duration: reducedAnimations ? 0 : 0.1 }}
        >
          <textarea
            style={{ minHeight: '72px' }}
            className={`form-control ${css.canvasFooterTextarea}`}
            value={notes}
            onChange={(e) => {
              setActiveSlide({ notes: e.target.value });
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default {
  CanvasNotes,
};
