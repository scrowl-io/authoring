import { ProjectData } from '../src';
import { TemplateSchema } from '@scrowl/template-core';
import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema } from '@scrowl/template-two-column/schema';

const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
  lessonIntro: JSON.stringify(LessonIntroSchema),
  simpleText: JSON.stringify(SimpleTextSchema),
  twoColumn: JSON.stringify(TwoColumnSchema),
};

const createSlide = (
  name: string,
  mId: number,
  lId: number,
  id: number,
  type: keyof typeof TEMPLATES
) => {
  const template: TemplateSchema = JSON.parse(TEMPLATES[type]);

  return {
    name,
    moduleId: mId,
    lessonId: lId,
    id: id,
    template,
    notes: '',
  };
};

export const create = () => {
  const data: ProjectData = {
    modules: [
      {
        id: 0,
        name: 'Module 1',
      },
    ],
    lessons: [
      {
        moduleId: 0,
        id: 0,
        name: 'Lesson 1',
      },
      {
        moduleId: 0,
        id: 1,
        name: 'Lesson 2',
      },
      {
        moduleId: 0,
        id: 2,
        name: 'Lesson 3',
      },
    ],
    slides: [
      createSlide('Slide 1.1', 0, 0, 1, 'lessonIntro'),
      createSlide('Slide 1.2', 0, 0, 0, 'blockText'),
      createSlide('Slide 1.3', 0, 0, 1, 'simpleText'),
      createSlide('Slide 1.2', 0, 0, 2, 'twoColumn'),
      createSlide('Slide 2.1', 0, 1, 3, 'twoColumn'),
      createSlide('Slide 2.2', 0, 1, 4, 'lessonIntro'),
      createSlide('Slide 3.1', 0, 2, 5, 'twoColumn'),
      createSlide('Slide 3.2', 0, 2, 6, 'twoColumn'),
    ],
    glossary: [],
    resources: [],
  };

  return data;
};

export default {
  create,
};