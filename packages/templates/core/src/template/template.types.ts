import React from 'react';
import { Controller, ScrollDirection, StartEvent, ProgressEvent, EndEvent } from 'scrollmagic';
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
  controller: Controller;
  pins?: Array<string>;
  duration?: number;
  editMode?: boolean;
  focusElement?: any;
  validationErrors?: any;
  onStart?: (ev: StartEvent) => void;
  onProgress?: (ev: ProgressEvent) => void;
  onEnd?: (ev: EndEvent) => void;
};

export type TemplateProps = TemplateCommons & React.AllHTMLAttributes<HTMLDivElement>;