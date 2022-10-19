import React from 'react';
import * as css from './_canvas.scss';
import { CanvasHeader, CanvasFrame, CanvasNotes } from './components';

export const Canvas = () => {
  return (
    <div className={css.canvas}>
      <CanvasHeader />
      <CanvasFrame />
      <CanvasNotes />
    </div>
  );
};

export default {
  Canvas,
};
