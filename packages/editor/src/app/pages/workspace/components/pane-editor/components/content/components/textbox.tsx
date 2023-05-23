import React, { useEffect, useRef } from 'react';
import { InputTextboxProps } from '../../../pane-editor.types';
import { useContentFocus } from '../../../../../page-workspace-hooks';

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

export const Textbox = ({
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
  checkbox,
  multiLine,
  autoGrow,
  lines,
  allowLinebreaks,
  maxLength,
  template,
  pre,
  post,
  focusRange,
  ...props
}: InputTextboxProps) => {
  const contentFocus = useContentFocus();
  const isFocused = contentFocus === field;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isDisabled = disabled;
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;
  const isDirty = useRef(false);
  const prevValue = useRef(value);
  let inputClasses = 'form-control form-control-sm';
  let groupClasses = 'input-group input-group-sm';
  let controlClasses = 'control-textbox mb-2 template-content-input';
  let inputId = '';

  if (field) {
    inputId = `input-checkbox-${field.replace(/\./g, '-')}`;
  }

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    id: inputId,
    ref: inputRef,
    type: 'text',
    className: inputClasses,
    value: value || '',
    placeholder: placeholder,
    disabled: isDisabled,
    maxLength: maxLength,
    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      let newValue = ev.currentTarget.value;

      if (allowLinebreaks !== true) {
        newValue = newValue.replace(/\n+/g, ' ');
      }

      if (onChange) {
        onChange(field, newValue);
      }

      isDirty.current = true;
    },
    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => {
      let newValue = ev.target.value;

      if (allowLinebreaks !== true) {
        newValue = newValue.replace(/\n+/g, ' ');
      } else {
        newValue = newValue.replace(/\n(\n+)/g, '\n\n');
      }

      newValue = newValue.trim();
      ev.target.scrollTop = 0;
      multiLine && autoSizeTextArea(ev.target, lines, lines);

      if (onValidate) {
        onValidate(field, newValue);
      }

      if (onBlur) {
        onBlur(field, newValue);
      }

      prevValue.current = newValue;
      isDirty.current = false;
    },
    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      const newValue = ev.target.value;

      multiLine && autoSizeTextArea(ev.target, lines, autoGrow);

      if (onFocus) {
        onFocus(field, newValue);
      }
    },
    onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === 'Enter') {
        if (multiLine && allowLinebreaks === true) {
          return;
        }

        ev.currentTarget.blur();
        return;
      } else if (ev.key === 'Escape') {
        if (onChange) {
          onChange(field, prevValue.current);
        }
        isDirty.current = false;
        return;
      }
    },
  };

  if (isDisabled) {
    controlClasses += ' disabled';
  }

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  useEffect(() => {
    multiLine && autoSizeTextArea(inputRef.current, lines, lines);
  }, [lines, multiLine]);

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [contentFocus, inputRef]);

  useEffect(() => {
    if (!isDirty) {
      prevValue.current = value;
    }
  }, [value, isDirty]);

  return (
    <div className={controlClasses}>
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <div className={groupClasses}>
        {multiLine ? <textarea {...inputProps} /> : <input {...inputProps} />}
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
  Textbox,
};
