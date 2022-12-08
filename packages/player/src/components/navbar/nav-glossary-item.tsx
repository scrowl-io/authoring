import React from 'react';
import * as utils from '../../utils';
import * as css from './_navbar.scss';

export const NavGlossaryItem = ({ glossaryItem }) => {
  utils.css.removeMapPrefix(css);
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
