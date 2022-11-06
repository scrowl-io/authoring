import React from "react";
import { Projects } from '../../../../../../models';

export interface OutlineSlideItemCommons {
  slide:  Projects.ProjectSlide;
};

export type OutlineSlideItemProps = OutlineSlideItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineSlidesCommons {
  moduleId: number;
  lessonId: number;
};

export type OutlineSlidesProps = Partial<OutlineSlidesCommons> & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonItemCommons {
  lesson: Projects.ProjectLesson;
};

export type OutlineLessonItemProps = OutlineLessonItemCommons & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineLessonsCommons {
  moduleId: number;
};

export type OutlineLessonsProps = Partial<OutlineLessonsCommons> & React.HTMLAttributes<HTMLDivElement>;

export interface OutlineModuleItemCommons {
  module: Projects.ProjectModule;
};

export type OutlineModuleItemProps = OutlineModuleItemCommons & React.HTMLAttributes<HTMLDivElement>;

export type OutlineModulesProps = React.HTMLAttributes<HTMLDivElement>;
