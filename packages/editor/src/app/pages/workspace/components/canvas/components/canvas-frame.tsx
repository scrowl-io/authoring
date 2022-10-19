import React from 'react';
import { useHooks } from '../../../';

export const CanvasFrame = () => {
  const hooks = useHooks();
  const data = hooks.useActiveTemplate('meta');

  if (data) {
    console.log('canvas frame', data);
  }

  return <div>Frame</div>;
};

export default {
  CanvasFrame,
};
