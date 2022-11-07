import React from 'react';
import * as css from '../../_pane-details.scss';
import { OutlineModules } from './';

export const Outline = () => {
  return (
    <div className={css.tabOutline}>
      <OutlineModules />
    </div>
  );
};

export default {
  Outline,
};
