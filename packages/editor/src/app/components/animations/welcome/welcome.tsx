import React from 'react';
import animationData from './data.json';
import { Error } from '../../error';
import { Lottie } from '../lottie';

export const Welcome = (props) => {
  return (
    <Error>
      <Lottie animationData={animationData} {...props} />
    </Error>
  );
};

export default {
  Welcome,
};
