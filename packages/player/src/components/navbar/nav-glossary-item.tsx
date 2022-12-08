import React from 'react';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const NavGlossaryItem = ({ glossaryItem }) => {
  return (
    <div>
      <p className={css.glossaryItemTerm}>{glossaryItem.word}</p>
      <p className={css.glossaryItemDefinition}>{glossaryItem.definition}</p>
    </div>
  );
};

export default {
  NavGlossaryItem,
};
