import React from 'react';
import { Controller, StartEvent, ProgressEvent, EndEvent, EnterEvent, LeaveEvent } from 'scrollmagic';
import { InputProps, InputCheckboxProps } from '../core.types';

export type TemplateSchemaContent = {
  [key: string]: InputProps;
};

export interface TemplateControlOptions {
  stopUserAdvancement: InputCheckboxProps;
  disableAnimations?: InputCheckboxProps;
}

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

export type SceneStats = {
  start: number;
  time: number;
  end: number;
  progress: number;
  rect: DOMRect;
  startingRect: DOMRect;
  currentTarget: HTMLElement;
};

export interface TemplateEventEnter extends EnterEvent {
  scene: SceneStats;
}

export interface TemplateEventStart extends StartEvent {
  scene: SceneStats;
}

export interface TemplateEventProgress extends ProgressEvent {
  scene: SceneStats;
}

export interface TemplateEventEnd extends EndEvent {
  scene: SceneStats;
}

export interface TemplateEventLeave extends LeaveEvent {
  scene: SceneStats;
}

export type ProjectSlide = {
  name: string;
  moduleId: number;
  lessonId: number;
  id: number;
  template: any;
};

export interface TemplateCommons {
  controller: Controller;
  pins?: Array<string>;
  duration?: number;
  editMode?: boolean;
  focusElement?: any;
  validationErrors?: any;
  notScene?: boolean;
  onEnter?: (ev: TemplateEventEnter) => void;
  onStart?: (ev: TemplateEventStart) => void;
  onProgress?: (ev: TemplateEventProgress) => void;
  onEnd?: (ev: TemplateEventEnd) => void;
  onLeave?: (ev: TemplateEventLeave) => void;
  slides?: ProjectSlide[];
}

export type TemplateProps = TemplateCommons & React.AllHTMLAttributes<HTMLDivElement>;