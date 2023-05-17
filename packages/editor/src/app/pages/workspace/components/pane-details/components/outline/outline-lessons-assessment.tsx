import React, { useEffect, useState } from 'react';
import { ui } from '@scrowl/ui';
import { Collapse } from 'react-bootstrap';
import { OutlineLessonsProps, OutlineLessonItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { resetActiveSlide, useActiveSlide } from '../../../../';
import { Projects } from '../../../../../../models';
import { menu, sys, events } from '../../../../../../services';
import { InlineInput } from '../../../../../../components';
import { AssessmentOutlineSlides } from './outline-slides-assessment';

export const AssessmentOutlineLessonItem = ({
  lesson,
  moduleIdx,
  idx,
  className,
  ...props
}: OutlineLessonItemProps) => {
  let classes = `${css.outlineHeader} outline-item__lesson`;
  const activeSlide = useActiveSlide() as Projects.ProjectSlide;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-${lesson.moduleId}-lesson-menu-${lesson.id}`;
  const [isEdit, setIsEdit] = useState(false);
  const inputContainerProps = {
    draggable: true,
    'data-outline-type': 'lesson',
    'data-lesson-id': lesson.id,
    'data-module-id': lesson.moduleId,
  };
  const lessonMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Add Slide',
      click: () => {
        Projects.addSlide({
          id: -1,
          lessonId: lesson.id,
          moduleId: lesson.moduleId,
          projectType: 'assessment',
        });
      },
    },
    {
      label: 'Duplicate Lesson',
      enabled: false,
      click: () => {
        Projects.duplicateLesson(lesson);
      },
    },
    {
      label: 'Add New Lesson After',
      enabled: false,
      click: () => {
        Projects.addLesson({
          id: lesson.id,
          moduleId: lesson.moduleId,
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
      label: 'Delete Lesson',
      click: () => {
        sys
          .messageDialog({
            message: 'Are you sure?',
            buttons: ['Delete Lesson', 'Cancel'],
            detail: lesson.name,
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            if (res.data.response === 0) {
              resetActiveSlide();
              Projects.removeModule(lesson);
            }
          });
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

    menu.API.contextMenu(lessonMenuItems).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  const handleNameChange = (val) => {
    const updateData = {
      ...lesson,
      name: val,
    };

    Projects.setLesson(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    const handleSlideFocus = (ev: CustomEvent) => {
      if (activeSlide.lessonId !== lesson.id) {
        return;
      }

      setOpen(true);
    };

    events.slide.onFocus(handleSlideFocus);

    return () => {
      events.slide.offFocus(handleSlideFocus);
    };
  }, [activeSlide.id]);

  return (
    <div
      className={css.outlineLesson}
      {...props}
      data-module-id={lesson.moduleId}
      data-lesson-id={lesson.id}
    >
      <div className={classes}>
        <ui.Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
          onContextMenu={handleOpenLessonMenu}
          variant="link"
        >
          <div className={css.lessonIcons}>
            <span className={css.outlineItemIconHandle}>
              <ui.Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={css.outlineItemIconDetail}>
              <ui.Icon
                icon="interests"
                display="sharp"
                filled={!isOpen}
                grad={200}
                opsz={20}
              />
            </span>
            <InlineInput.Text
              isEdit={isEdit}
              text={lesson.name}
              onChange={handleNameChange}
              onBlur={handleNameClose}
              containerProps={inputContainerProps}
            />
          </div>
        </ui.Button>
        <ui.Button
          className={css.actionMenu}
          variant="ghost"
          onClick={handleOpenLessonMenu}
          onContextMenu={handleOpenLessonMenu}
        >
          <ui.Icon display="rounded" icon="more_vert" opsz={20} filled />
        </ui.Button>
      </div>
      <Collapse in={isOpen}>
        <div>
          <AssessmentOutlineSlides
            id={menuId}
            moduleId={lesson.moduleId}
            moduleIdx={moduleIdx}
            lessonId={lesson.id}
            lessonIdx={idx}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const AssessmentOutlineLessons = ({
  moduleId,
  moduleIdx,
  className,
  ...props
}: OutlineLessonsProps) => {
  const lessons = Projects.useLessons(moduleId);
  let classes = `nav flex-column outline-list-lesson`;

  if (className) {
    classes += `${className} `;
  }

  return (
    <div className={classes} {...props}>
      {lessons.map((lesson, idx) => {
        return (
          <AssessmentOutlineLessonItem
            key={idx}
            lesson={lesson}
            moduleIdx={moduleIdx}
            idx={idx}
          />
        );
      })}
    </div>
  );
};

export default {
  AssessmentOutlineLessons,
  AssessmentOutlineLessonItem,
};
