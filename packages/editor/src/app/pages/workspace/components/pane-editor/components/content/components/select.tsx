import React from 'react';
import { Icon } from '@owlui/lib';
import { InputSelectProps } from '../../../pane-editor.types';
import { GroupElement } from './';

export const Select = ({
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
  options,
  iconFromValue,
  pre,
  post,
  ...props
}: InputSelectProps) => {
  const inputRef: any = React.useRef();
  const lastFocusState: any = React.useRef(false);
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;

  if (inputRef.current && lastFocusState.current !== focus) {
    lastFocusState.current = focus;

    if (focus) {
      inputRef.current.focus();
    }
  }

  let currentValue = value;

  if (!currentValue) {
    options.forEach((option) => {
      if (option.default) {
        currentValue = option.value;
      }
    });
  }

  let inputClasses = 'form-control form-control-sm';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className: inputClasses,
    value: currentValue,
    disabled: disabled,

    onChange: (ev: React.FormEvent<HTMLSelectElement>) => {
      const val = ev.currentTarget.value;

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

    onBlur: (ev: React.FocusEvent<HTMLSelectElement>) => {
      const val = ev.currentTarget.value;

      if (onValidate) {
        onValidate(field, val);
      }

      if (onBlur) {
        onBlur(field, val);
      }
    },

    onFocus: (ev: React.FocusEvent<HTMLSelectElement>) => {
      const val = ev.currentTarget.value;

      if (onFocus) {
        onFocus(field, val);
      }
    },
  };

  let groupClasses = 'input-group input-group-sm';
  let controlClasses = 'control-select mb-2 template-content-input';
  let icon = '';

  if (disabled) {
    controlClasses += ' disabled';
  }

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  if (iconFromValue) {
    options.forEach((opt) => {
      if (opt.value === value) {
        icon = opt.icon;
      }
    });
  }

  return (
    <div className={controlClasses}>
      <label className="form-label">{label}</label>
      <div className={groupClasses}>
        {!icon ? (
          <></>
        ) : (
          <span className="input-group-text pre">
            <Icon icon={icon} display="sharp" grad={200} opsz={20} />
          </span>
        )}
        {GroupElement('pre', pre)}
        <select {...inputProps}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {GroupElement('post', post)}
      </div>
      {isInvalid ? (
        <div className="invalid-feedback">{validationError}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default {
  Select,
};
