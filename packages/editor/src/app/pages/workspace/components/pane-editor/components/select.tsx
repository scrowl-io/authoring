import React from 'react';
import {
  LAYOUT_INPUT_TYPE,
  BaseInputProps,
  DefaultInputProps,
} from '../pane-editor.types';
import { GroupElement } from './';

export interface InputSelectProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Select;
  options?: any;
  pre?: any;
  post?: any;
}

const defaultInputProps: InputSelectProps = {
  ...DefaultInputProps,

  type: LAYOUT_INPUT_TYPE.Select,
  label: 'Select Label',
  options: [],
};

export const Select = (_props: InputSelectProps) => {
  const props: InputSelectProps = { ...defaultInputProps, ..._props };

  const inputRef: any = React.useRef();

  const lastFocusState: any = React.useRef(false);

  if (inputRef.current && lastFocusState.current !== props.focus) {
    lastFocusState.current = props.focus;

    if (props.focus) {
      inputRef.current.focus();
    }
  }

  const validationError: any = props.validationError;

  let currentValue = props.value;
  if (!currentValue) {
    props.options.forEach((option) => {
      if (option.default) {
        currentValue = option.value;
      }
    });
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className:
      'form-control form-control-sm' +
      (validationError !== '' ? ' is-invalid ' : ''),

    value: currentValue,
    disabled: props.disabled,

    onChange: (ev: React.FormEvent<HTMLSelectElement>) => {
      props.onChange(ev.currentTarget.value);
      props.onValidate(ev.currentTarget.value);
      props.onBlur(ev.currentTarget.value);
    },

    onBlur: (ev: React.FocusEvent<HTMLSelectElement>) => {
      props.onValidate(ev.target.value);
      props.onBlur(ev.target.value);
    },

    onFocus: (ev: React.FocusEvent<HTMLSelectElement>) => {
      props.onFocus(ev.target.value);
    },
  };

  return (
    <div
      className={
        'mb-2 template-content-input ' + (props.disabled ? ' disabled ' : '')
      }
    >
      <label className="form-label">{props.label}</label>
      <div
        className={
          'input-group input-group-sm ' +
          (validationError !== '' ? 'is-invalid' : '')
        }
      >
        {GroupElement('pre', props.pre)}
        <select {...inputProps}>
          {props.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {GroupElement('post', props.post)}
      </div>
      {validationError !== '' ? (
        <div className="invalid-feedback">{validationError}</div>
      ) : null}
    </div>
  );
};

export default {
  Select,
};
