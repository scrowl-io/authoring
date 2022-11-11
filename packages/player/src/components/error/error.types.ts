import React from 'react';

export interface ErrorCommons {
  msg: string;
}

export type ErrorProps = ErrorCommons & React.AllHTMLAttributes<HTMLDivElement>;
