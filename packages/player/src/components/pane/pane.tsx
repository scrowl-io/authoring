import React from 'react';
import { PaneProps } from './pane.types';
import * as css from './_pane.scss';

export const Pane = ({ children, className, side }: PaneProps) => {
  let paneStyles = `${css.pane}`;

  if (className) {
    paneStyles += className;
  }

  switch (side) {
    default:
      paneStyles += ` ${css.paneLeft}`;
      break;
  }

  return <div className={paneStyles}>{children}</div>;
};

export default {
  Pane,
};
