import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineLessonsProps, OutlineLessonItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineSlides } from './outline-slides';
import { Projects } from '../../../../../../models';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';

export const OutlineLessonItem = ({
  lesson,
  lessonIdx,
  className,
  ...props
}: OutlineLessonItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-${lesson.moduleIdx}-lesson-menu-${lessonIdx}`;
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
        console.log('rename lesson');
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

  return (
    <div className={css.outlineLesson} {...props}>
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
            <span className={css.outlineItemLabel}>{lesson.name}</span>
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
