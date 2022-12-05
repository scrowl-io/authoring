import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@owlui/lib';
import { OutlineSlidesProps, OutlineSlideItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import {
  useActiveSlide,
  setActiveSlide,
  resetActiveSlide,
  useNewSlide,
} from '../../../../';
import { menu, sys } from '../../../../../../services';
import { InlineInput } from '../../../../../../components';

export const OutlineSlideItem = ({
  slide,
  moduleIdx,
  lessonIdx,
  idx,
  className,
  ...props
}: OutlineSlideItemProps) => {
  const activeSlide = useActiveSlide();
  const isFirstItem = moduleIdx === 0 && lessonIdx === 0 && idx === 0;
  const isActive =
    slide.moduleId === activeSlide.moduleId &&
    slide.lessonId === activeSlide.lessonId &&
    slide.id === activeSlide.id;
  let classes = `${css.outlineHeader} outline-item__slide`;
  const inputContainerProps = {
    draggable: true,
    'data-outline-type': 'slide',
    'data-slide-id': slide.id,
    'data-lesson-id': slide.lessonId,
    'data-module-id': slide.moduleId,
  };
  const [isEdit, setIsEdit] = useState(false);
  const isNewSlide = useNewSlide();
  const slideMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Duplicate Slide',
      click: () => {
        Projects.duplicateSlide(slide);
      },
    },
    {
      label: 'Add New Slide After',
      click: () => {
        Projects.addSlide({
          id: slide.id,
          lessonId: slide.lessonId,
          moduleId: slide.moduleId,
        });
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
        sys
          .messageDialog({
            message: 'Are you sure?',
            buttons: ['Delete Slide', 'Cancel'],
            detail: slide.name,
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            if (res.data.response === 0) {
              resetActiveSlide();
              Projects.removeSlide(slide);
            }
          });
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
    setActiveSlide(slide);
  };

  const handleOpenSlideMenu = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;

    menu.API.contextMenu(slideMenuItems).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  const handleNameChange = (val) => {
    const updateData = {
      ...slide,
      name: val,
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
        });
      }, 250);
    };

    if (!isNewSlide && activeSlide.id === -1 && isFirstItem) {
      selectCurrentSlide();
    }

    menu.API.onOutlineDuplicateSlide(() => {
      if (activeSlide.id !== slide.id) {
        return;
      }

      Projects.duplicateSlide(slide);
    });

    menu.API.onOutlineRenameSlide(() => {
      if (activeSlide.id !== slide.id) {
        return;
      }

      setIsEdit(true);
    });

    menu.API.onOutlineRemoveSlide(() => {
      if (activeSlide.id !== slide.id) {
        return;
      }

      sys
        .messageDialog({
          message: 'Are you sure?',
          buttons: ['Delete Slide', 'Cancel'],
          detail: slide.name,
        })
        .then((res) => {
          if (res.error) {
            console.error(res);
            return;
          }

          if (res.data.response === 0) {
            resetActiveSlide();
            Projects.removeSlide(slide);
          }
        });
    });

    return () => {
      menu.API.offOutlineDuplicateSlide();
      menu.API.offOutlineRenameSlide();
      menu.API.offOutlineRemoveSlide();
    };
  }, [isActive, activeSlide.id, isFirstItem, isNewSlide]);

  return (
    <div
      className={css.outlineSlide}
      {...props}
      data-module-id={slide.moduleId}
      data-lesson-id={slide.lessonId}
      data-slide-id={slide.id}
    >
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
          <InlineInput.Text
            isEdit={isEdit}
            text={slide.name}
            onChange={handleNameChange}
            onBlur={handleNameClose}
            containerProps={inputContainerProps}
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
  moduleId,
  moduleIdx,
  lessonId,
  lessonIdx,
  className,
  ...props
}: OutlineSlidesProps) => {
  const slides = Projects.useSlides(moduleId, lessonId);
  let classes = `nav flex-column outline-list-slide`;
  let addClasses = `${css.outlineAdd} outline-item__slide`;

  const handleAddSlide = () => {
    Projects.addSlide({
      id: -1,
      lessonId,
      moduleId,
    });
  };

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} {...props}>
      {slides.map((slide, idx) => {
        return (
          <OutlineSlideItem
            key={idx}
            slide={slide}
            moduleIdx={moduleIdx}
            lessonIdx={lessonIdx}
            idx={idx}
          />
        );
      })}
      <Button
        variant="link"
        className={addClasses}
        onClick={handleAddSlide}
        data-module-id={moduleId}
        data-lesson-id={lessonId}
        data-slide-id={-1}
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
