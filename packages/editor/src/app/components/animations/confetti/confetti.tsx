import React from 'react';
import animationData from './data.json';
import { Lottie } from '../lottie';
import { Error } from '../../error';

export const Confetti = (props) => {
  return (
    <Error>
      <Lottie animationData={animationData} {...props} />
    </Error>
  );
};

export default {
  Confetti,
};
