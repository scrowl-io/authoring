import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  TemplateControlOptions,
} from '@scrowl/template-core';
import { TemplateSchema } from '@scrowl/template-core';

export type {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  TemplateControlOptions,
};

export interface QuizImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface QuizContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export interface QuizSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: QuizImage;
    options: QuizContentOptions;
  };
}

export interface QuizCommons extends TemplateCommons {
  schema: QuizSchemaProps;
}

export type QuizProps = QuizCommons & React.AllHTMLAttributes<HTMLDivElement>;
