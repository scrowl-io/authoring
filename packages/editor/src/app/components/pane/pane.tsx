import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as css from './_pane.scss';
import { PaneProps } from './pane.types';

export const Pane = ({ className, side, children, ...props }: PaneProps) => {
  let classes = className
    ? `${className} ${css.pane} support-high-contrast `
    : `${css.pane} support-high-contrast `;
  let grabClasses = `${css.grabHandle} `;
  const grabNode = useRef<HTMLDivElement>(null);
  const [panelWidth, setPanelWidth] = useState(325);

  useEffect(() => {
    const grabElem = grabNode.current;

    if (!grabElem) {
      return;
    }

    const panelElem = grabElem.parentElement;

    if (!panelElem) {
      return;
    }

    const resizePane = (width: number) => {
      const minWidth = 200;
      const maxWidth = window.innerWidth / 3;
      let newWidth = width;

      if (width > maxWidth) {
        newWidth = maxWidth;
      } else if (width < minWidth) {
        newWidth = minWidth;
      }

      panelElem.style.setProperty('--panel-width', newWidth + 'px');
      return newWidth;
    };

    const handleGrabMove = (ev: MouseEvent) => {
      ev.preventDefault();
      setPanelWidth(resizePane(ev.clientX));
    };

    const handleGrabEnd = (ev: MouseEvent) => {
      ev.preventDefault();
      document.documentElement.style.setProperty(
        '--dragging-pointer-events',
        ''
      );
      document.removeEventListener('mousemove', handleGrabMove);
      document.removeEventListener('mouseup', handleGrabEnd);
    };

    const handleGrabStart = (ev: MouseEvent) => {
      ev.preventDefault();
      document.documentElement.style.setProperty(
        '--dragging-pointer-events',
        'none'
      );

      document.addEventListener('mousemove', handleGrabMove);
      document.addEventListener('mouseup', handleGrabEnd);
    };

    const handleWindowResize = () => {
      console.log(
        'window resize',
        panelElem.style.getPropertyValue('--panel-width')
      );
      // let currentWidth = parseInt(
      //   getComputedStyle(document.documentElement).getPropertyValue(
      //     '--panel-width-left'
      //   )
      // );

      // setPanelWidth(resizePane(currentWidth));
    };

    grabElem.addEventListener('mousedown', handleGrabStart);
    window.addEventListener('resize', handleWindowResize);

    setPanelWidth(resizePane(panelWidth));

    return () => {
      if (!grabElem) {
        return;
      }

      grabElem.removeEventListener('mousedown', handleGrabStart);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [grabNode]);

  switch (side) {
    case 'right':
      classes += `${css.paneRight} `;
      grabClasses += css.grabHandleRight;
      break;
    default:
      classes += `${css.paneLeft} `;
      grabClasses += css.grabHandleLeft;
      break;
  }

  return (
    <motion.div className={classes} {...props}>
      {children}
      <div className={grabClasses} ref={grabNode}>
        <div></div>
      </div>
    </motion.div>
  );
};

export default {
  Pane,
};
