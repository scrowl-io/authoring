import React from 'react';
import { InputCheckboxProps } from '../../../pane-editor.types';

export const Checkbox = ({
  field,
  type,
  value,
  label,
  hint,
  disabled,
  focus,
  validationError,
  onChange,
  onValidate,
  onFocus,
  onBlur,
  ...props
}: InputCheckboxProps) => {
  const inputRef: any = React.useRef();
  const lastFocusState: any = React.useRef(false);
  const isChecked = value ? true : false;
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;
  let inputId = '';

  if (field) {
    inputId = `input-checkbox-${field.replace(/\./g, '-')}`;
  }

  if (inputRef.current && lastFocusState.current !== focus) {
    lastFocusState.current = focus;

    if (focus) {
      inputRef.current.focus();
    }
  }

  let inputClasses = 'form-check-input';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className: inputClasses,
    checked: isChecked,
    disabled,

    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.checked;

      if (onChange) {
        onChange(field, val);
      }
      if (onValidate) {
        onValidate(field, val);
      }
      if (onBlur) {
        onBlur(field, val);
      }
    },

    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.checked;

      if (onValidate) {
        onValidate(field, val);
      }
      if (onBlur) {
        onBlur(field, val);
      }
    },

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.checked;

      if (onFocus) {
        onFocus(field, val);
      }
    },
  };

  let controlClasses = 'control-checkbox mb-2';

  if (disabled) {
    controlClasses += ' disabled';
  }

  return (
    <div className={controlClasses} style={{ marginLeft: '5px' }}>
      <div className="form-check form-control-sm">
        <input id={inputId} {...inputProps} type="checkbox" />

        <label htmlFor={inputId} className="form-check-label">
          {label}
        </label>

        {isInvalid ? (
          <div className="invalid-feedback">{validationError}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default {
  Checkbox,
};
