import React from 'react';
import { PaneProps } from './pane.types';
import utils from '../../utils';
import * as _css from './_pane.scss';

const css = utils.css.removeMapPrefix(_css);

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
