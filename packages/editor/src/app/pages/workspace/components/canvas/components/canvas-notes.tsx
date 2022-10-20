import React from 'react';
import { useActiveTemplate } from '../../../';

export const CanvasNotes = () => {
  const data = useActiveTemplate('meta');

  if (!data.filename) {
    return <></>;
  }

  return <div>Notes</div>;
};

export default {
  CanvasNotes,
};
