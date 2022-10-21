import React from 'react';

import {
  LAYOUT_INPUT_TYPE,
  InputCheckboxProps,
  DefaultInputProps,
} from '../pane-editor.types';

const defaultInputProps: InputCheckboxProps = {
  ...DefaultInputProps,

  type: LAYOUT_INPUT_TYPE.Checkbox,
  label: 'Checkbox',
};

export const Checkbox = (_props: InputCheckboxProps) => {
  const props: InputCheckboxProps = { ...defaultInputProps, ..._props };

  const inputRef: any = React.useRef();

  const lastFocusState: any = React.useRef(false);

  if (inputRef.current && lastFocusState.current !== props.focus) {
    lastFocusState.current = props.focus;

    if (props.focus) {
      inputRef.current.focus();
    }
  }

  const validationError: any = props.validationError;
  const isChecked = props.value ? true : false;

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className:
      'form-check-input ' + (validationError !== '' ? ' is-invalid ' : ''),
    checked: isChecked,
    disabled: props.disabled,

    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.value;

      props.onChange(val);
      props.onValidate(val);
      props.onBlur(val);
    },

    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.value;

      props.onValidate(val);
      props.onBlur(val);
    },

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.value;

      props.onFocus(val);
    },
  };

  return (
    <div
      className={'mb-2 ' + (props.disabled ? ' disabled ' : '')}
      style={{ marginLeft: '5px' }}
    >
      <div className="form-check form-control-sm">
        <input {...inputProps} type="checkbox" />

        <label className="form-check-label">{props.label}</label>

        {validationError !== '' ? (
          <div className="invalid-feedback">{validationError}</div>
        ) : null}
      </div>
    </div>
  );
};

export default {
  Checkbox,
};
