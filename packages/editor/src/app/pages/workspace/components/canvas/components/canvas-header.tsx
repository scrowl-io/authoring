import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@owlui/lib';
import * as css from '../_canvas.scss';
import { useActiveSlide, setActiveSlide } from '../../../';
import { Settings } from '../../../../../models';

export const CanvasHeader = () => {
  const name = useActiveSlide('name');
  let nameLn = name.length;
  const [nameSize, setNameSize] = useState(nameLn - 3 < 13 ? 13 : nameLn - 3);
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const animationOpts = {
    initial: !isAnimated ? {} : { opacity: 0 },
    animate: !isAnimated ? {} : { opacity: 1 },
    transition: !isAnimated ? {} : { delay: animationDelay + 0.1 },
  };
  console.log('name', name);
  const handleNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    nameLn = val.length;
    setNameSize(nameLn - 3 < 13 ? 13 : nameLn - 3);
    setActiveSlide({ name: val });
  };

  const handleNameInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        break;
      case 'Escape':
        setActiveSlide({ name });
        ev.currentTarget.blur();
        break;
    }
  };

  return (
    <motion.div
      className={css.canvasHeader}
      initial={animationOpts.initial}
      animate={animationOpts.animate}
      transition={animationOpts.transition}
    >
      <h1 className="visually-hidden">{name}</h1>
      <Icon icon="rectangle" display="outlined" opsz={20} appearance="Slide" />
      <div className={css.canvasHeaderSlideName}>
        <input
          name="slideName"
          id="slideNameInput"
          className="owlui-form-control"
          value={name}
          placeholder="Untitled Slide"
          onKeyDown={handleNameInput}
          onChange={handleNameChange}
          size={nameSize}
        />
      </div>
    </motion.div>
  );
};

export default {
  CanvasHeader,
};
