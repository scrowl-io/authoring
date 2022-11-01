import React from 'react';
import { InputTextboxProps } from '../../../pane-editor.types';
import { GroupElement } from './group-element';
import { render } from './templater';

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
  const inputRef: any = React.useRef();
  const [revertValue, setRevertValue]: any = React.useState(null);
  const lastFocusState: any = React.useRef(false);
  const isChecked = value ? !value.startsWith('disabled::') : false;
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;
  const isDisabled = disabled || (checkbox && !isChecked);

  React.useEffect(() => {
    multiLine && autoSizeTextArea(inputRef.current, lines, lines);
  }, [lines, multiLine]);

  if (inputRef.current && lastFocusState.current !== focus) {
    lastFocusState.current = focus;

    if (focus) {
      inputRef.current.focus();
    }
  }

  let cleanVal: string | number | undefined = value;

  if (cleanVal && cleanVal.startsWith('disabled::')) {
    cleanVal = cleanVal.substring(10);
  }

  if (revertValue === null) {
    if (cleanVal && template) {
      cleanVal = render(cleanVal, template);
    }
  }

  let inputClasses = 'form-control form-control-sm';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    ref: inputRef,
    type: 'text',
    className: inputClasses,
    value: cleanVal,
    placeholder: placeholder,
    disabled: isDisabled,
    maxLength: maxLength,
    onChange: (ev: React.FormEvent<HTMLInputElement>) => {
      if (allowLinebreaks !== true) {
        // Likely to happen during a paste
        const regex = /\n+/g;
        ev.currentTarget.value = ev.currentTarget.value.replace(regex, ' ');
      }

      const checkedValue =
        (isChecked ? '' : 'disabled::') + ev.currentTarget.value;

      if (onChange) {
        onChange(field, checkedValue);
      }
    },
    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => {
      let bestValue = ev.target.value;
      if (allowLinebreaks !== true) {
        const regex = /\n+/g;
        bestValue = bestValue.replace(regex, ' ');
      } else {
        const regex = /\n(\n+)/g;
        bestValue = bestValue.replace(regex, '\n\n');
      }

      bestValue = bestValue.trim();

      ev.target.scrollTop = 0;

      multiLine && autoSizeTextArea(ev.target, lines, lines);

      const checkedValue = (isChecked ? '' : 'disabled::') + bestValue;

      if (onValidate) {
        onValidate(field, checkedValue);
      }

      if (onBlur) {
        onBlur(field, checkedValue);
      }

      setRevertValue(null);
    },
    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      const val = ev.target.value;

      multiLine && autoSizeTextArea(ev.target, lines, autoGrow);

      if (onFocus) {
        onFocus(field, val);
      }

      setRevertValue(val);
    },
    onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === 'Enter') {
        if (multiLine && allowLinebreaks === true) {
          return;
        }

        ev.currentTarget.blur();
        ev.preventDefault();
        return;
      } else if (ev.key === 'Escape') {
        if (onChange) {
          onChange(revertValue ? revertValue : '');
        }

        ev.currentTarget.blur();
        ev.preventDefault();
        return;
      }
    },
    onInput: (e: any) => {
      if (allowLinebreaks !== true) {
        const regex = /\n+/g;
        e.target.value = e.target.value.replace(regex, ' ');
      }

      multiLine && autoSizeTextArea(e.target, lines, autoGrow);
    },
  };

  let groupClasses = 'input-group input-group-sm';
  let controlClasses = 'control-textbox mb-2 template-content-input';

  if (isDisabled) {
    controlClasses += ' disabled';
  }

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  return (
    <div className={controlClasses}>
      <label className="form-label">{label}</label>
      <div className={groupClasses}>
        {checkbox ? (
          <div className="input-group-text checkbox pre">
            <input
              disabled={isDisabled}
              checked={isChecked}
              className="form-check-input form-check-input-sm"
              type="checkbox"
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                let cleanVal = inputRef.current.value;
                if (cleanVal.startsWith('disabled::')) {
                  cleanVal = cleanVal.substring(10);
                }

                if (onChange) {
                  if (isChecked) {
                    onChange('disabled::' + cleanVal);
                  } else {
                    onChange(cleanVal);
                  }
                }

                inputProps.onBlur({ target: inputRef.current });
              }}
            />
          </div>
        ) : (
          GroupElement('pre', pre)
        )}
        {multiLine ? <textarea {...inputProps} /> : <input {...inputProps} />}
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
  Textbox,
};
