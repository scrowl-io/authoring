import React, { useEffect, useState, useRef } from 'react';
import magic, { Scene } from 'scrollmagic';
import * as css from './_template.scss';
import { TemplateProps } from './template.types';

export const Template = ({
  id,
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
        let sceneEnd =
          sceneStart -
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
        const stats = reCalcStats();

        if (!stats) {
          return;
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
            break;
        }

        ev.scene = stats;

        if (onEnter) {
          onEnter(ev);
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

        const reposition = (window.innerHeight / (editMode ? 1 : 2)) * -1;

        switch (ev.scrollDirection) {
          case 'REVERSE':
            ev.progress = 0;
            stats.progress = 0;
            sceneRef.current.style.top = '0px';
            break;
          case 'FORWARD':
            ev.progress = 100;
            stats.progress = 1;
            sceneRef.current.style.top = `${reposition}px`;
            stats.currentTarget.style.marginBottom = `${reposition}px`;
            break;
        }

        ev.scene = stats;

        if (onLeave) {
          onLeave(ev);
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

  return (
    <div ref={slideRef} className={classes} {...props}>
      <div ref={triggerRef} className="scene-trigger"></div>
      <div ref={sceneRef} className="inner-content">
        {children}
      </div>
    </div>
  );
};

export default {
  Template,
};
