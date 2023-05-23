import React from "react";
import { TemplateSchemaMeta, TemplateCommons, InputTextboxProps, InputFieldsetProps, InputSelectProps, InputCheckboxProps, InputAssetProps, TemplateSchema } from "@scrowl/template-core";
export { TemplateSchemaMeta, TemplateCommons, InputTextboxProps, InputFieldsetProps, InputSelectProps, InputCheckboxProps, InputAssetProps };
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
export interface SimpleVideoSchemaProps extends TemplateSchema {
    meta: TemplateSchemaMeta;
    content: {
        text: InputTextboxProps;
        videoAsset: VideoAsset;
        options: SimpleVideoContentOptions;
    };
}
export interface SimpleVideoCommons extends TemplateCommons {
    schema: SimpleVideoSchemaProps;
}
export type SimpleVideoProps = SimpleVideoCommons & React.AllHTMLAttributes<HTMLDivElement>;
export const SimpleVideoSchema: SimpleVideoSchemaProps;

//# sourceMappingURL=schema.d.ts.map
