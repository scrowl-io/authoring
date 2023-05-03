import React from 'react';
import utils from '../../utils';
import * as _css from './_splash.scss';

export const Splash = () => {
  const css = utils.css.removeMapPrefix(_css);

  return (
    <div className={css.splashContainer}>
      <h2>SPLASH</h2>
      <p>this is the splash plage</p>
    </div>
  );
};
