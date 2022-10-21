import React from 'react';
import { useActiveTemplateElements } from '../../../page-workspace-hooks';
import { FormBuilder } from '.';

export const TemplateForm = () => {
  const elementsConfig = useActiveTemplateElements();

  console.log('elementsConfig', elementsConfig);

  return (
    <div className="template-form">
      Content Form
      {/* <FormBuilder
        schema={contentLayout ? contentLayout.schema : {}}
        content={slideContent}
        onChange={async (fieldKey, value) => {
          dispatch(courseActions.setSlideContent({ fieldKey, value }));
        }}
        onValidate={async (fieldKey, value) => {
          dispatch(courseActions.setSlideContent({ fieldKey, value }));
          dispatch(courseActions.validateSlideContent({}));
        }}
        onFocus={async (fieldKey, value, props) => {
          return await dispatchTemplateEvent("onFocus", fieldKey, value, props);
        }}
        onBlur={async (fieldKey, value) => {
          dispatch(courseActions.setContentPanelFocus(""));

          return await dispatchTemplateEvent("onBlur", fieldKey, value);
        }}
        revertErrors={false}
      /> */}
    </div>
  );
};

export default {
  TemplateForm,
};
