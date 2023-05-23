import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema } from '@scrowl/template-two-column/schema';
import { SimpleVideoSchema } from '@scrowl/template-simple-video/schema';

export const list = [
  BlockTextSchema,
  LessonIntroSchema,
  SimpleTextSchema,
  TwoColumnSchema,
  SimpleVideoSchema,
];

export default {
  list,
};
