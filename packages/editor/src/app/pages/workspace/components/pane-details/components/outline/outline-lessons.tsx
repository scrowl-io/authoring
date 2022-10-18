import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineLessonsProps, OutlineLessonItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineSlides } from './outline-slides';
import { Projects } from '../../../../../../models';

export const OutlineLessonItem = ({
  lesson,
  lessonIdx,
  className,
  ...props
}: OutlineLessonItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-${lesson.moduleIdx}-lesson-menu-${lessonIdx}`;

  if (className) {
    classes += `${className} `;
  }

  const handleToggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={css.outlineLesson} {...props}>
      <div className={classes}>
        <Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
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

  if (className) {
    classes += `${className} `;
  }

  return (
    <div className={classes} {...props}>
      {lessons.map((lesson, idx) => {
        return <OutlineLessonItem key={idx} lesson={lesson} lessonIdx={idx} />;
      })}
    </div>
  );
};

export default {
  OutlineLessons,
  OutlineLessonItem,
};
