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

export interface VideoAsset extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    assetUrl?: InputAssetProps;
    webUrl?: InputTextboxProps;
  };
}

export interface SimpleVideoContentOptions extends InputFieldsetProps {
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
    options: SimpleVideoContentOptions;
  };
  controlOptions: TemplateControlOptions;
};

export interface SimpleVideoCommons extends TemplateCommons {
  schema: SimpleVideoSchemaProps;
}

export type SimpleVideoProps = SimpleVideoCommons &
  React.AllHTMLAttributes<HTMLDivElement>;