import React from 'react';
import { Datetime } from '../../utils';

export const Date = ({ children }) => {
  return <>{Datetime.readableFromValue(children)}</>;
};

export default {
  Date,
};
