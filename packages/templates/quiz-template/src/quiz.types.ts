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

export interface QuizContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export interface QuizSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    question: InputTextboxProps;
    answers: Array<InputTextboxProps>;
    options: QuizContentOptions;
  };
}

export interface QuizCommons extends TemplateCommons {
  schema: QuizSchemaProps;
}

export type QuizProps = QuizCommons & React.AllHTMLAttributes<HTMLDivElement>;
