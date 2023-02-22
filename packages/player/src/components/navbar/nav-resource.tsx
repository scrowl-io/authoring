import React from 'react';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const NavResource = ({ resource }) => {
  return (
    <div className={css.resourceContainer}>
      <a href={resource.filename} className={css.resourceName}>
        {resource.title}
      </a>
      <p className={css.resourceDescription}>{resource.description}</p>
    </div>
  );
};

export default {
  NavResource,
};
