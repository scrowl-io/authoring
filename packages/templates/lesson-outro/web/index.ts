import { LessonIntroSchema, LessonIntroSchemaProps } from '../src';
import LessonIntro from './lesson-intro-lazy';

window.LessonIntro = LessonIntro;
window.LessonIntroSchema = LessonIntroSchema as LessonIntroSchemaProps;
