import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { LessonIntroProps, LessonIntroSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    },
    LessonIntro: (props: LessonIntroProps) => JSX.Element;
    LessonIntroSchema: LessonIntroSchemaProps;
  }
}
