import React, { useRef } from 'react';
import * as css from '../../_pane-details.scss';
import { Projects } from '../../../../../../models';
import { OutlineModules } from './';
import { getContainer } from './utils';

export const Outline = () => {
  const draggable = useRef<HTMLDivElement>();
  const defaultId = '-1';

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
        dropIndicatorClass = css.draggableIndicatorSlide;
        break;
      case 'lesson':
        dropIndicatorClass = css.draggableIndicatorLesson;
        break;
      case 'module':
        dropIndicatorClass = css.draggableIndicatorModule;
        break;
    }

    const indicator = document.getElementsByClassName(dropIndicatorClass)[0];

    if (!indicator) {
      return;
    }

    indicator.classList.remove(css.draggableIndicatorSlide);
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

    const moveTarget = document.querySelector(
      `${dropIndicatorClass} .inline-input`
    ) as HTMLDivElement;

    if (!container || !moveTarget) {
      return;
    }

    ev.preventDefault();

    const moveTo: {
      id?: number;
      lessonId?: number;
      moduleId?: number;
    } = {};

    switch (moveFrom.type) {
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

    const highlightItem = document.querySelector(dropIndicatorClass);

    if (highlightItem) {
      highlightItem.classList.remove(dropIndicatorClass.replace('.', ''));
    }

    Projects.moveOutlineItem({
      moveFrom,
      moveTo,
    });
  };

  const handleDragEnd = (ev: React.DragEvent<HTMLDivElement>) => {
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

    draggable.current.remove();
    draggable.current = undefined;
  };

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
