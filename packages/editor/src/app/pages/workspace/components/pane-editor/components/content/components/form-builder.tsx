import React from 'react';
import { TemplateSchema } from '@scrowl/template-core';
import { InputProps } from '../../../pane-editor.types';
import { InputFactory } from './input-factory';

export interface FormBuilderCommons {
  content: TemplateSchema;
  revertErrors: boolean;
  onChange: (field, value) => void;
  onValidate: (field, value) => void;
  onFocus: (field, value) => void;
  onBlur: (field, value) => void;
}

export type FormBuilderProps = FormBuilderCommons &
  Omit<
    React.AllHTMLAttributes<HTMLFormElement>,
    'onChange' | 'onValidate' | 'onFocus' | 'onBlur'
  >;

export const FormBuilder = ({
  className,
  content,
  revertErrors,
  onChange,
  onValidate,
  onFocus,
  onBlur,
  ...props
}: FormBuilderProps) => {
  let classes = '';
  let fields;
  if (content) {
    fields = Object.keys(content);
  }

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <form className={classes} {...props}>
      {fields
        ? fields.map((field, idx) => {
            const fieldContent: InputProps = content[field];

            let disableFlag;

            if (
              content &&
              content.videoAsset &&
              content.videoAsset.content.webUrl.value
            ) {
              disableFlag = 'assetUrl';
            } else if (
              content &&
              content.videoAsset &&
              content.videoAsset.content.assetUrl.value
            ) {
              disableFlag = 'webUrl';
            }

            switch (fieldContent.type) {
              case 'Fieldset':
                return (
                  <InputFactory
                    key={idx}
                    field={field}
                    content={fieldContent}
                    onChange={onChange}
                    onValidate={onValidate}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    disableFlag={disableFlag}
                  />
                );
              default:
                return (
                  <div key={idx} className="row mb-1">
                    <InputFactory
                      field={field}
                      content={fieldContent}
                      onChange={onChange}
                      onValidate={onValidate}
                      onBlur={onBlur}
                      onFocus={onFocus}
                    />
                  </div>
                );
            }
          })
        : null}
    </form>
  );
};

export default {
  FormBuilder,
};
