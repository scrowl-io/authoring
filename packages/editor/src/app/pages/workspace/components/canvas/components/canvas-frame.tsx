import React from 'react';
import { useActiveTemplate } from '../../../';

export const CanvasFrame = () => {
  const data = useActiveTemplate('meta');

  if (data) {
    console.log('canvas frame', data);
  }

  return <div>Frame</div>;
};

export default {
  CanvasFrame,
};
