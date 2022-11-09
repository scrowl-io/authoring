import { LessonIntroProps, LessonIntroSchemaProps } from '../src';

declare global {
  interface Window {
    LessonIntro: (props: LessonIntroProps) => JSX.Element;
    LessonIntroSchema: LessonIntroSchemaProps;
  }
}
