import React from 'react';
import { CanvasHeader, CanvasFrame, CanvasNotes } from './components';

export const Canvas = () => {
  return (
    <div>
      <CanvasHeader />
      <CanvasFrame />
      <CanvasNotes />
    </div>
  );
};

export default {
  Canvas,
};
