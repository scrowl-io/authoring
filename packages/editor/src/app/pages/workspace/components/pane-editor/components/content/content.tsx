import React, { useEffect, useRef } from 'react';
import * as css from '../../_pane-editor.scss';
import { Projects } from '../../../../../../models';
import {
  useActiveSlide,
  useActiveTemplateContent,
  setActiveTemplateContent,
  setContentFocus,
  resetContentFocus,
} from '../../../../page-workspace-hooks';
import { FormBuilder } from './components';

export const Content = () => {
  const templateContent = useActiveTemplateContent();
  const activeSlide = useActiveSlide();

  const handleContentUpdate = (field, value, prop?: string) => {
    setActiveTemplateContent({ field, value, prop });
  };

  const handleContentValidate = (field, value) => {};

  const handleContentFocus = (field, value) => {
    const focusField = Array.isArray(field) ? field.join('.') : field;

    setContentFocus(focusField);
  };

  const handleContentBlur = (field, value) => {
    resetContentFocus();
  };

  useEffect(() => {
    Projects.setSlide(activeSlide);
  }, [activeSlide]);

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
