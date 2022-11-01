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

  const chainFields = (inputField) => {
    let fieldset = [field];

    if (typeof inputField === 'string') {
      fieldset.push(inputField);
    } else if (Array.isArray(inputField)) {
      fieldset = fieldset.concat(inputField);
    }

    return fieldset;
  };

  const handleFieldOnChange = (inputField, val) => {
    let fieldset = chainFields(inputField);

    if (onChange) {
      onChange(fieldset, val);
    }
  };

  const handleFieldOnValidate = (inputField, val) => {
    let fieldset = chainFields(inputField);

    if (onValidate) {
      onValidate(fieldset, val);
    }
  };

  const handleFieldOnFocus = (inputField, val) => {
    let fieldset = chainFields(inputField);

    if (onFocus) {
      onFocus(fieldset, val);
    }
  };

  const handleFieldOnBlur = (inputField, val) => {
    let fieldset = chainFields(inputField);

    if (onBlur) {
      onBlur(fieldset, val);
    }
  };

  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label">{label}</legend>
      <div className="fields">
        {fields.map((fieldKey, idx) => {
          return (
            <InputFactory
              key={idx}
              field={fieldKey}
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
