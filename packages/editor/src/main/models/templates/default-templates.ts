import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { LessonOutroSchema } from '@scrowl/template-lesson-outro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema } from '@scrowl/template-two-column/schema';
import { SimpleVideoSchema } from '@scrowl/template-simple-video/schema';
import { QuizSchema } from '@scrowl/template-quiz/schema';

export const list = [
  BlockTextSchema,
  LessonIntroSchema,
  LessonOutroSchema,
  SimpleTextSchema,
  TwoColumnSchema,
  SimpleVideoSchema,
  QuizSchema,
];

export default {
  list,
};
