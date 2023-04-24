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

export interface LessonOutroContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface LessonOutroSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    title: InputTextboxProps;
    subtitle: InputTextboxProps;
    time: InputTextboxProps;
    startLabel: InputTextboxProps;
    bgImage: LessonOutroContentBgImage;
  };
}

export interface LessonOutroCommons extends TemplateCommons {
  schema: LessonOutroSchemaProps;
}

export type LessonOutroProps = LessonOutroCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
