import React from 'react';
import { Button, Icon } from '@owlui/lib';
import { OutlineSlidesProps, OutlineSlideItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import { useActiveSlide, setActiveSlide } from '../../../../';

export const OutlineSlideItem = ({
  slide,
  slideIdx,
  className,
  ...props
}: OutlineSlideItemProps) => {
  const activeSlide = useActiveSlide();
  const isActive =
    slide.moduleIdx === activeSlide.moduleIdx &&
    slide.lessonIdx === activeSlide.lessonIdx &&
    slideIdx === activeSlide.slideIdx;
  let classes = `${css.outlineHeader}`;

  if (className) {
    classes += ` ${className}`;
  }

  if (isActive) {
    classes += ` ${css.active}`;
  }

  const handleSetActiveSlide = () => {
    setActiveSlide({
      slide,
      slideIdx,
    });
  };

  return (
    <div className={css.outlineSlide} {...props}>
      <div className={classes}>
        <Button
          className={css.outlineItem}
          variant="link"
          onClick={handleSetActiveSlide}
        >
          <span className={css.outlineItemIconDetail}>
            <Icon
              icon="rectangle"
              display="outlined"
              opsz={20}
              grad={200}
              appearance="Slide"
            />
          </span>
          <span>{slide.name}</span>
        </Button>
      </div>
    </div>
  );
};

export const OutlineSlides = ({
  moduleIdx,
  lessonIdx,
  className,
  ...props
}: OutlineSlidesProps) => {
  const slides = Projects.useSlides(moduleIdx, lessonIdx);
  let classes = `nav flex-column `;

  if (className) {
    classes += `${className} `;
  }

  return (
    <div className={classes} {...props}>
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
