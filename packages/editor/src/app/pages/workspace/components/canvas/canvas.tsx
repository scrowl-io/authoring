import React from 'react';
import { useData } from '../../';

export const Canvas = () => {
  const activeSlide = useData();

  console.log('Canvas', activeSlide);
  return <div>Canvas</div>;
};

export default {
  Canvas,
};
