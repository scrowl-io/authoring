import React from 'react';
import { Controller, ProgressEvent, ScrollDirection } from 'scrollmagic';

export enum LAYOUT_INPUT_TYPE {
  Fieldset,
  Asset,
  Checkbox,
  NumberSpinner,
  Select,
  Textbox,
}

export enum MIGRATION_HINT {
  Header,
  SubHeader,
  BodyText,
  BodyAlignment,
  BulletPointList,
  BulletPointCount,
  BulletPoint,
  Address,
  Hero,
  Time,
}

export interface BaseInputProps {
  label: string;
  hint?: MIGRATION_HINT;
  default?: any;
  disabled?: boolean;
  value?: any;
  focus?: boolean;
  validationError?: string;
  // Events
  onChange?: Function;
  onValidate?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

export interface InputAssetProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Asset;
  placeholder?: string;
  assetType?: string;
  value?: string;
}

export interface InputCheckboxProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Checkbox;
  value?: boolean;
}

export interface InputNumberSpinnerProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.NumberSpinner;
  placeholder?: string;
  template?: string;
  min: number;
  max: number;
  value?: number;
}

export interface InputSelectProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Select;
  options?: any;
  pre?: any;
  post?: any;
  value?: boolean | number | string | { [key: string]: boolean | number | string };
}

export interface InputTextboxProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Textbox;
  placeholder?: string;
  checkbox?: boolean;
  multiLine?: boolean;
  autoGrow?: number; // Max number of lines to auto-grow to
  lines?: number; // The initial number of lines to show
  allowLinebreaks?: boolean;
  maxLength?: number;
  template?: string;
  pre?: any;
  post?: any;
  focusRange?: [number, number];
  value?: string;
}

export interface InputFieldsetProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Fieldset;
  name?: string;
  skinny?: boolean;
  revertErrors?: boolean;
  fields: {
    [key: string]:
      | InputAssetProps
      | InputCheckboxProps
      | InputNumberSpinnerProps
      | InputSelectProps
      | InputTextboxProps
    };
}

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
