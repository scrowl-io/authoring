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

export interface TwoColumnContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface TwoColumnContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export type ColumnOptions = {
  numberOfColumns: 1 | 2 | 3;
  stackOnMobile: boolean;
};

export type TwoColumnSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    textLeft: InputTextboxProps;
    headingLeft?: InputTextboxProps;
    textRight: InputTextboxProps;
    headingRight?: InputTextboxProps;
    textMiddle: InputTextboxProps;
    headingMiddle?: InputTextboxProps;
    columnOptions: ColumnOptions;
    bgImage?: TwoColumnContentBgImage;
    options: TwoColumnContentOptions;
  };
};

export interface TwoColumnCommons extends TemplateCommons {
  schema: TwoColumnSchemaProps;
}

export type TwoColumnProps = TwoColumnCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
