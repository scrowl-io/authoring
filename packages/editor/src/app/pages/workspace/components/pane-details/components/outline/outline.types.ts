import React from "react";
import { Projects } from '../../../../../../models';

export interface OutlineSlideItemCommons {
  slide:  Projects.ProjectSlide;
  slideIdx: number;
};

export type OutlineSlideItemProps = OutlineSlideItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineSlidesCommons {
  moduleIdx: number;
  lessonIdx: number;
};

export type OutlineSlidesProps = Partial<OutlineSlidesCommons> & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonItemCommons {
  lesson: Projects.ProjectLesson;
  lessonIdx: number;
};

export type OutlineLessonItemProps = OutlineLessonItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonsCommons {
  moduleIdx: number;
};

export type OutlineLessonsProps = Partial<OutlineLessonsCommons> & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineModuleItemCommons {
  module: Projects.ProjectModule;
  moduleIdx: number;
};

export type OutlineModuleItemProps = OutlineModuleItemCommons & React.HTMLAttributes<HTMLDivElement>;

export type OutlineModulesProps = React.HTMLAttributes<HTMLDivElement>;
