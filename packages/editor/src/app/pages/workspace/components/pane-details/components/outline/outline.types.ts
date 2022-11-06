import React from "react";
import { Projects } from '../../../../../../models';

export interface OutlineSlideItemCommons {
  slide:  Projects.ProjectSlide;
  moduleIdx: number;
  lessonIdx: number;
  idx: number;
};

export type OutlineSlideItemProps = OutlineSlideItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineSlidesCommons {
  moduleId: number;
  lessonId: number;
  moduleIdx: number;
  lessonIdx: number;
};

export type OutlineSlidesProps = OutlineSlidesCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonItemCommons {
  lesson: Projects.ProjectLesson;
  moduleIdx: number;
  idx: number;
};

export type OutlineLessonItemProps = OutlineLessonItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonsCommons {
  moduleId: number;
  moduleIdx: number;
};

export type OutlineLessonsProps = OutlineLessonsCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineModuleItemCommons {
  module: Projects.ProjectModule;
  idx: number;
};

export type OutlineModuleItemProps = OutlineModuleItemCommons & React.HTMLAttributes<HTMLDivElement>;

export type OutlineModulesProps = React.HTMLAttributes<HTMLDivElement>;
