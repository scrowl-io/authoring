import React from 'react';
import * as css from '../../_pane-editor.scss';
import {
  useActiveTemplateContent,
  setActiveTemplateContent,
  setContentFocus,
  resetContentFocus,
} from '../../../../page-workspace-hooks';
import { FormBuilder } from './components';

export const Content = () => {
  const templateContent = useActiveTemplateContent();

  const handleContentUpdate = (field, value) => {
    setActiveTemplateContent({ field, value });
  };

  const handleContentValidate = (field, value) => {
    // console.log('content validate', field, value);
  };

  const handleContentFocus = (field, value) => {
    setContentFocus(field);
  };

  const handleContentBlur = (field, value) => {
    resetContentFocus();
  };

  return (
    <div className={css.contentForm}>
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
  Content,
};
