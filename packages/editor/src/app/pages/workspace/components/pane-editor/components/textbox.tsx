import React from 'react';
import {
  LAYOUT_INPUT_TYPE,
  BaseInputProps,
  DefaultInputProps,
} from '../pane-editor.types';
import { GroupElement } from './group-element';
import { render } from './templater';

export interface InputTextboxProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Textbox;
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

const defaultInputProps: InputTextboxProps = {
  ...DefaultInputProps,

  type: LAYOUT_INPUT_TYPE.Textbox,
  label: 'Input Label',
  placeholder: 'Enter a value...',

  multiLine: false,
  autoGrow: 5,
  lines: 3,
  allowLinebreaks: false,
  maxLength: 1500,

  checkbox: false,
};

function autoSizeTextArea(textarea, minLines, maxLines) {
  const computedStyle = getComputedStyle(textarea);
  const lineHeight = parseFloat(computedStyle.getPropertyValue('line-height'));

  const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'));
  const paddingBottom = parseFloat(
    computedStyle.getPropertyValue('padding-bottom')
  );
  const padding = paddingTop + paddingBottom + 2;

  const minHeight = lineHeight * Math.max(minLines, 1) + padding;
  const maxHeight = lineHeight * Math.max(maxLines, 1) + padding;

  textarea.style.height = '';
  textarea.style.height =
    Math.min(Math.max(minHeight, textarea.scrollHeight + 2), maxHeight) + 'px';
}

export const Textbox = (_props: InputTextboxProps) => {
  const props: InputTextboxProps = { ...defaultInputProps, ..._props };

  const inputRef: any = React.useRef();
  const [revertValue, setRevertValue]: any = React.useState(null);
  const lastFocusState: any = React.useRef(false);

  React.useEffect(() => {
    props.multiLine &&
      autoSizeTextArea(inputRef.current, props.lines, props.lines);
  }, [props.lines, props.multiLine]);

  if (inputRef.current && lastFocusState.current !== props.focus) {
    lastFocusState.current = props.focus;

    if (props.focus) {
      inputRef.current.focus();
    }
  }

  const validationError: any = props.validationError;

  const isChecked = !props.value.startsWith('disabled::');

  let cleanVal = props.value;
  if (cleanVal.startsWith('disabled::')) {
    cleanVal = cleanVal.substring(10);
  }

  if (revertValue === null) {
    if (cleanVal && props.template) {
      cleanVal = render(cleanVal, props.template);
    }
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className:
      'form-control form-control-sm' +
      (validationError !== '' ? ' is-invalid ' : ''),

    value: cleanVal,
    placeholder: props.placeholder,
    disabled: props.disabled || !isChecked,

    maxLength: props.maxLength,

    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      if (props.allowLinebreaks !== true) {
        // Likely to happen during a paste
        const regex = /\n+/g;
        ev.currentTarget.value = ev.currentTarget.value.replace(regex, ' ');
      }

      const checkedValue =
        (isChecked ? '' : 'disabled::') + ev.currentTarget.value;
      props.onChange(checkedValue);
    },

    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => {
      let bestValue = ev.target.value;
      if (props.allowLinebreaks !== true) {
        const regex = /\n+/g;
        bestValue = bestValue.replace(regex, ' ');
      } else {
        const regex = /\n(\n+)/g;
        bestValue = bestValue.replace(regex, '\n\n');
      }

      bestValue = bestValue.trim();

      ev.target.scrollTop = 0;

      props.multiLine && autoSizeTextArea(ev.target, props.lines, props.lines);

      const checkedValue = (isChecked ? '' : 'disabled::') + bestValue;
      props.onValidate(checkedValue);

      props.onBlur(checkedValue);

      setRevertValue(null);
    },

    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      props.multiLine &&
        autoSizeTextArea(ev.target, props.lines, props.autoGrow);

      props.onFocus(ev.target.value);
      setRevertValue(ev.target.value);
    },

    onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === 'Enter') {
        if (props.multiLine && props.allowLinebreaks === true) {
          return;
        }

        ev.currentTarget.blur();
        ev.preventDefault();
        return;
      } else if (ev.key === 'Escape') {
        props.onChange(revertValue ? revertValue : '');
        ev.currentTarget.blur();
        ev.preventDefault();
        return;
      }
    },

    onInput: (e: any) => {
      if (props.allowLinebreaks !== true) {
        const regex = /\n+/g;
        e.target.value = e.target.value.replace(regex, ' ');
      }

      props.multiLine &&
        autoSizeTextArea(e.target, props.lines, props.autoGrow);
    },
  };

  return (
    <div
      className={
        'mb-2 template-content-input ' +
        (props.disabled || (props.checkbox && !isChecked) ? ' disabled ' : '')
      }
    >
      <label className="form-label">{props.label}</label>
      <div
        className={
          'input-group input-group-sm ' +
          (validationError !== '' ? 'is-invalid' : '')
        }
      >
        {props.checkbox ? (
          <div className="input-group-text checkbox pre">
            <input
              disabled={props.disabled}
              checked={isChecked}
              className="form-check-input form-check-input-sm"
              type="checkbox"
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                let cleanVal = inputRef.current.value;
                if (cleanVal.startsWith('disabled::')) {
                  cleanVal = cleanVal.substring(10);
                }
                if (isChecked) {
                  props.onChange('disabled::' + cleanVal);
                } else {
                  props.onChange(cleanVal);
                }

                inputProps.onBlur({ target: inputRef.current });
              }}
            />
          </div>
        ) : (
          GroupElement('pre', props.pre)
        )}
        {props.multiLine ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        {GroupElement('post', props.post)}
      </div>
      {validationError !== '' ? (
        <div className="invalid-feedback">{validationError}</div>
      ) : null}
    </div>
  );
};

export default {
  Textbox,
};
