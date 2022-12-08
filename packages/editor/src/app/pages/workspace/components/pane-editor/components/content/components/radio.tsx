import React from 'react';
import { ui, IconType } from '@scrowl/ui';
import { InputRadioProps } from '../../../pane-editor.types';

export const Radio = ({
  field,
  type,
  value,
  options,
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
}: InputRadioProps) => {
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

  let inputClasses = 'form-check-input';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'radio',
    name: field,
    className: inputClasses,
    disabled,

    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      let val: string | number = ev.currentTarget.value;

      const isNumber = parseInt(val);

      if (!isNaN(isNumber)) {
        val = isNumber;
      }

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
      let val: string | number = ev.currentTarget.value;

      const isNumber = parseInt(val);

      if (!isNaN(isNumber)) {
        val = isNumber;
      }

      if (onValidate) {
        onValidate(field, val);
      }
      if (onBlur) {
        onBlur(field, val);
      }
    },

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      let val: string | number = ev.currentTarget.value;

      const isNumber = parseInt(val);

      if (!isNaN(isNumber)) {
        val = isNumber;
      }

      if (onFocus) {
        onFocus(field, val);
      }
    },
  };

  let controlClasses = 'control-radio-group mb-2';

  if (disabled) {
    controlClasses += ' disabled';
  }

  return (
    <div className={controlClasses} style={{ marginLeft: '5px' }}>
      <div className="form-radio">
        {options.map((radioOpt, idx) => {
          const id = `${field}-${radioOpt.value}`;
          const key = `${field}-${idx}`;
          const isChecked = radioOpt.value === value;
          const icon = radioOpt.icon as IconType;

          return (
            <label key={key} className="form-radio-control-item" htmlFor={id}>
              <input
                {...inputProps}
                id={id}
                checked={isChecked}
                value={radioOpt.value}
              />
              <div className="form-radio-label">
                {radioOpt.icon && (
                  <div className="form-radio-label__icon">
                    <ui.Icon icon={icon} />
                  </div>
                )}
                {radioOpt.label && (
                  <div className="form-radio-label__text">{radioOpt.label}</div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default {
  Radio,
};
