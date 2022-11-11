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
        name: 'Module 1'
      }
    ],
    lessons: [
      {
        moduleId: 0,
        id: 0,
        name: 'Lesson 1'
      }
    ],
    slides: [
      createSlide('Slide 1.1', 0, 0, 2, 'lessonIntro'),
      createSlide('Slide 1.2', 0, 0, 0, 'blockText'),
      createSlide('Slide 1.3', 0, 0, 1, 'simpleText'),
      createSlide('Slide 1.4', 0, 0, 3, 'twoColumn'),
    ],
    glossary: [],
    resources: [],
  };

  return data;
};

export default {
  create,
};