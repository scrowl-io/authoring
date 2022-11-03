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
  ...props
}: InputFieldsetProps) => {
  const fields = Object.keys(content);

  const handleFieldOnChange = (inputField, val) => {
    if (onChange) {
      onChange(inputField, val);
    }
  };

  const handleFieldOnValidate = (inputField, val) => {
    if (onValidate) {
      onValidate(inputField, val);
    }
  };

  const handleFieldOnFocus = (inputField, val) => {
    if (onFocus) {
      onFocus(inputField, val);
    }
  };

  const handleFieldOnBlur = (inputField, val) => {
    if (onBlur) {
      onBlur(inputField, val);
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
