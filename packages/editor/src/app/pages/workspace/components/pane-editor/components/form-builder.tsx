import React from 'react';
import { Fieldset } from './';

export interface FormBuilderProps {
  schema: any;
  content: any;
  revertErrors: boolean;
  onChange: Function;
  onValidate: Function;
  onFocus: Function;
  onBlur: Function;
}

const defaultProps: FormBuilderProps = {
  schema: {},
  content: {},
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

export const FormBuilder = (_props: FormBuilderProps) => {
  const props: any = { ...defaultProps, ..._props };

  const schema = props.schema;

  const fieldsets: any = [];

  schema &&
    Object.keys(schema).forEach((name) => {
      const schemaProps = schema[name];

      let fieldsetFields: any = null;
      let skinny: boolean = false;

      if (schemaProps.type === 'FIELDSET') {
        fieldsetFields = schemaProps.fields;
      } else {
        // This is an input
        skinny = true;

        fieldsetFields = {};
        fieldsetFields[name] = schemaProps;
      }

      const fieldset = (
        <Fieldset
          key={name}
          name={name}
          content={props.content}
          label={schemaProps.label}
          fields={fieldsetFields}
          skinny={skinny}
          onChange={props.onChange}
          onValidate={props.onValidate}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          revertErrors={props.revertErrors}
        />
      );
      fieldsets.push(fieldset);
    });

  return <form className="scrowl-sidebar-form">{fieldsets}</form>;
};

export default {
  FormBuilder,
};
