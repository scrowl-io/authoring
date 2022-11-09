import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputAssetProps,
} from '@scrowl/template-core';

export interface LessonIntroContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
  };
}

export type LessonIntroSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    title: InputTextboxProps;
    subtitle: InputTextboxProps;
    time: InputTextboxProps;
    startLabel: InputTextboxProps;
    heroImage: LessonIntroContentBgImage;
  };
};

export interface LessonIntroCommons extends TemplateCommons {
  schema: LessonIntroSchemaProps;
}

export type LessonIntroProps = LessonIntroCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
