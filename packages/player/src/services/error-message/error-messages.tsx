// @ts-ignore
import React from 'react';

export const translateError = (error) => {
  const errorDictionary = {
    '403': 'Data Model Element Not Initialized',
  };

  if (error.id === '403') {
    if (error.stack.includes('location')) {
      return 'Course progress has not been set.';
    }
  }
  console.log(error);
  console.log(errorDictionary);
};

export default {
  translateError,
};
