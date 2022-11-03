import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from './data.json';

export const DrawnArrow = (props) => {
  let config = props.config
    ? props.config
    : { rotateDeg: 0, scaleX: 1, scaleY: 1 };

  switch (props.direction) {
    case 'left':
      config = { rotateDeg: 90, scaleX: -1, scaleY: 1 };
      break;
    case 'right':
      config = { rotateDeg: 90, scaleX: -1, scaleY: -1 };
      break;
    case 'up':
      config = { rotateDeg: 0, scaleX: -1, scaleY: -1 };
      break;
    case 'down':
      // Initial config
      break;
  }

  let transform = '';

  if (config.rotateDeg !== 0) {
    transform += 'rotate(' + config.rotateDeg + 'deg)';
  }

  if (config.scaleX !== 0) {
    transform += 'scaleX(' + config.scaleX + ')';
  }

  if (config.scaleY !== 0) {
    transform += 'scaleY(' + config.scaleY + ')';
  }

  let styles = {
    transform,
  };

  if (props.style) {
    styles = Object.assign(styles, props.style);
  }

  const animation = useLottie({
    animationData,
    loop: props.loop === false ? false : true,
  }).View;

  return (
    <div style={styles} {...props}>
      {animation}
    </div>
  );
};

export default {
  DrawnArrow,
};
