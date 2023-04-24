import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputAssetProps,
  InputCheckboxProps,
  TemplateSchema,
} from '@scrowl/template-core';

export interface LessonIntroContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface LessonIntroSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    title: InputTextboxProps;
    subtitle: InputTextboxProps;
    time: InputTextboxProps;
    startLabel: InputTextboxProps;
    bgImage: LessonIntroContentBgImage;
  };
};

export interface LessonIntroCommons extends TemplateCommons {
  schema: LessonIntroSchemaProps;
}

export type LessonIntroProps = LessonIntroCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
