import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@owlui/lib';
import * as css from '../_canvas.scss';
import { useActiveSlide } from '../../..';
import { Settings, Projects } from '../../../../../models';
import { events } from '../../../../../services';

export const CanvasBreadcrumb = () => {
  const slide = useActiveSlide();
  const hasSlide = slide.id !== -1;
  const module = Projects.useModules(slide.moduleId);
  const lesson = Projects.useLessons(slide.moduleId, slide.lessonId);
  const animationSettings = Settings.useAnimation();
  const reducedAnimations = animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;

  const handleSlideFocus = (ev: React.MouseEvent<HTMLButtonElement>) => {
    events.slide.focus(slide.id);
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
                {module && module.name}
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
                {lesson && lesson.name}
              </button>
            </li>
            <li className="breadcrumb-item active dropup" aria-current="page">
              <button
                className="breadcrumb-item__content dropdown-toggle active"
                onClick={handleSlideFocus}
                onContextMenu={handleSlideFocus}
              >
                <Icon
                  icon="rectangle"
                  display="outlined"
                  opsz={20}
                  grad={200}
                  appearance="Slide"
                />
                {slide && slide.name}
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
