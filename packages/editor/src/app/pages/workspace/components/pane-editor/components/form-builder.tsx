import React from 'react';
import { TemplateSchema } from '@scrowl/template-core';

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
  let classes = 'scrowl-sidebar-form';

  if (className) {
    classes += ` ${className}`;
  }

  return <form className={classes} {...props}></form>;
};

export default {
  FormBuilder,
};
