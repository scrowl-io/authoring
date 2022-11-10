import React from 'react';
import { TemplateSchema } from '@scrowl/template-core';

export type {
  TemplateSchema
} from '@scrowl/template-core';

export type PlayerTemplateList = {
  [key: string]: () => JSX.Element;
};

export type ProjectMeta = {
  id: string;
  name: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
  tags: Array<string>;
  blueprint?: string;
  createdBy?: string;
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
  meta: Partial<ProjectMeta>,
  modules?: Array<ProjectModule>;
  lessons?: Array<ProjectLesson>;
  slides?: Array<ProjectSlide>;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResource>;
};

export interface PlayerRootCommons {
  project: ProjectData;
  templateList: PlayerTemplateList;
}

export type PlayerRootProps = PlayerRootCommons & React.AllHTMLAttributes<HTMLDivElement>;

// export interface PlayerRoutesCommons {
//   config: Array<Pages.PageDefinition>;
//   templateList?: PlayerTemplateList;
// }

// export type PlayerRoutesProps = PlayerRoutesCommons;