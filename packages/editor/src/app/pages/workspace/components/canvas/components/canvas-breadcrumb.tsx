import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@owlui/lib';
import * as css from '../_canvas.scss';
import { useActiveSlide } from '../../..';
import { Settings, Projects } from '../../../../../models';

export const CanvasBreadcrumb = () => {
  const slide = useActiveSlide();
  const hasSlide = slide.slideIdx !== -1;
  const module = Projects.useModules(slide.moduleIdx);
  const lesson = Projects.useLessons(slide.moduleIdx, slide.lessonIdx);
  const animationSettings = Settings.useAnimation();
  const reducedAnimations = animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;

  const handleSlideSelection = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // TODO; Move cursor focus to the slide
    ev.currentTarget.blur();
  };

  return (
    <motion.nav
      className={`${css.canvasBreadcrumb} navbar fixed-bottom`}
      aria-label="breadcrumb"
      style={reducedAnimations ? {} : { transform: 'translate(0,32px)' }}
      initial={reducedAnimations ? {} : { transform: 'translate(0,32px)' }}
      animate={
        reducedAnimations
          ? {}
          : {
              transform: 'translate(0,0px)',
              transition: { delay: animationDelay, duration: 0.4 },
            }
      }
    >
      <ol className={`${css.canvasBreadcrumbList} breadcrumb`}>
        {hasSlide ? (
          <>
            <li className="breadcrumb-item">
              <button className="breadcrumb-item__content" disabled>
                <Icon
                  icon="folder"
                  display="sharp"
                  filled={true}
                  grad={200}
                  opsz={20}
                  appearance="Module"
                />
                {module.name}
              </button>
            </li>
            <li className="breadcrumb-item">
              <button className="breadcrumb-item__content" disabled>
                <Icon
                  icon="interests"
                  display="sharp"
                  filled={true}
                  grad={200}
                  opsz={20}
                  appearance="Lesson"
                />
                {lesson.name}
              </button>
            </li>
            <li className="breadcrumb-item active dropup" aria-current="page">
              <button
                className="breadcrumb-item__content dropdown-toggle active"
                onClick={handleSlideSelection}
                onContextMenu={handleSlideSelection}
              >
                <Icon
                  icon="rectangle"
                  display="outlined"
                  opsz={20}
                  grad={200}
                  appearance="Slide"
                />
                {slide.name}
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="breadcrumb-item active dropup" aria-current="page">
              <button
                className="breadcrumb-item__content dropdown-toggle"
                style={{
                  textDecoration: 'none',
                  pointerEvents: 'none',
                }}
              >
                <Icon
                  icon="rectangle"
                  display="outlined"
                  opsz={20}
                  grad={200}
                  appearance="Slide"
                />
                No slide selected...
              </button>
            </li>
          </>
        )}
      </ol>
    </motion.nav>
  );
};

export default {
  CanvasBreadcrumb,
};
