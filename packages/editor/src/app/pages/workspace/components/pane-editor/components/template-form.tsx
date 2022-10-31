import React from 'react';
import { useActiveTemplateContent } from '../../../page-workspace-hooks';
import { FormBuilder } from '.';

export const TemplateForm = () => {
  const templateContent = useActiveTemplateContent();

  console.log('templateContent', templateContent);

  const handleContentUpdate = (field, value) => {
    console.log('content update', field, value);
  };

  const handleContentValidate = (field, value) => {
    console.log('content validate', field, value);
  };

  const handleContentFocus = (field, value) => {
    console.log('content focus', field, value);
  };

  const handleContentBlur = (field, value) => {
    console.log('content blur', field, value);
  };

  return (
    <div className="template-form">
      Content Form
      <FormBuilder
        content={templateContent}
        onChange={handleContentUpdate}
        onValidate={handleContentValidate}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        revertErrors={false}
      />
    </div>
  );
};

export default {
  TemplateForm,
};
