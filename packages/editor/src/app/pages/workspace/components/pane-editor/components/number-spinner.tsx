import React from 'react';
import {
  LAYOUT_INPUT_TYPE,
  BaseInputProps,
  DefaultInputProps,
} from '../pane-editor.types';
import { render } from './';

export interface InputProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.NumberSpinner;
  placeholder?: string;
  template?: string;

  min: number;
  max: number;
}

const defaultInputProps: InputProps = {
  ...DefaultInputProps,

  type: LAYOUT_INPUT_TYPE.NumberSpinner,
  label: 'Input Label',
  placeholder: 'Enter a value...',

  min: 0,
  max: 100,
};

export const NumberSpinner = (_props: InputProps) => {
  const props: InputProps = { ...defaultInputProps, ..._props };

  const inputRef: any = React.useRef();
  const lastFocusState: any = React.useRef(false);

  React.useEffect(() => {}, []);

  if (inputRef.current && lastFocusState.current !== props.focus) {
    lastFocusState.current = props.focus;

    if (props.focus) {
      inputRef.current.focus();
    }
  }

  let cleanVal = props.value;
  if (cleanVal && props.template) {
    cleanVal = render(cleanVal, props.template);
  }

  const validationError: any = props.validationError;

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className:
      'form-control form-control-sm ' +
      (validationError !== '' ? 'is-invalid' : ''),
    disabled: props.disabled,
    value: cleanVal,

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      // Placeholder
    },

    onChange: (ev: React.FocusEvent<HTMLInputElement>) => {
      // Placeholder
    },
  };

  let minValue = parseInt(String(props.min)) || 1;
  let maxValue = parseInt(String(props.max)) || Number.POSITIVE_INFINITY;

  return (
    <div className={'mb-2'}>
      <label className="form-label">{props.label}</label>
      <div
        className={
          'input-group input-group-sm ' +
          (validationError !== '' ? 'is-invalid' : '')
        }
      >
        <button
          style={{ width: '25%', maxWidth: '75px' }}
          className="btn btn-outline-primary pre"
          type="button"
          disabled={props.disabled}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            let cleanValue = parseInt(inputRef.current.value) - 1;
            if (cleanValue < minValue) {
              cleanValue = minValue;
            } else if (cleanValue > maxValue) {
              cleanValue = maxValue;
            }
            props.onChange(cleanValue);
            props.onValidate(cleanValue);
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
          disabled={props.disabled}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            let cleanValue = parseInt(inputRef.current.value) + 1;
            if (cleanValue < props.min) {
              cleanValue = props.min;
            } else if (cleanValue > props.max) {
              cleanValue = props.max;
            }
            props.onChange(cleanValue);
            props.onValidate(cleanValue);
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
      {validationError !== '' ? (
        <div className="invalid-feedback">{validationError}</div>
      ) : null}
    </div>
  );
};

export default {
  NumberSpinner,
};
