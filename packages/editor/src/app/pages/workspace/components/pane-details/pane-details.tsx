import React from 'react';
import { Button } from '@owlui/lib';
import { setGlossaryEditor } from '../../';

export const PaneDetails = () => {
  const handleOpenGlossary = () => {
    setGlossaryEditor(true);
  };

  return (
    <aside>
      <div>Details</div>
      <Button onClick={handleOpenGlossary}>Open Glossary</Button>
    </aside>
  );
};

export default {
  PaneDetails,
};
