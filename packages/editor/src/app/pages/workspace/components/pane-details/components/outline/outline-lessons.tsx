import React from 'react';
import { OutlineLessonsProps, OutlineLessonItemProps } from './outline.types';
import { OutlineSlides } from './outline-slides';
import { Projects } from '../../../../../../models';

export const OutlineLessonItem = ({
  lesson,
  lessonIdx,
  ...props
}: OutlineLessonItemProps) => {
  return (
    <div {...props}>
      <div>{lesson.name}</div>
      <OutlineSlides moduleIdx={lesson.moduleIdx} lessonIdx={lessonIdx} />
    </div>
  );
};

export const OutlineLessons = ({
  moduleIdx,
  ...props
}: OutlineLessonsProps) => {
  const lessons = Projects.useLessons(moduleIdx);

  return (
    <div {...props}>
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
