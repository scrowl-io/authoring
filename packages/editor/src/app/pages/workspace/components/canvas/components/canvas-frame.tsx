import React from 'react';
import { useTemplate } from '../../../';

export const CanvasFrame = () => {
  const data = useTemplate('meta');

  if (data) {
    console.log('canvas frame', data);
  }

  return <div>Frame</div>;
};

export default {
  CanvasFrame,
};
