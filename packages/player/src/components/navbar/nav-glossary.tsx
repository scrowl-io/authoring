import React, { useEffect, useState, useCallback } from 'react';
import utils from '../../utils';
import { SearchBar } from './search-bar';
import * as _css from './_navbar.scss';
import Keywords from 'react-keywords';

const css = utils.css.removeMapPrefix(_css);

export const NavGlossary = ({ glossary }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState(glossary);

  const sortedGlossary = filteredTerms.sort((a, b) => {
    const textA = a.word.toLowerCase();
    const textB = b.word.toLowerCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const letterTerms = {};

  sortedGlossary.forEach((glossaryTerm) => {
    let term = glossaryTerm.word;
    let definition = glossaryTerm.definition;

    let termLetter = term[0].toUpperCase();

    if (!letterTerms[termLetter]) {
      letterTerms[termLetter] = {};
    }

    letterTerms[termLetter][term] = definition;
  });

  const letters: JSX.Element[] = [];
  for (let letter in letterTerms) {
    const terms: JSX.Element[] = [];
    const dictTermList = letterTerms[letter];

    for (let word in dictTermList) {
      terms.push(
        <div className={css.glossaryTerm} key={word}>
          <div className={css.word}>
            <Keywords value={confirmedSearchTerm}>{word}</Keywords>
          </div>
          <div className={css.definition}>
            <Keywords value={confirmedSearchTerm}>
              {dictTermList[word]}
            </Keywords>
          </div>
        </div>
      );
    }

    letters.push(
      <div key={letter}>
        <header>{letter}</header>
        {terms}
      </div>
    );
  }

  const highlighter = useCallback(() => {
    const result = glossary.filter((term) => {
      return (
        term.word.toLowerCase().includes(confirmedSearchTerm.toLowerCase()) ||
        term.definition
          .toLowerCase()
          .includes(confirmedSearchTerm.toLowerCase())
      );
    });

    setFilteredTerms(result);
  }, [confirmedSearchTerm]);

  useEffect(() => {
    if (confirmedSearchTerm) {
      highlighter();
    } else {
      setFilteredTerms(glossary);
    }
  }, [confirmedSearchTerm]);

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        confirmedSearchTerm={confirmedSearchTerm}
        setConfirmedSearchTerm={setConfirmedSearchTerm}
      />
      <div className={css.navGlossary}>{letters}</div>
    </div>
  );
};

export default {
  NavGlossary,
};
