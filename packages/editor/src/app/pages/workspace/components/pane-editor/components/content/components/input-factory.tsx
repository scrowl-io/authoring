import React from 'react';
import { InputFactoryProps } from '../../../pane-editor.types';
import {
  Asset,
  Checkbox,
  Fieldset,
  NumberSpinner,
  Select,
  Textbox,
  Radio,
} from './';

export const InputFactory = ({
  field,
  content,
  onChange,
  onValidate,
  onBlur,
  onFocus,
}: InputFactoryProps) => {
  switch (content.type) {
    case 'Asset':
      return (
        <Asset
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'Checkbox':
      return (
        <Checkbox
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'Radio':
      return (
        <Radio
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'Fieldset':
      return (
        <Fieldset
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'NumberSpinner':
      return (
        <NumberSpinner
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'Select':
      return (
        <Select
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    case 'Textbox':
      return (
        <Textbox
          field={field}
          {...content}
          onChange={onChange}
          onValidate={onValidate}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    default:
      return (
        <div>
          Unable to create input - field type of "{field}" not supported
        </div>
      );
  }
};

export default {
  InputFactory,
};
