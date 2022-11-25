import React from 'react';

export const NavGlossaryTerm = ({ glossaryTerm }) => {
  return (
    <div>
      <p>{glossaryTerm.word}</p>
      <p>{glossaryTerm.definition}</p>
    </div>
  );
};

export default {
  NavGlossaryTerm,
};
