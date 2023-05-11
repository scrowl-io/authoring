import React, { useEffect, useRef } from 'react';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import {
  useActiveSlide,
  resetActiveSlide,
} from '../../../../page-workspace-hooks';
import { OutlineModules } from './';
import { getContainer } from './utils';
import { events, menu, sys } from '../../../../../../services';

export const Outline = () => {
  const draggable = useRef<HTMLDivElement>();
  const defaultId = '-1';
  const activeSlide = useActiveSlide() as Projects.ProjectSlide;
  const project = Projects.useData();

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    const appNode = document.getElementById('app');

    if (!appNode) {
      return;
    }

    const target = ev.target as HTMLDivElement;
    const ghostElm = target.cloneNode(true) as HTMLDivElement;
    const type = target.dataset.outlineType;
    let data: {
      type?: string;
      id?: number;
      lessonId?: number;
      moduleId?: number;
    } = {
      type: type,
    };

    switch (type) {
      case 'slide':
        data.id = parseInt(target.dataset.slideId || defaultId);
        data.lessonId = parseInt(target.dataset.lessonId || defaultId);
        data.moduleId = parseInt(target.dataset.moduleId || defaultId);
        break;
      case 'lesson':
        data.id = parseInt(target.dataset.lessonId || defaultId);
        data.moduleId = parseInt(target.dataset.moduleId || defaultId);
        break;
      case 'module':
        data.id = parseInt(target.dataset.moduleId || defaultId);
        break;
    }

    ev.dataTransfer.setData('text/plain', JSON.stringify(data));
    ev.dataTransfer.effectAllowed = 'link';
    ghostElm.classList.add(css.draggableOutlineItem);
    appNode.appendChild(ghostElm);
    ghostElm.style.width = window.getComputedStyle(target).width;
    draggable.current = ghostElm;
    ev.dataTransfer.setDragImage(ghostElm, 0, 0);
  };

  const handleValidDragTarget = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    const type = draggable.current.dataset.outlineType;
    const target = ev.target as HTMLDivElement;
    let container;
    let highlightItem;
    let dropIndicatorClass;
    const moveFrom: {
      id?: number;
      lessonId?: number;
      moduleId?: number;
    } = {};

    switch (type) {
      case 'slide':
        container = getContainer(target, 'outline-list-slide');
        highlightItem = getContainer(target, 'outline-item__slide');
        dropIndicatorClass = css.draggableIndicatorSlide;
        moveFrom.id = parseInt(draggable.current.dataset.slideId || defaultId);
        moveFrom.lessonId = parseInt(
          draggable.current.dataset.lessonId || defaultId
        );
        moveFrom.moduleId = parseInt(
          draggable.current.dataset.moduleId || defaultId
        );
        break;
      case 'lesson':
        container = getContainer(target, 'outline-list-lesson');
        highlightItem = getContainer(target, 'outline-item__lesson');
        dropIndicatorClass = css.draggableIndicatorLesson;
        moveFrom.id = parseInt(draggable.current.dataset.lessonId || defaultId);
        moveFrom.moduleId = parseInt(
          draggable.current.dataset.moduleId || defaultId
        );
        break;
      case 'module':
        container = getContainer(target, 'outline-list-module');
        highlightItem = getContainer(target, 'outline-item__module');
        dropIndicatorClass = css.draggableIndicatorModule;
        moveFrom.id = parseInt(draggable.current.dataset.moduleId || defaultId);
        break;
    }

    const moveTarget = getContainer(highlightItem, 'inline-input', true);
    const moveTo: {
      id?: number;
      lessonId?: number;
      moduleId?: number;
    } = {};

    if (moveTarget) {
      switch (type) {
        case 'slide':
          moveTo.id = parseInt(moveTarget.dataset.slideId || defaultId);
          moveTo.lessonId = parseInt(moveTarget.dataset.lessonId || defaultId);
          moveTo.moduleId = parseInt(moveTarget.dataset.moduleId || defaultId);
          break;
        case 'lesson':
          moveTo.id = parseInt(moveTarget.dataset.lessonId || defaultId);
          moveTo.moduleId = parseInt(moveTarget.dataset.moduleId || defaultId);
          break;
        case 'module':
          moveTo.id = parseInt(moveTarget.dataset.moduleId || defaultId);
          break;
      }
    }

    const isStartLocation = JSON.stringify(moveFrom) === JSON.stringify(moveTo);

    if (!isStartLocation && container && highlightItem) {
      ev.preventDefault();

      const indicator = document.getElementsByClassName(dropIndicatorClass)[0];

      if (indicator) {
        indicator.classList.remove(css.draggableIndicatorSlide);
      }

      highlightItem.classList.add(dropIndicatorClass);
    }
  };

  const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    const type = draggable.current.dataset.outlineType;
    let dropIndicatorClass;

    switch (type) {
      case 'slide':
        dropIndicatorClass = `.${css.draggableIndicatorSlide}`;
        break;
      case 'lesson':
        dropIndicatorClass = `.${css.draggableIndicatorLesson}`;
        break;
      case 'module':
        dropIndicatorClass = `.${css.draggableIndicatorModule}`;
        break;
    }

    const highlightItem = document.querySelector(dropIndicatorClass);

    if (highlightItem) {
      highlightItem.classList.remove(dropIndicatorClass.replace('.', ''));
    }
  };

  const handleDragDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    const moveFrom = JSON.parse(ev.dataTransfer.getData('text/plain'));
    const target = ev.target as HTMLDivElement;
    let container;
    let dropIndicatorClass;

    switch (moveFrom.type) {
      case 'slide':
        container = getContainer(target, 'outline-list-slide');
        dropIndicatorClass = `.${css.draggableIndicatorSlide}`;
        break;
      case 'lesson':
        container = getContainer(target, 'outline-list-lesson');
        dropIndicatorClass = `.${css.draggableIndicatorLesson}`;
        break;
      case 'module':
        container = getContainer(target, 'outline-list-module');
        dropIndicatorClass = `.${css.draggableIndicatorModule}`;
        break;
    }

    let moveTarget = document.querySelector(
      `${dropIndicatorClass} .inline-input`
    ) as HTMLDivElement;

    if (!moveTarget) {
      moveTarget = document.querySelector(
        `.${css.outlineAdd}${dropIndicatorClass}`
      ) as HTMLDivElement;
    }

    if (!container || !moveTarget) {
      return;
    }

    ev.preventDefault();

    const moveTo: {
      id?: number;
      lessonId?: number;
      moduleId?: number;
    } = {};
    let updateActiveSlide: boolean | { [key: string]: number } = false;

    switch (moveFrom.type) {
      case 'slide':
        moveTo.id = parseInt(moveTarget.dataset.slideId || defaultId);
        moveTo.lessonId = parseInt(moveTarget.dataset.lessonId || defaultId);
        moveTo.moduleId = parseInt(moveTarget.dataset.moduleId || defaultId);
        updateActiveSlide =
          activeSlide.moduleId === moveFrom.moduleId &&
          activeSlide.lessonId === moveFrom.lessonId &&
          activeSlide.id === moveFrom.id &&
          (activeSlide.moduleId !== moveTo.moduleId ||
            activeSlide.lessonId !== moveTo.lessonId)
            ? { moduleId: moveTo.moduleId, lessonId: moveTo.lessonId }
            : false;
        break;
      case 'lesson':
        moveTo.id = parseInt(moveTarget.dataset.lessonId || defaultId);
        moveTo.moduleId = parseInt(moveTarget.dataset.moduleId || defaultId);
        updateActiveSlide =
          activeSlide.moduleId === moveFrom.moduleId &&
          activeSlide.lessonId === moveFrom.id &&
          activeSlide.moduleId !== moveTo.moduleId
            ? { moduleId: moveTo.moduleId }
            : false;
        break;
      case 'module':
        moveTo.id = parseInt(moveTarget.dataset.moduleId || defaultId);
        break;
    }

    const highlightItem = document.querySelector(dropIndicatorClass);

    if (highlightItem) {
      highlightItem.classList.remove(dropIndicatorClass.replace('.', ''));
    }

    let outroSlide;
    if (project.slides) {
      outroSlide = project.slides[project.slides.length - 1];
    }

    if (
      project.type === 'assessment' &&
      project.slides &&
      (moveFrom.id === 0 || outroSlide.id === moveFrom.id)
    ) {
      return;
    }

    if (
      project.type === 'assessment' &&
      project.slides &&
      (moveTo.id === 0 || outroSlide.id === moveTo.id)
    ) {
      return;
    }

    Projects.moveOutlineItem({
      moveFrom,
      moveTo,
      updateActiveSlide,
    });
  };

  const handleDragEnd = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    handleDragLeave(ev);
    draggable.current.remove();
    draggable.current = undefined;
  };

  useEffect(() => {
    const handleSlideFocus = (ev: CustomEvent) => {
      const slideId = ev.detail;
      const slideNavItem = document.querySelector(
        'div[data-slide-id="' + slideId + '"]'
      );

      if (!slideNavItem) {
        return;
      }

      const slideContainer = slideNavItem.parentElement?.parentElement;

      if (!slideContainer) {
        return;
      }

      const lessonContainer =
        slideContainer.parentElement?.parentElement?.parentElement;

      if (!lessonContainer) {
        return;
      }

      const isCollapsed =
        slideContainer.className.indexOf('show') === -1 ||
        lessonContainer.className.indexOf('show') === -1;

      setTimeout(
        () => {
          slideNavItem.scrollIntoView();
        },
        isCollapsed ? 325 : 1
      );
    };

    events.slide.onFocus(handleSlideFocus);

    menu.API.onOutlineAddSlide(() => {
      Projects.addSlide({
        id: activeSlide.id,
        lessonId: activeSlide.lessonId,
        moduleId: activeSlide.moduleId,
      });
    });

    menu.API.onOutlineAddLesson(() => {
      Projects.addLesson({
        id: activeSlide.lessonId,
        moduleId: activeSlide.moduleId,
      });
    });

    menu.API.onOutlineAddModule(() => {
      Projects.addModule({
        id: -1,
      });
    });

    menu.API.onOutlineDuplicateSlide(() => {
      Projects.duplicateSlide(activeSlide);
    });

    menu.API.onOutlineRemoveSlide(() => {
      sys
        .messageDialog({
          message: 'Are you sure?',
          buttons: ['Delete Slide', 'Cancel'],
          detail: activeSlide.name,
        })
        .then((res) => {
          if (res.error) {
            console.error(res);
            return;
          }

          if (res.data.response === 0) {
            resetActiveSlide();
            Projects.removeSlide(activeSlide);
          }
        });
    });

    return () => {
      events.slide.offFocus(handleSlideFocus);
      menu.API.offOutlineAddSlide();
      menu.API.offOutlineAddLesson();
      menu.API.offOutlineAddModule();
      menu.API.offOutlineDuplicateSlide();
      menu.API.offOutlineRemoveSlide();
    };
  });

  return (
    <div
      className={css.tabOutline}
      onDragStart={handleDragStart}
      onDragOver={handleValidDragTarget}
      onDragEnter={handleValidDragTarget}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      onDragEnd={handleDragEnd}
    >
      <OutlineModules />
    </div>
  );
};

export default {
  Outline,
};
