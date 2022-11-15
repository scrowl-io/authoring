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
  const isDirty = useRef(false);
  const isUncommitted = useRef(false);
  const processCommit = useRef(false);
  const templateContent = useActiveTemplateContent();
  const activeSlide = useActiveSlide();

  const handleContentUpdate = (field, value) => {
    setActiveTemplateContent({ field, value });
    isDirty.current = true;
    isUncommitted.current = true;
  };

  const handleContentValidate = (field, value) => {
    // console.log('content validate', field, value);
  };

  const handleContentFocus = (field, value) => {
    const focusField = Array.isArray(field) ? field.join('.') : field;

    setContentFocus(focusField);
  };

  const handleContentBlur = (field, value) => {
    resetContentFocus();
    isDirty.current = true;
    isUncommitted.current = true;
    processCommit.current = true;
  };

  useEffect(() => {
    if (processCommit.current && isDirty.current && isUncommitted.current) {
      isDirty.current = false;
      isUncommitted.current = false;
      processCommit.current = false;
      Projects.setSlide(activeSlide);
    }
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
