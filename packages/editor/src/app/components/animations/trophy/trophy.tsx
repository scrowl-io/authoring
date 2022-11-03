import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from './data.json';

export const Trophy = (props) => {
  const animation = useLottie({
    animationData,
    loop: props.loop === false ? false : true,
  }).View;

  return <div {...props}>{animation}</div>;
};

export default {
  Trophy,
};
