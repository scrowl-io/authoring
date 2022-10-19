import React from 'react';
import { useTemplateElements } from '../../';

export const PaneEditor = () => {
  const data = useTemplateElements();

  console.log('Editor Pane', data);
  return <div>Editor</div>;
};

export default {
  PaneEditor,
};
