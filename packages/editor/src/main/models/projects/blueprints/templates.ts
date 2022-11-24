import { BlockTextSchema, BlockTextSchemaProps } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema, LessonIntroSchemaProps } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema, SimpleTextSchemaProps } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema, TwoColumnSchemaProps } from '@scrowl/template-two-column/schema';

export const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
  lessonIntro: JSON.stringify(LessonIntroSchema),
  simpleText: JSON.stringify(SimpleTextSchema),
  twoColumn: JSON.stringify(TwoColumnSchema),
};

export type TemplateNames = keyof typeof TEMPLATES;

export type TemplateSchemas = {
  blockText: BlockTextSchemaProps;
  lessonIntro: LessonIntroSchemaProps;
  simpleText: SimpleTextSchemaProps;
  twoColumn: TwoColumnSchemaProps;
};

export const get = <T>(template: TemplateNames): T => {
  return JSON.parse(TEMPLATES[template]);
};

export default {
  TEMPLATES,
  get,
};
