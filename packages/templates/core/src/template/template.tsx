import React, { useEffect, useState, useRef } from 'react';
import magic, { Scene } from 'scrollmagic';
import * as css from './_template.scss';
import { TemplateProps } from './template.types';

export const Template = ({
  id,
  // @ts-ignore
  baseId,
  // @ts-ignore
  slides,
  className,
  controller,
  onEnter,
  onStart,
  onProgress,
  onEnd,
  onLeave,
  children,
  notScene,
  ...props
}: TemplateProps) => {
  let classes = `${css.slide}`;
  const editMode = props.editMode ? true : false;
  const isNotScene = notScene ? notScene : false;
  const [duration, setDuration] = useState(
    (props.duration || window.innerHeight) + window.innerHeight
  );
  const isReady = useRef(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [scroll, setScroll] = useState(false);

  const Scrowl = window['Scrowl'];

  if (!scroll) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
  }

  if (className) {
    classes += ` ${className}`;
  }

  if (editMode) {
    classes += ` edit-mode`;
  }

  useEffect(() => {
    const updateWindowSize = () => {
      setDuration((props.duration || 0) + window.innerHeight);
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  });

  useEffect(() => {
    let sceneTrigger: Scene;
    let scene: Scene;

    if (!Scrowl || !Scrowl.runtime || Scrowl.runtime.API === null) {
      setScroll(true);
    }

    if (Scrowl && Scrowl.runtime && Scrowl.runtime.API !== null) {
      const [locationError, location] = Scrowl.runtime.getLocation();

      if (!locationError && Object.keys(location).length > 0) {
        setScroll(true);
      }
    }

    const createScene = () => {
      if (isNotScene) {
        return;
      }

      if (isReady.current) {
        return;
      }

      if (!slideRef.current || !triggerRef.current || !sceneRef.current) {
        return;
      }

      isReady.current = true;

      scene = new magic.Scene({
        triggerElement: triggerRef.current,
        duration,
      });

      const reCalcStats = () => {
        if (!slideRef.current || !triggerRef.current || !sceneRef.current) {
          return;
        }

        const sceneController = sceneRef.current.parentElement;

        if (!sceneController) {
          return;
        }

        const sceneRect = sceneController.getBoundingClientRect();
        const startingRect = slideRef.current.getBoundingClientRect();
        const sceneStart = slideRef.current.offsetTop;
        let sceneTime = window.scrollY;
        let sceneEnd = editMode
          ? duration
          : sceneStart -
            window.innerHeight / 2 +
            sceneRect.height -
            window.innerHeight;
        const sceneProgress = parseFloat(
          (((sceneTime - sceneStart) / (sceneEnd - sceneStart)) * 100).toFixed(
            2
          )
        );

        return {
          rect: sceneRect,
          startingRect,
          currentTarget: sceneController,
          start: sceneStart,
          time: sceneTime,
          end: sceneEnd,
          progress: sceneProgress,
        };
      };

      const handleSceneProgress = (ev) => {
        let stats = reCalcStats();

        if (!stats) {
          return;
        }

        let reposition = (window.innerHeight / 2) * -1;

        switch (ev.scrollDirection) {
          case 'REVERSE':
            if (editMode) {
              reposition = stats.end + reposition;
              stats.currentTarget.style.paddingTop = `${reposition}px`;
              stats.progress = parseFloat(
                (
                  ((stats.time - stats.start) / (reposition - stats.start)) *
                  100
                ).toFixed(2)
              );
            }
            break;
        }

        if (stats.rect.y >= 0) {
          ev.progress = 0;
        } else {
          ev.progress = stats.progress;
        }

        ev.scene = stats;

        if (sceneRef.current) {
          if (stats.rect.y <= 0) {
            sceneRef.current.style.top = '0px';
          } else {
            sceneRef.current.style.top = `${stats.rect.y}px`;
          }
        }

        if (onProgress) {
          onProgress(ev);
        }

        if (sceneRef.current) {
          ev.currentTarget = sceneRef.current.firstChild;
          const sceneEvent = new CustomEvent('slide.progress', { detail: ev });
          document.dispatchEvent(sceneEvent);
        }
      };

      const handleSceneStart = (ev) => {
        const stats = reCalcStats();

        if (!stats) {
          return;
        }

        ev.progress = 0;
        stats.progress = 0;
        ev.scene = stats;

        stats.currentTarget.style.marginBottom = `0px`;

        if (onStart) {
          onStart(ev);
        }

        if (sceneRef.current) {
          ev.currentTarget = sceneRef.current.firstChild;
          const sceneEvent = new CustomEvent('slide.start', { detail: ev });
          document.dispatchEvent(sceneEvent);
        }
      };

      const handleSceneEnd = (ev) => {
        const stats = reCalcStats();

        if (!stats) {
          return;
        }

        ev.progress = 100;
        stats.progress = 100;
        ev.scene = stats;

        if (onEnd) {
          onEnd(ev);
        }

        if (sceneRef.current) {
          ev.currentTarget = sceneRef.current.firstChild;
          const sceneEvent = new CustomEvent('slide.end', { detail: ev });
          document.dispatchEvent(sceneEvent);
        }
      };

      const handleSceneEnter = (ev) => {
        const stats = reCalcStats();

        if (!stats) {
          return;
        }

        if (!sceneRef.current) {
          return;
        }

        switch (ev.scrollDirection) {
          case 'REVERSE':
            ev.progress = 100;
            stats.progress = 1;
            break;
          case 'FORWARD':
            ev.progress = 0;
            stats.progress = 0;

            if (editMode) {
              stats.currentTarget.style.paddingTop = `0px`;
            }
            break;
        }

        ev.scene = stats;

        if (onEnter) {
          onEnter(ev);
        }

        if (sceneRef.current) {
          ev.currentTarget = sceneRef.current.firstChild;
          const sceneEvent = new CustomEvent('slide.enter', { detail: ev });
          document.dispatchEvent(sceneEvent);
        }
      };

      const handleSceneLeave = (ev) => {
        const stats = reCalcStats();

        if (!stats) {
          return;
        }

        if (!sceneRef.current) {
          return;
        }

        let reposition = (window.innerHeight / 2) * -1;

        switch (ev.scrollDirection) {
          case 'REVERSE':
            ev.progress = 0;
            stats.progress = 0;
            sceneRef.current.style.top = '0px';
            break;
          case 'FORWARD':
            ev.progress = 100;
            stats.progress = 1;

            if (editMode) {
              reposition = stats.end + reposition;
              stats.currentTarget.style.paddingTop = `${reposition}px`;
            } else {
              sceneRef.current.style.top = `${reposition}px`;
              stats.currentTarget.style.marginBottom = `${reposition}px`;
            }
            break;
        }

        ev.scene = stats;

        if (onLeave) {
          onLeave(ev);
        }

        if (sceneRef.current) {
          ev.currentTarget = sceneRef.current.firstChild;
          const sceneEvent = new CustomEvent('slide.leave', { detail: ev });
          document.dispatchEvent(sceneEvent);
        }
      };

      scene
        .on('enter', handleSceneEnter)
        .on('start', handleSceneStart)
        .on('progress', handleSceneProgress)
        .on('end', handleSceneEnd)
        .on('leave', handleSceneLeave);

      scene.setPin(sceneRef.current);
      scene.addTo(controller);
    };

    createScene();

    return () => {
      if (sceneTrigger) {
        sceneTrigger.destroy(true);
        controller.removeScene(sceneTrigger);
        isReady.current = false;
      }
    };
  }, [windowSize, duration, isReady.current, triggerRef.current]);

  useEffect(() => {
    const handleStart = (ev) => {
      setScroll(true);
      const domSlideParents = document.querySelectorAll('.inner-content');
      const domSlides = Array.from(domSlideParents).map((parent) => {
        return parent.firstElementChild?.id;
      });

      const slideContent = ev.detail.target.parentElement.parentElement.id;
      domSlides.pop();
      const index = domSlides.indexOf(slideContent);
      const targetIndex = domSlides[index + 1];
      const nextTarget = document.querySelector(`#${targetIndex}`);

      nextTarget?.scrollIntoView();
    };
    document.addEventListener('startCourse', handleStart);
  }, []);

  const nextSlide = (ev) => {
    if (scroll) {
      const slideContent = ev.target.parentElement.parentElement.firstChild.id;

      const targets = slides.map((slide) => {
        return `module-${slide.moduleId}--lesson-${slide.lessonId}--slide-${slide.id}-${slide.template.meta.filename}`;
      });

      const matchingId = targets.find((t) => {
        return t === slideContent;
      });

      const currentIndex = targets.indexOf(matchingId);

      let targetIndex;
      let targetElement;

      switch (ev.target.innerText) {
        case 'Next':
          targetIndex = targets[currentIndex + 1];
          targetElement = document.querySelector(`#${targetIndex}`);
          targetElement?.scrollIntoView();
          break;
        case 'Previous':
          targetIndex = targets[currentIndex - 1];
          targetElement = document.querySelector(`#${targetIndex}`);
          targetElement?.scrollIntoView(false);
          break;
      }
    }
  };

  return (
    <div ref={slideRef} className={classes} {...props}>
      <div ref={triggerRef} className="scene-trigger"></div>
      <div ref={sceneRef} className="inner-content">
        {children}
        {/* @ts-ignore */}
        {slideRef.current &&
          slideRef.current.className &&
          !slideRef.current.className.includes('template-lesson-intro') &&
          !slideRef.current.className.includes('owlui-last') && (
            // @ts-ignore
            <div className={css.buttonContainer}>
              <button onClick={nextSlide}>Previous</button>
              <button onClick={nextSlide}>Next</button>
            </div>
          )}
      </div>
    </div>
  );
};

export default {
  Template,
};
