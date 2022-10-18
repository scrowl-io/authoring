import React from 'react';
import { OutlineSlidesProps, OutlineSlideItemProps } from './outline.types';
import { Projects } from '../../../../../../models';

export const OutlineSlideItem = ({
  slide,
  slideIdx,
  ...props
}: OutlineSlideItemProps) => {
  return <div {...props}>{slide.name}</div>;
};

export const OutlineSlides = ({
  moduleIdx,
  lessonIdx,
  ...props
}: OutlineSlidesProps) => {
  const slides = Projects.useSlides(moduleIdx, lessonIdx);

  return (
    <div {...props}>
      {slides.map((slide, idx) => {
        return <OutlineSlideItem key={idx} slide={slide} slideIdx={idx} />;
      })}
    </div>
  );
};

export default {
  OutlineSlides,
  OutlineSlideItem,
};
