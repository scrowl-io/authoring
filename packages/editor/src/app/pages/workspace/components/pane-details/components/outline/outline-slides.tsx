import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@owlui/lib';
import { OutlineSlidesProps, OutlineSlideItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import { useActiveSlide, setActiveSlide } from '../../../../';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';
import { InputInlineText } from './input-inline-text';

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
  const [isEdit, setIsEdit] = useState(false);
  const slideMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Duplicate Slide',
      click: () => {
        console.log('duplicate slide');
      },
    },
    {
      label: 'Add New Slide After',
      click: () => {
        console.log('add slide after');
      },
    },
    { type: 'separator' },
    {
      label: 'Rename',
      click: () => {
        setIsEdit(true);
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Slide',
      click: () => {
        console.log('remove Slide');
      },
    },
  ];

  if (className) {
    classes += ` ${className}`;
  }

  if (isActive) {
    classes += ` ${css.active}`;
  }

  const handleSetActiveSlide = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setActiveSlide({
      slide,
      slideIdx,
    });
  };

  const handleOpenSlideMenu = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    menu.API.contextMenu(slideMenuItems, position).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  const handleNameChange = (val) => {
    const updateData = {
      ...slide,
      name: val,
      slideIdx,
    };

    setActiveSlide(updateData);
    Projects.setSlide(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    const selectCurrentSlide = () => {
      setTimeout(() => {
        setActiveSlide({
          slide,
          slideIdx,
        });
      }, 250);
    };

    if (activeSlide.slideIdx === -1 && slideIdx === 0) {
      selectCurrentSlide();
    }
  }, [isActive, activeSlide.slideIdx, slideIdx]);

  return (
    <div className={css.outlineSlide} {...props}>
      <div className={classes}>
        <Button
          className={css.outlineItem}
          variant="link"
          onClick={handleSetActiveSlide}
          onContextMenu={handleOpenSlideMenu}
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
          <InputInlineText
            isEdit={isEdit}
            text={slide.name}
            onChange={handleNameChange}
            onBlur={handleNameClose}
          />
        </Button>
        <Button
          className={css.actionMenu}
          variant="ghost"
          onClick={handleOpenSlideMenu}
          onContextMenu={handleOpenSlideMenu}
        >
          <Icon display="rounded" icon="more_vert" opsz={20} filled />
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
  const handleAddSlide = () => {
    console.log('add slide');
  };

  if (className) {
    classes += `${className} `;
  }

  return (
    <div className={classes} {...props}>
      {slides.map((slide, idx) => {
        return <OutlineSlideItem key={idx} slide={slide} slideIdx={idx} />;
      })}
      <Button
        variant="link"
        className={css.outlineAdd}
        onClick={handleAddSlide}
      >
        <Icon icon="add" display="outlined" />
        <span>Add New Slide</span>
      </Button>
    </div>
  );
};

export default {
  OutlineSlides,
  OutlineSlideItem,
};
