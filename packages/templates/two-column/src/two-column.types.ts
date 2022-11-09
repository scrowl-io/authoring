import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputCheckboxProps,
  InputRadioProps,
} from '@scrowl/template-core';

export interface TwoColumnContentOptions extends InputFieldsetProps {
  content: {
    numberOfColumns: InputRadioProps;
    stackOnMobile: InputCheckboxProps;
  };
}

export interface TwoColumnContentColumnProps extends InputFieldsetProps {
  content: {
    heading: InputTextboxProps;
    body: InputTextboxProps;
  }
}

export type TwoColumnSchemaProps = {
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
