import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { LessonOutroSchema } from '@scrowl/template-lesson-outro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';

export const list = [
  BlockTextSchema,
  LessonIntroSchema,
  LessonOutroSchema,
  SimpleTextSchema,
];

export default {
  list,
};
