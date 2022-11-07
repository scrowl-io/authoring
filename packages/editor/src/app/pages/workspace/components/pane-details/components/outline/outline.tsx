import React, { useEffect } from 'react';
import * as css from '../../_pane-details.scss';
import { OutlineModules } from './';
import {
  useNewSlide,
  resetNewSlide,
  setActiveSlide,
} from '../../../../page-workspace-hooks';
import { Projects } from '../../../../../../models';

export const Outline = () => {
  const isNewSlide = useNewSlide();
  const latestSlide = Projects.useLatestSlide();

  useEffect(() => {
    if (isNewSlide) {
      setActiveSlide(latestSlide);
      resetNewSlide();
    }
  }, [isNewSlide]);

  return (
    <div className={css.tabOutline}>
      <OutlineModules />
    </div>
  );
};

export default {
  Outline,
};
