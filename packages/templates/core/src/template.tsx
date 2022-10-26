import React, { useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import { TemplateProps } from './core.types';
import * as css from './_index.scss';

export const Template = ({
  id,
  className,
  duration,
  editMode,
  ready,
  controller,
  templateKey,
  onScroll,
  onStateChange,
  children,
  ...props
}: TemplateProps) => {
  let classes = css.slideContainer;
  const styles = {
    height: `calc(100vh + ${duration}px)`,
  };

  if (className) {
    classes += ` ${className}`;
  }

  if (templateKey) {
    classes += ` ${templateKey}`;
  }

  if (editMode) {
    classes += ` ${css.editMode}`;
  }

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const slideDuration = duration + windowHeight * 2;
    let slideVisible: boolean = false;
    let lastStageName = '';

    const setSlideVisible = (visible: boolean) => {
      if (visible === slideVisible) {
        return;
      }

      slideVisible = visible;
    };

    const sceneTrigger = new ScrollMagic.Scene({
      triggerElement: '#' + id,
      duration: slideDuration,
      triggerHook: 1,
    })
      .on('progress', function (e: any) {
        const progressPixels = e.progress * slideDuration;

        let stageName = '';
        let stageProgress = 0;
        if (progressPixels <= windowHeight) {
          if (lastStageName === 'body' && onScroll) {
            const progressEvent = {
              progress: e.progress,
              stage: 'body',
              stageProgress: 0,
            };

            onScroll(progressEvent);
          }

          stageName = 'in_view';
          stageProgress = progressPixels / windowHeight;
        } else if (progressPixels >= slideDuration - windowHeight) {
          if (lastStageName === 'body' && onScroll) {
            const progressEvent = {
              progress: e.progress,
              stage: 'body',
              stageProgress: 1,
            };

            onScroll(progressEvent);
          }

          stageName = 'out_view';
          stageProgress =
            (progressPixels - (slideDuration - windowHeight)) / windowHeight;
        } else if (slideDuration > 0) {
          if (onScroll) {
            const progressEvent = {
              progress: e.progress,
              stage: 'body',
              stageProgress: 0,
            };

            if (lastStageName === 'in_view') {
              onScroll(progressEvent);
            } else if (lastStageName === 'out_view') {
              progressEvent.stageProgress = 1;
              onScroll(progressEvent);
            }
          }

          stageProgress = (progressPixels - windowHeight) / slideDuration;
          stageName = 'body';
        }

        lastStageName = stageName;

        if (onScroll) {
          const progressEvent = {
            progress: e.progress,
            stage: stageName,
            stageProgress,
          };
          onScroll(progressEvent);
        }
      })
      .on('enter leave ', function (e: any) {
        if (!controller || !onStateChange) {
          return;
        }

        let scrollDirection = controller.info('scrollDirection');

        if (typeof scrollDirection === 'string') {
          scrollDirection = scrollDirection.toLowerCase();
        }

        if (e.type === 'enter') {
          setSlideVisible(true);
          onStateChange({
            state: 'visible',
            direction: scrollDirection,
          });
        } else {
          setSlideVisible(false);
          onStateChange({
            state: 'hidden',
            direction: scrollDirection,
          });
        }
      })
      .addTo(controller);

    return () => {
      controller.removeScene(sceneTrigger);
    };
  }, [props, duration, id]);

  return (
    <div id={id} className={classes} style={styles} {...props}>
      {children}
    </div>
  );
};

export default {
  Template,
};
