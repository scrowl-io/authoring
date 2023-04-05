import React from 'react';
import { InputFieldsetProps } from '../../../pane-editor.types';
import { InputFactory } from './input-factory';

export const Fieldset = ({
  field,
  type,
  label,
  hint,
  disabled,
  focus,
  validationError,
  onChange,
  onValidate,
  onFocus,
  onBlur,
  content,
  disableFlag,
  ...props
}: InputFieldsetProps) => {
  const fields = Object.keys(content);

  const handleFieldOnChange = (inputField, val, ...args) => {
    if (onChange) {
      onChange(inputField.split('.'), val, ...args);
    }
  };

  const handleFieldOnValidate = (inputField, val, ...args) => {
    if (onValidate) {
      onValidate(inputField.split('.'), val, ...args);
    }
  };

  const handleFieldOnFocus = (inputField, val, ...args) => {
    if (onFocus) {
      onFocus(inputField.split('.'), val, ...args);
    }
  };

  const handleFieldOnBlur = (inputField, val, ...args) => {
    if (onBlur) {
      onBlur(inputField.split('.'), val, ...args);
    }
  };

  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label">{label}</legend>
      <div className="fields">
        {fields.map((fieldKey, idx) => {
          const inputField = `${field}.${fieldKey}`;
          return (
            <InputFactory
              key={idx}
              field={inputField}
              content={content[fieldKey]}
              onChange={handleFieldOnChange}
              onValidate={handleFieldOnValidate}
              onBlur={handleFieldOnBlur}
              onFocus={handleFieldOnFocus}
              disableFlag={disableFlag}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export default {
  Fieldset,
};
