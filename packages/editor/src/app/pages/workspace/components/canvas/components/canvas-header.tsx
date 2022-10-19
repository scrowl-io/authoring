import React from 'react';
import { useData } from '../../../';

export const CanvasHeader = () => {
  const data = useData('meta');

  console.log('Canvas Header', data);
  return <div>Header</div>;
};

export default {
  CanvasHeader,
};
