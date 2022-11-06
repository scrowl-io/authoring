import React, { useState, useRef } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineLessonsProps, OutlineLessonItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineSlides } from './outline-slides';
import { Projects } from '../../../../../../models';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';
import { InputInlineText } from './input-inline-text';

export const OutlineLessonItem = ({
  lesson,
  lessonIdx,
  className,
  ...props
}: OutlineLessonItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-${lesson.moduleIdx}-lesson-menu-${lessonIdx}`;
  const [isEdit, setIsEdit] = useState(false);
  const draggable = useRef<HTMLDivElement | undefined>();
  const lessonMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Add Slide',
      click: () => {
        console.log('add slide');
      },
    },
    {
      label: 'Duplicate Lesson',
      click: () => {
        console.log('duplicate lesson');
      },
    },
    {
      label: 'Add New Lesson After',
      click: () => {
        console.log('add lesson after');
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
      label: 'Delete Lesson',
      click: () => {
        console.log('remove lesson');
      },
    },
  ];

  if (className) {
    classes += `${className} `;
  }

  const handleToggleOpen = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setOpen(!isOpen);
  };

  const handleOpenLessonMenu = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    menu.API.contextMenu(lessonMenuItems, position).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  const handleNameChange = (val) => {
    const updateData = {
      ...lesson,
      name: val,
      lessonIdx,
    };

    Projects.setLesson(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        type: 'lesson',
        moduleIdx: lesson.moduleIdx,
        lessonIdx,
      })
    );
    ev.dataTransfer.effectAllowed = 'link';
  };

  const inputContainerProps = {
    draggable: true,
    onDragStart: handleDragStart,
    'data-module-idx': lesson.moduleIdx,
    'data-lesson-idx': lessonIdx,
  };

  const handleDragDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.parse(ev.dataTransfer.getData('text/plain'));
    if (data.type !== 'slide') {
      return;
    }

    ev.preventDefault();

    console.log('data', data);
    const target = ev.target as HTMLDivElement;
    const container = getContainer(target, css.outlineSlide);

    if (container) {
      container.classList.remove(css.draggableIndicatorSlide);
    }
    // console.log('ev.currentTarget', ev.currentTarget); -> drop container
    // console.log('ev.target', ev.target); -> drop target
  };

  const getContainer = (target: HTMLElement | null, classTest: string) => {
    if (!target) {
      return;
    }

    if (!target.classList.contains(classTest)) {
      return getContainer(target.parentElement, classTest);
    }

    return target;
  };

  const handleDragEnter = (ev: React.DragEvent) => {
    const target = ev.target as HTMLDivElement;
    const container = getContainer(target, css.outlineSlide);

    ev.preventDefault();

    if (container) {
      container.classList.add(css.draggableIndicatorSlide);
      draggable.current = container;
    }
  };

  const handleDragLeave = (ev: React.DragEvent) => {
    const target = ev.target as HTMLDivElement;
    const containerSlide = getContainer(target, css.outlineSlide);

    if (!containerSlide) {
      const indicator = document.getElementsByClassName(
        css.draggableIndicatorSlide
      )[0];

      if (!indicator) {
        return;
      }

      indicator.classList.remove(css.draggableIndicatorSlide);
      return;
    }

    if (
      containerSlide &&
      !containerSlide.isSameNode(draggable.current) &&
      containerSlide.contains(target)
    ) {
      containerSlide.classList.remove(css.draggableIndicatorSlide);
      return;
    }
  };

  return (
    <div className={css.outlineLesson} {...props} onDragLeave={handleDragLeave}>
      <div className={classes}>
        <Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
          onContextMenu={handleOpenLessonMenu}
          variant="link"
        >
          <div className={css.lessonIcons}>
            <span className={css.outlineItemIconHandle}>
              <Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={css.outlineItemIconDetail}>
              <Icon
                icon="interests"
                display="sharp"
                filled={!isOpen}
                grad={200}
                opsz={20}
              />
            </span>
            <InputInlineText
              isEdit={isEdit}
              text={lesson.name}
              onChange={handleNameChange}
              onBlur={handleNameClose}
              containerProps={inputContainerProps}
            />
          </div>
        </Button>
        <Button
          className={css.actionMenu}
          variant="ghost"
          onClick={handleOpenLessonMenu}
          onContextMenu={handleOpenLessonMenu}
        >
          <Icon display="rounded" icon="more_vert" opsz={20} filled />
        </Button>
      </div>
      <Collapse in={isOpen}>
        <div>
          <OutlineSlides
            id={menuId}
            moduleIdx={lesson.moduleIdx}
            lessonIdx={lessonIdx}
            onDrop={handleDragDrop}
            onDragEnter={handleDragEnter}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const OutlineLessons = ({
  moduleIdx,
  className,
  ...props
}: OutlineLessonsProps) => {
  const lessons = Projects.useLessons(moduleIdx);
  let classes = `nav flex-column `;
  const handleAddLesson = () => {
    console.log('add lesson');
  };

  if (className) {
    classes += `${className} `;
  }

  return (
    <div className={classes} {...props}>
      {lessons.map((lesson, idx) => {
        return <OutlineLessonItem key={idx} lesson={lesson} lessonIdx={idx} />;
      })}
      <Button
        variant="link"
        className={css.outlineAdd}
        onClick={handleAddLesson}
      >
        <Icon icon="add" display="outlined" />
        <span>Add New Lesson</span>
      </Button>
    </div>
  );
};

export default {
  OutlineLessons,
  OutlineLessonItem,
};
