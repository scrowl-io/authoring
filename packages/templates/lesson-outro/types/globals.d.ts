import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { LessonOutroProps, LessonOutroSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
    LessonOutro: (props: LessonOutroProps) => JSX.Element;
    LessonOutroSchema: LessonOutroSchemaProps;
  }
}
