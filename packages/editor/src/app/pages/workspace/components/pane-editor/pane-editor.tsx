import React from 'react';
import { useData } from '../../';

export const PaneEditor = () => {
  const activeSlide = useData();

  console.log('Editor Pane', activeSlide);
  return <div>Editor</div>;
};

export default {
  PaneEditor,
};
