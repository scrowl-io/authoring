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
      {
        id: 1,
        name: 'Module 2',
      },
      {
        id: 2,
        name: 'Module 3',
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
      {
        moduleId: 1,
        id: 3,
        name: 'Lesson 4',
      },
      {
        moduleId: 1,
        id: 4,
        name: 'Lesson 5',
      },
      {
        moduleId: 2,
        id: 5,
        name: 'Lesson 6',
      },
      {
        moduleId: 2,
        id: 6,
        name: 'Lesson 7',
      },
    ],
    slides: [
      // not using the broken templates for now
      // createSlide('Slide 1.2', 0, 0, 0, 'blockText'),
      // createSlide('Slide 1.3', 0, 0, 1, 'simpleText'),
      createSlide('Slide 1.1', 0, 0, 1, 'lessonIntro'),
      createSlide('Slide 1.2', 0, 0, 2, 'twoColumn'),

      createSlide('Slide 2.1', 0, 1, 3, 'twoColumn'),
      createSlide('Slide 2.2', 0, 1, 4, 'lessonIntro'),

      createSlide('Slide 3.1', 0, 2, 5, 'twoColumn'),
      createSlide('Slide 3.2', 0, 2, 6, 'twoColumn'),

      createSlide('Slide 4.1', 1, 3, 7, 'twoColumn'),
      createSlide('Slide 4.2', 1, 4, 8, 'twoColumn'),
      createSlide('Slide 4.3', 1, 4, 9, 'twoColumn'),

      createSlide('Slide 5.1', 2, 5, 10, 'twoColumn'),
      createSlide('Slide 5.2', 2, 5, 11, 'twoColumn'),

      createSlide('Slide 6.1', 2, 6, 12, 'twoColumn'),
      createSlide('Slide 6.2', 2, 6, 13, 'twoColumn'),
    ],
    glossary: [
      {
        id: 0,
        word: 'Agent',
        definition:
          'One who acts for, or in the place of, another, by authority from him or her; one entrusted with the business of another; a substitute; a deputy. Managers and supervisors are agents of the employer.',
      },
      {
        id: 1,
        word: 'Discrimination',
        definition:
          'Any action that unlawfully or unjustly results in unequal treatment of persons or groups based on race, color, gender, national origin, religion, age, disability or other factors protected under federal, state or local laws, such as marital status or gender identity..',
      },
    ],
    resources: [
      {
        id: 0,
        filename: 'icon_1024.png',
        title: 'mac icon',
        description: 'this is the mac icon',
      },
      {
        id: 1,
        filename:
          'OSG-Logo-with-Slogan-Horizontal-_Secondary-Color-Version.png',
        title: 'OSG Logo',
        description: 'this is the OSG logo',
      },
    ],
  };

  return data;
};

export default {
  create,
};