import React from 'react';
import { Controller, ScrollDirection } from 'scrollmagic';
import { InputAssetProps, InputCheckboxProps, InputNumberSpinnerProps, InputSelectProps, InputTextboxProps, InputFieldsetProps } from '../core.types';

export type TemplateContent = {
  [key: string]:
  | InputAssetProps
  | InputCheckboxProps
  | InputNumberSpinnerProps
  | InputSelectProps
  | InputTextboxProps
  | InputFieldsetProps;
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