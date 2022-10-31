import React from 'react';
import {
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
} from '@scrowl/template-core';

export interface TwoColumnContentBgImage extends InputFieldsetProps {
  fields: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface TwoColumnContentOptions extends InputFieldsetProps {
  fields: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export type ColumnOptions = {
  numberOfColumns: number;
  stackOnMobile: boolean;
};

export type TwoColumnLayout = {
  leftColumn: {
    textLeft: InputTextboxProps;
    headingLeft?: InputTextboxProps;
  };
  rightColumn: {
    textRight: InputTextboxProps;
    headingRight?: InputTextboxProps;
  };
  middleColumn?: {
    textMiddle: InputTextboxProps;
    headingMiddle?: InputTextboxProps;
  };
  columnOptions: ColumnOptions;
  bgImage?: TwoColumnContentBgImage;
  options: TwoColumnContentOptions;
};

export interface TwoColumnCommons extends TemplateCommons {
  layout: TwoColumnLayout;
}

export type TwoColumnProps = TwoColumnCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
