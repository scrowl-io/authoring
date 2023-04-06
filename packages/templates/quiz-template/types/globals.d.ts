import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { QuizProps, QuizSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
    Quiz: (props: QuizProps) => JSX.Element;
    QuizSchema: QuizSchemaProps;
  }
}
