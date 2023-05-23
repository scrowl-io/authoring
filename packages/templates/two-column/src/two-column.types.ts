import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputCheckboxProps,
  InputRadioProps,
  InputSelectProps,
  TemplateSchema,
} from '@scrowl/template-core';

export interface TwoColumnContentOptions extends InputFieldsetProps {
  content: {
    numberOfColumns: InputRadioProps;
    stackOnMobile: InputCheckboxProps;
    alignment: InputSelectProps;
  };
}

export interface TwoColumnContentColumnProps extends InputFieldsetProps {
  content: {
    heading: InputTextboxProps;
    body: InputTextboxProps;
  };
}

export interface TwoColumnSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    options: TwoColumnContentOptions;
    firstColumn: TwoColumnContentColumnProps;
    secondColumn: TwoColumnContentColumnProps;
    thirdColumn: TwoColumnContentColumnProps;
  };
};

export interface TwoColumnCommons extends TemplateCommons {
  schema: TwoColumnSchemaProps;
}

export type TwoColumnProps = TwoColumnCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
