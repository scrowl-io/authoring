import React, { useEffect, useRef } from 'react';
import * as css from '../../_pane-editor.scss';
import { Projects } from '../../../../../../models';
import {
  useActiveSlide,
  useActiveTemplateControls,
  setActiveTemplateControls,
  setContentFocus,
  resetContentFocus,
} from '../../../../page-workspace-hooks';
import { FormBuilder } from '../content/components';

export const Controls = () => {
  const isDirty = useRef(false);
  const isUncommitted = useRef(false);
  const processCommit = useRef(false);
  const templateControls = useActiveTemplateControls();
  const activeSlide = useActiveSlide();

  const handleContentUpdate = (field, value, prop?: string) => {
    setActiveTemplateControls({ field, value, prop });
    isDirty.current = true;
    isUncommitted.current = true;
  };

  const handleContentValidate = (field, value) => {
    // placeholder
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
        content={templateControls}
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
  Controls,
};
