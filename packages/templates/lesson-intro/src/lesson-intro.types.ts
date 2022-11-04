import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
} from '@scrowl/template-core';

export interface LessonIntroContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface LessonIntroContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export type LessonIntroSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: LessonIntroContentBgImage;
    options: LessonIntroContentOptions;
  };
};

export interface LessonIntroCommons extends TemplateCommons {
  schema: LessonIntroSchemaProps;
}

export type LessonIntroProps = LessonIntroCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
