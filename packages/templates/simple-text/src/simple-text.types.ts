import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputAssetProps,
} from '@scrowl/template-core';

export interface SimpleTextContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
  };
}

export interface SimpleTextContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
  };
}

export type SimpleTextSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: SimpleTextContentBgImage;
    options: SimpleTextContentOptions;
    animateLists?: any;
  };
};

export interface SimpleTextCommons extends TemplateCommons {
  schema: SimpleTextSchemaProps;
}

export type SimpleTextProps = SimpleTextCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
