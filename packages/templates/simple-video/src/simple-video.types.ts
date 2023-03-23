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

export type {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
};

export interface VideoAsset extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    assetUrl?: InputAssetProps;
    webUrl?: InputTextboxProps;
  };
}

export interface BlockTextContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export type SimpleVideoSchemaProps = {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    videoAsset: VideoAsset;
    options: BlockTextContentOptions;
  };
};

export interface BlockTextCommons extends TemplateCommons {
  schema: SimpleVideoSchemaProps;
};

export type SimpleVideoProps = BlockTextCommons &
  React.AllHTMLAttributes<HTMLDivElement>;