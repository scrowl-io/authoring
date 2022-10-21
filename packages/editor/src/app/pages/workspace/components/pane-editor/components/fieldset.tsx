import React from 'react';
import { LAYOUT_INPUT_TYPE, BaseInputProps } from '../pane-editor.types';
import { useActiveSlide } from '../../../page-workspace-hooks';
import { InputFactory } from './input-factory';

export interface InputFieldsetProps {
  type: LAYOUT_INPUT_TYPE.Fieldset;
  label: string;
  fields: { [key: string]: BaseInputProps };
}

interface PropsType {
  name: string;
  content: any;
  label: string;
  fields: any;
  skinny: boolean;
  revertErrors: boolean;
  onChange: Function;
  onValidate: Function;
  onFocus: Function;
  onBlur: Function;
}

const defaultProps: PropsType = {
  name: 'default_fieldset',
  label: 'Fieldset Label',
  content: {},
  fields: [],
  skinny: false,
  revertErrors: false,

  onChange: () => {
    throw new Error('onChange must be implemented');
  },

  onValidate: () => {
    throw new Error('onValidate must be implemented');
  },

  onFocus: () => {
    throw new Error('onChange must be implemented');
  },

  onBlur: () => {
    throw new Error('onValidate must be implemented');
  },
};

export const Fieldset = (_props: PropsType) => {
  const props: any = { ...defaultProps, ..._props };
  // ::TODO:: fix this state - const contentPanelFocusField = useAppSelector((state) => state["course"].contentPanelFocusField);
  const contentPanelFocusField = '';
  const selectedSlide = useActiveSlide();

  if (!selectedSlide) {
    return null;
  }

  const fieldInputs: any = [];
  let lastFieldInput: any = [];

  const contentValues = { ...props.content };
  const validationErrors =
    selectedSlide && selectedSlide.validationErrors
      ? { ...selectedSlide.validationErrors }
      : {};

  Object.keys(props.fields).forEach((name) => {
    const schemaProps = props.fields[name];

    const InputField = InputFactory(schemaProps.type);
    const fieldKey = props.skinny ? props.name : props.name + '.' + name;

    if (!contentValues[fieldKey]) {
      contentValues[fieldKey] = schemaProps.default ? schemaProps.default : '';
    }

    if (!validationErrors[fieldKey]) {
      validationErrors[fieldKey] = '';
    }

    let validationError = validationErrors[fieldKey];
    validationError = validationError ? validationError.trim() : '';

    lastFieldInput = (
      <InputField
        key={fieldKey}
        fieldKey={fieldKey}
        validationError={validationError}
        {...schemaProps}
        focus={contentPanelFocusField === fieldKey}
        value={contentValues[fieldKey]}
        revertErrors={props.revertErrors}
        onChange={async (value) => {
          return await props.onChange(fieldKey, value);
        }}
        onValidate={async (value) => {
          return await props.onValidate(fieldKey, value);
        }}
        onFocus={async (value) => {
          return await props.onFocus(fieldKey, value, {
            focusRange: schemaProps.focusRange,
          });
        }}
        onBlur={async (value) => {
          return await props.onBlur(fieldKey, value);
        }}
      />
    );

    fieldInputs.push(lastFieldInput);
  });

  if (props.skinny) {
    return <div className="row mb-1">{lastFieldInput}</div>;
  }

  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label">{props.label}</legend>
      <div className="fields">{fieldInputs}</div>
    </fieldset>
  );
};

export default {
  Fieldset,
};
