import React from 'react';
import { Controller, ScrollDirection } from 'scrollmagic';
import { InputProps } from '../core.types';

export type TemplateSchemaContent = {
  [key: string]: InputProps;
};

export type TemplateSchemaMeta = {
  label: string;
  version: string;
  component: string;
  filename: string;
  tags?: Array<string>;
  icon?: string;
};

export type TemplateSchema = {
  meta: TemplateSchemaMeta;
  content: TemplateSchemaContent;
};

export type TemplateOnScrollEvent = {
  progress: ProgressEvent;
  stage: string;
  stageProgrogress: number;
};

export type TemplateOnStateChangeEvent = {
  state: 'visible' | 'hidden';
  direction: ScrollDirection;
};

export interface TemplateCommons {
  templateKey: string;
  duration: number;
  editMode?: boolean;
  ready?: boolean;
  focusElement?: any;
  validationErrors?: any;
  controller: Controller;
  onScroll?: (TemplateOnScrollEvent) => void;
  onStateChange?: (TemplateOnStateChangeEvent) => void;
};

export type TemplateProps = TemplateCommons & React.AllHTMLAttributes<HTMLDivElement>;