export type LAYOUT_INPUT_TYPE =
  | 'Fieldset'
  | 'Asset'
  | 'Checkbox'
  | 'NumberSpinner'
  | 'Select'
  | 'Textbox';

export type MIGRATION_HINT =
  | 'Header'
  | 'SubHeader'
  | 'BodyText'
  | 'BodyAlignment'
  | 'BulletPointList'
  | 'BulletPointCount'
  | 'BulletPoint'
  | 'Address'
  | 'Hero'
  | 'Time';

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
  type: 'Asset';
  placeholder?: string;
  assetType?: string;
  value?: string;
}

export interface InputCheckboxProps extends BaseInputProps {
  type: 'Checkbox';
  value?: boolean;
}

export interface InputNumberSpinnerProps extends BaseInputProps {
  type: 'NumberSpinner';
  placeholder?: string;
  template?: string;
  min: number;
  max: number;
  value?: number;
}

export interface InputSelectProps extends BaseInputProps {
  type: 'Select';
  options?: any;
  pre?: any;
  post?: any;
  value?: boolean | number | string | { [key: string]: boolean | number | string };
}

export interface InputTextboxProps extends BaseInputProps {
  type: 'Textbox';
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
  type: 'Fieldset';
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

export type InputProps =
  | InputAssetProps
  | InputCheckboxProps
  | InputNumberSpinnerProps
  | InputSelectProps
  | InputTextboxProps
  | InputFieldsetProps;
