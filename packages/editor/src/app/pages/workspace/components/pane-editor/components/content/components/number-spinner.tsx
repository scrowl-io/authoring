import React from 'react';
import { InputNumberSpinnerProps } from '../../../pane-editor.types';
import { render } from './';

export const NumberSpinner = ({
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
  placeholder,
  template,
  min,
  max,
  ...props
}: InputNumberSpinnerProps) => {
  const inputRef: any = React.useRef();
  const lastFocusState: any = React.useRef(false);
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;

  React.useEffect(() => {}, []);

  if (inputRef.current && lastFocusState.current !== focus) {
    lastFocusState.current = focus;

    if (focus) {
      inputRef.current.focus();
    }
  }

  let cleanVal: string | number | undefined = value;

  if (cleanVal && template) {
    cleanVal = render(cleanVal, template);
  }

  let inputClasses = 'form-control form-control-sm';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className: inputClasses,
    disabled: disabled,
    value: cleanVal,

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      // Placeholder
    },

    onChange: (ev: React.FocusEvent<HTMLInputElement>) => {
      // Placeholder
    },
  };

  let minValue = parseInt(String(min)) || 1;
  let maxValue = parseInt(String(max)) || Number.POSITIVE_INFINITY;
  let groupClasses = 'input-group input-group-sm';
  let controlClasses = 'control-number-spinner mb-2';

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  return (
    <div className={controlClasses}>
      <label className="form-label">{label}</label>
      <div className={groupClasses}>
        <button
          style={{ width: '25%', maxWidth: '75px' }}
          className="btn btn-outline-primary pre"
          type="button"
          disabled={disabled}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            let cleanValue = parseInt(inputRef.current.value) - 1;
            if (cleanValue < minValue) {
              cleanValue = minValue;
            } else if (cleanValue > maxValue) {
              cleanValue = maxValue;
            }

            if (onChange) {
              onChange(field, cleanValue);
            }

            if (onValidate) {
              onValidate(cleanValue);
            }
          }}
          onMouseUp={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.currentTarget.blur();
          }}
        >
          <span
            style={{
              fontSize: '15px',
            }}
            className="material-symbols-sharp"
          >
            remove
          </span>
        </button>
        <input
          tabIndex="-1"
          style={{ pointerEvents: 'none', textAlign: 'center' }}
          {...inputProps}
        />
        <button
          style={{ width: '25%', maxWidth: '75px' }}
          className="btn btn-outline-primary post"
          type="button"
          disabled={disabled}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            let cleanValue = parseInt(inputRef.current.value) + 1;
            if (cleanValue < min) {
              cleanValue = min;
            } else if (cleanValue > max) {
              cleanValue = max;
            }

            if (onChange) {
              onChange(field, cleanValue);
            }

            if (onValidate) {
              onValidate(cleanValue);
            }
          }}
          onMouseUp={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.currentTarget.blur();
          }}
        >
          <span
            style={{
              fontSize: '15px',
            }}
            className="material-symbols-sharp"
          >
            add
          </span>
        </button>
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
  NumberSpinner,
};
