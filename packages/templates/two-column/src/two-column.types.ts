import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  InputRadioProps,
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
    alignment?: InputSelectProps;
    showProgress: InputCheckboxProps;
    numberOfColumns: InputRadioProps;
    stackOnMobile: InputCheckboxProps;
  };
}

export type TwoColumnSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    firstColumnText: InputTextboxProps;
    firstColumnHeading?: InputTextboxProps;
    secondColumnText?: InputTextboxProps;
    secondColumnHeading?: InputTextboxProps;
    thirdColumnText?: InputTextboxProps;
    thirdColumnHeading?: InputTextboxProps;
    bgImage?: TwoColumnContentBgImage;
    options: TwoColumnContentOptions;
  };
};

export interface TwoColumnCommons extends TemplateCommons {
  schema: TwoColumnSchemaProps;
}

export type TwoColumnProps = TwoColumnCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
