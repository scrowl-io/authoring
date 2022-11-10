import React from 'react';
import { PaneProps } from './player-pane.types';
import * as styles from './player-pane.module.scss';

export const Pane = ({ children, className, side }: PaneProps) => {
  let paneStyles = `${styles.pane}`;

  if (className) {
    paneStyles += className;
  }

  switch (side) {
    default:
      paneStyles += ` ${styles.paneLeft}`;
      break;
  }

  return <div className={paneStyles}>{children}</div>;
};

export default {
  Pane,
};
