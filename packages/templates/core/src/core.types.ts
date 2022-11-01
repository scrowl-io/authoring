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
  field?: string;
  hint?: MIGRATION_HINT;
  default?: any;
  disabled?: boolean;
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
  value?: string;
  placeholder?: string;
  assetType?: string;
}

export interface InputCheckboxProps extends BaseInputProps {
  type: 'Checkbox';
  value: boolean;
}

export interface InputNumberSpinnerProps extends BaseInputProps {
  type: 'NumberSpinner';
  value?: number;
  placeholder?: string;
  template?: string;
  min: number;
  max: number;
}

export interface InputSelectProps extends BaseInputProps {
  type: 'Select';
  options: any;
  value?: boolean | number | string | { [key: string]: boolean | number | string };
  pre?: any;
  post?: any;
  icon?: string;
  iconFromValue?: boolean;
}

export interface InputTextboxProps extends BaseInputProps {
  type: 'Textbox';
  value?: string;
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
}

export interface InputFieldsetProps extends BaseInputProps {
  type: 'Fieldset';
  content: {
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
