import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { SimpleVideoProps, SimpleVideoSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
    SimpleVideo: (props: SimpleVideoProps) => JSX.Element;
    SimpleVideoSchema: SimpleVideoSchemaProps;
  }
}
