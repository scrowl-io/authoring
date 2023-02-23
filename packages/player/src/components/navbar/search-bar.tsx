// @ts-ignore
import React, { useState, useRef, LegacyRef, useEffect } from 'react';
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

  //@ts-ignore
  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'Enter':
        doSearch();
        break;
      default:
        break;
    }
  };

  const doSearch = () => {
    setConfirmedSearchTerm(searchTerm);
  };

  // const clearSearch = (focus) => {
  //   setSearchTerm('');
  //   setConfirmedSearchTerm('');

  //   // onSearch('');

  //   if (focus === true) {
  //     requestAnimationFrame(() => {
  //       if (inputRef && inputRef.current) {
  //         const ref =
  //           inputRef.current as unknown as LegacyRef<HTMLInputElement>;
  //         // @ts-ignore
  //         ref.focus();
  //       }
  //     });
  //   } else {
  //     requestAnimationFrame(() => {
  //       //@ts-ignore
  //       inputRef.current.blur();
  //     });
  //   }
  // };

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
          // ref={inputRef as unknown as LegacyRef<HTMLInputElement>}
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {confirmedSearchTerm !== '' ? (
        <button
          className="clear"
          onClick={(e) => {
            //@ts-ignore
            e.target.blur();
            // clearSearch(true);
          }}
          aria-label="Clear Search"
          title="Clear Search"
        >
          <i className="fal fa-times"></i>
        </button>
      ) : null}
    </div>
  );
};

export default {
  SearchBar,
};
