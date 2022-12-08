import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { SimpleTextProps, SimpleTextSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    },
    SimpleText: (props: SimpleTextProps) => JSX.Element;
    SimpleTextSchema: SimpleTextSchemaProps;
  }
}
