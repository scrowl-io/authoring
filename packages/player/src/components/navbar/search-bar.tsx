// @ts-ignore
import React, { useState, useEffect } from 'react';
import utils from '../../utils';
import * as _css from './_navbar.scss';

// @ts-ignore
const css = utils.css.removeMapPrefix(_css);

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  confirmedSearchTerm,
  setConfirmedSearchTerm,
}) => {
  const Scrowl = window['Scrowl'];

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'Enter':
        doSearch();
        break;
      case 'Escape':
        clearSearch(event);
      default:
        break;
    }
  };

  const doSearch = () => {
    setConfirmedSearchTerm(searchTerm);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSearchTerm('');
    setConfirmedSearchTerm('');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  return (
    <div className={css.searchBar}>
      <Scrowl.ui.Icon icon="search" display="outlined" />
      <div className={css.searchTerm}>
        <input
          type="text"
          placeholder="Search glossary..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {confirmedSearchTerm !== '' ? (
        <button
          className={css.clear}
          onClick={(e) => {
            clearSearch(e);
          }}
          aria-label="Clear Search"
          title="Clear Search"
        >
          <Scrowl.ui.Icon icon="close" display="outlined" />
        </button>
      ) : null}
    </div>
  );
};

export default {
  SearchBar,
};
