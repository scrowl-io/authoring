import React, { useEffect, useState, useRef } from 'react';
import magic, { Scene } from 'scrollmagic';
import * as css from './_template.scss';
import { TemplateProps } from './template.types';

export const Template = ({
  id,
  className,
  editMode,
  controller,
  onStart,
  onProgress,
  onEnd,
  children,
  notScene,
  ...props
}: TemplateProps) => {
  let classes = `${css.slide}`;
  const isNotScene = notScene ? notScene : false;
  const [duration, setDuration] = useState(
    (props.duration || window.innerHeight) + window.innerHeight
  );
  const isReady = useRef(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const pins = props.pins ? props.pins : [''];

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
    let scene: Scene;

    const createScene = () => {
      if (isNotScene) {
        return;
      }

      if (isReady.current) {
        return;
      }

      if (!slideRef.current) {
        return;
      }

      isReady.current = true;

      const scene = new magic.Scene({
        triggerElement: slideRef.current,
        duration,
      });

      const startingRect = slideRef.current.getBoundingClientRect();
      const sceneStart = startingRect.y;

      const handleSceneProgress = (ev) => {
        if (!slideRef.current) {
          return;
        }

        const slideRect = slideRef.current.children[0].getBoundingClientRect();
        let sceneTime = window.scrollY;
        let sceneEnd = sceneStart + slideRect.height;
        let docEnd = document.body.clientHeight;
        const endDiff = document.body.clientHeight - sceneEnd;

        if (endDiff < 0) {
          // height may change after scrolling past the first slide
          // this change has side effects on the startingRect
          // so we need to account for the possible difference
          docEnd -= endDiff;
        }

        if (sceneStart === 0 && slideRect.height !== docEnd) {
          // if its the first slide but not the last one
          // we need to take account of the scroll start position
          sceneEnd = slideRect.height - window.innerWidth / 2;
        }

        if (slideRect.height < window.innerHeight) {
          // if the slide isn't scrollable, the progress is 100%
          sceneTime = slideRect.height;
          sceneEnd = slideRect.height;
        }

        if (sceneEnd === docEnd) {
          // last slide
          if (sceneStart !== 0) {
            // not first slide
            sceneTime =
              (window.scrollY + window.innerHeight / 2 - sceneStart) * 2;
            sceneEnd = slideRect.height;

            if (slideRect.y < 0) {
              sceneTime += slideRect.y;
            }
          } else {
            sceneEnd = document.body.clientHeight - window.innerHeight;
          }
        } else if (sceneStart !== 0) {
          // not the first or last slide
          // we need to take account of the "start" being in the middle of the screen
          sceneTime = window.scrollY - sceneStart + window.innerHeight / 2;
          sceneEnd = slideRect.height;
        }

        let sceneProgress = Math.round(
          parseFloat(((sceneTime / sceneEnd) * 100).toFixed(2))
        );

        sceneProgress =
          sceneProgress > 100 ? 100 : sceneProgress < 0 ? 0 : sceneProgress;

        ev.progress = sceneProgress;
        ev.scene = {
          rect: slideRect,
          startingRect,
          start: sceneStart,
          time: sceneTime,
          end: sceneEnd,
          progress: sceneProgress / 100,
        };

        if (onProgress) {
          onProgress(ev);
        }
      };

      const handleSceneStart = (ev) => {
        if (onStart) {
          onStart(ev);
        }
      };

      const handleSceneEnd = (ev) => {
        if (onEnd) {
          onEnd(ev);
        }
      };

      scene
        .on('start', handleSceneStart)
        .on('progress', handleSceneProgress)
        .on('end', handleSceneEnd);

      pins.forEach((pin) => {
        const elem = document.getElementById(pin);

        if (!elem) {
          return;
        }

        scene.setPin(elem);
      });

      scene.addTo(controller);
    };

    createScene();

    return () => {
      if (scene) {
        scene.destroy(true);
        controller.removeScene(scene);
        isReady.current = false;
      }
    };
  }, [windowSize, duration, isReady.current, slideRef.current]);

  return (
    <div ref={slideRef} className={classes} {...props}>
      {children}
    </div>
  );
};

export default {
  Template,
};
