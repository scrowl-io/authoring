import { InputProps } from '@scrowl/template-core';

export type {
  InputProps,
  InputAssetProps,
  InputCheckboxProps,
  InputFieldsetProps,
  InputNumberSpinnerProps,
  InputSelectProps,
  InputTextboxProps,
  InputRadioProps,
  LAYOUT_INPUT_TYPE,
} from '@scrowl/template-core';

export interface InputFactoryCommons {
  field: string;
  content: InputProps,
  onChange: (field: string | Array<string>, value: any) => void;
  onValidate: (field: string | Array<string>, value: any) => void;
  onBlur: (field: string | Array<string>, value: any) => void;
  onFocus: (field: string | Array<string>, value: any) => void;
};

export type InputFactoryProps = InputFactoryCommons;
