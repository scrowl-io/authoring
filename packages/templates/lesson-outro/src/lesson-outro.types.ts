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

import { ProjectLesson } from '@scrowl/player';

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
  lesson?: ProjectLesson;
  attempt?: React.MutableRefObject<number>;
  passingThreshold: number;
}

export type LessonOutroProps = LessonOutroCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
