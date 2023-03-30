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

export interface BlockTextContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface BlockTextContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export interface BlockTextSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: BlockTextContentBgImage;
    options: BlockTextContentOptions;
  };
};

export interface BlockTextCommons extends TemplateCommons {
  schema: BlockTextSchemaProps;
};

export type BlockTextProps = BlockTextCommons & React.AllHTMLAttributes<HTMLDivElement>;