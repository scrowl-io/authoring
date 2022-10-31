import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps
} from '@scrowl/template-core';

export interface BlockTextContentBgImage extends InputFieldsetProps {
  fields: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface BlockTextContentOptions extends InputFieldsetProps {
  fields: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  }
}

export type BlockTextSchemaProps = {
  meta: TemplateSchemaMeta,
  content: {
    text: InputTextboxProps;
    bgImage: BlockTextContentBgImage;
    options: BlockTextContentOptions;
  }
};

export interface BlockTextCommons extends TemplateCommons {
  schema: BlockTextSchemaProps;
};

export type BlockTextProps = BlockTextCommons & React.AllHTMLAttributes<HTMLDivElement>;