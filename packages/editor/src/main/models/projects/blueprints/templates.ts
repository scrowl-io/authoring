import { TemplateSchema } from '../../templates/templates.types';
import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema } from '@scrowl/template-two-column/schema';

export const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
  lessonIntro: JSON.stringify(LessonIntroSchema),
  simpleText: JSON.stringify(SimpleTextSchema),
  twoColumn: JSON.stringify(TwoColumnSchema),
};

export type TemplateNames = keyof typeof TEMPLATES;

export const get = (template: TemplateNames): TemplateSchema => {
  return JSON.parse(TEMPLATES[template]);
};

export default {
  TEMPLATES,
  get,
};
