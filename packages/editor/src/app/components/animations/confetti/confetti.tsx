import React from 'react';
import animationData from './data.json';
import { Lottie } from '../lottie';
import { Error } from '../../error';

export const Confetti = (props) => {
  const loop = props.loop === false ? false : true;

  return (
    <div {...props}>
      <Error>
        <Lottie animationData={animationData} loop={loop} />
      </Error>
    </div>
  );
};

export default {
  Confetti,
};
