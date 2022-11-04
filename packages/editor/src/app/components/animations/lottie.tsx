import React, { useEffect, useRef } from 'react';
import lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web';

export type LottieProps = {
  loop?: boolean;
  autoplay?: boolean;
  animationData: any;
};

export const Lottie = ({
  loop,
  autoplay,
  animationData,
  ...props
}: LottieProps) => {
  let lottieRef = useRef<AnimationItem>();
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current && animationData) {
      const config: AnimationConfigWithData = {
        container: nodeRef.current,
        renderer: 'svg',
        loop: loop === false ? false : true,
        autoplay: autoplay === false ? false : true,
        animationData,
      };

      lottieRef.current = lottie.loadAnimation(config);
    }
  }, [animationData, nodeRef]);

  return <div ref={nodeRef} {...props}></div>;
};

export default {
  Lottie,
};
