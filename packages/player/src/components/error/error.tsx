import React from 'react';
import { ErrorProps } from './error.types';

export const Error = ({ msg, ...props }: ErrorProps) => {
  return (
    <div {...props}>
      <h1>Error</h1>
      <p>{msg}</p>
    </div>
  );
};

export default {
  Error,
};
