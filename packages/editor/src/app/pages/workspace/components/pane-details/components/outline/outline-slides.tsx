import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon } from '@owlui/lib';
import { OutlineSlidesProps, OutlineSlideItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import { useActiveSlide, setActiveSlide, resetActiveSlide } from '../../../../';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';
import { InputInlineText } from './input-inline-text';

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
  let classes = `${css.outlineHeader}`;
  const draggable = useRef<HTMLDivElement | undefined>();
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
        resetActiveSlide();
        Projects.removeSlide(slide);
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
    };

    setActiveSlide(updateData);
    Projects.setSlide(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        type: 'slide',
        moduleId: slide.moduleId,
        lessonId: slide.lessonId,
        id: slide.id,
      })
    );
    ev.dataTransfer.effectAllowed = 'link';
    const target = ev.target as HTMLDivElement;
    const ghostElm = target.cloneNode(true) as HTMLDivElement;
    const appNode = document.getElementById('app');

    if (!appNode) {
      return;
    }

    ghostElm.classList.add(css.draggableOutlineItem);
    appNode.appendChild(ghostElm);
    ghostElm.style.width = window.getComputedStyle(target).width;
    draggable.current = ghostElm;
    ev.dataTransfer.setDragImage(ghostElm, 0, 0);
  };

  const handleDragEnd = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    draggable.current.remove();
    draggable.current = undefined;
  };

  const getListContainer = (target: HTMLElement | null, classTest: string) => {
    if (!target) {
      return;
    }

    if (!target.classList.contains(classTest)) {
      return getListContainer(target.parentElement, classTest);
    }

    return target;
  };

  const handleValidDragTarget = (ev: React.DragEvent<HTMLDivElement>) => {
    const target = ev.target as HTMLDivElement;
    const container = getListContainer(target, 'outline-list-slide');

    if (container) {
      ev.preventDefault();
      container.classList.add(css.draggableIndicatorSlide);
    }
  };

  const inputContainerProps = {
    draggable: true,
    onDragStart: handleDragStart,
    onDragOver: handleValidDragTarget,
    onDragEnter: handleValidDragTarget,
    onDragEnd: handleDragEnd,
    'data-module-id': slide.moduleId,
    'data-lesson-id': slide.lessonId,
    'data-slide-id': slide.id,
  };

  useEffect(() => {
    const selectCurrentSlide = () => {
      setTimeout(() => {
        setActiveSlide({
          slide,
        });
      }, 250);
    };

    if (activeSlide.id === -1 && isFirstItem) {
      selectCurrentSlide();
    }
  }, [isActive, activeSlide.id, isFirstItem]);

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
          <InputInlineText
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

  const handleAddSlide = () => {
    console.log('add slide');
  };

  if (className) {
    classes += `${className} `;
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
