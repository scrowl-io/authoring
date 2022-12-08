import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { TwoColumnProps, TwoColumnSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    },
    TwoColumn: (props: TwoColumnProps) => JSX.Element;
    TwoColumnSchema: TwoColumnSchemaProps;
  }
}
