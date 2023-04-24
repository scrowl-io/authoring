import React from 'react';
import { TemplateSchema } from '@scrowl/template-core';
import { BlockTextProps } from '@scrowl/template-block-text';
import { LessonIntroProps } from '@scrowl/template-lesson-intro';
import { LessonOutroProps } from '@scrowl/template-lesson-outro';
import { SimpleTextProps } from '@scrowl/template-simple-text';
import { TwoColumnProps } from '@scrowl/template-two-column';

export type {
  TemplateSchema,
  BlockTextProps,
  LessonIntroProps,
  LessonOutroProps,
  SimpleTextProps,
  TwoColumnProps,
};

export type TemplateElementProps = BlockTextProps | LessonIntroProps | SimpleTextProps | TwoColumnProps;

export type TemplateComponent = (TemplateElementProps) => JSX.Element;

export type PlayerTemplateList = {
  [key: string]: TemplateComponent;
};

export type ProjectAsset = {
  filname: string;
  isDeleted?: boolean;
};

export type ProjectModule = {
  id: number;
  name: string;
};

export type ProjectLesson = {
  name: string;
  moduleId: number;
  id: number;
};

export type ProjectSlide = {
  name: string;
  moduleId: number;
  lessonId: number;
  id: number;
  template: TemplateSchema;
};

export type ProjectGlossaryItem = {
  id: number;
  word: string;
  definition: string;
};

export type ProjectResource = {
  id: number;
  filename: string;
  title: string;
  description?: string;
};

export type ProjectData = {
  name?: string;
  subtitle?: string;
  modules?: Array<ProjectModule>;
  lessons?: Array<ProjectLesson>;
  slides?: Array<ProjectSlide>;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResource>;
};

export type ScormData = {
  authors?: string;
  description?: string;
  identifier?: string;
  name?: string;
  optimizeMedia?: string;
  organization?: string;
  outputFormat?: string;
  reportStatus?: string;
};

export interface PlayerRootCommons {
  project: ProjectData;
  templateList: PlayerTemplateList;
  scorm: ScormData;
}

export type PlayerRootProps = PlayerRootCommons &
  React.AllHTMLAttributes<HTMLDivElement>;

export type PlayerRootConfig = {
  module: ProjectModule;
  lessons: Array<{
    lesson: ProjectLesson;
    slides: Array<ProjectSlide>;
  }>;
};
