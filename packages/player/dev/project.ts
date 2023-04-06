import { ProjectData } from '../src';
import { TemplateSchema } from '@scrowl/template-core';
import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
import { TwoColumnSchema } from '@scrowl/template-two-column/schema';
import { SimpleVideoSchema } from '@scrowl/template-simple-video/schema';
import { QuizSchema } from '@scrowl/template-quiz/schema';

const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
  lessonIntro: JSON.stringify(LessonIntroSchema),
  simpleText: JSON.stringify(SimpleTextSchema),
  twoColumn: JSON.stringify(TwoColumnSchema),
  simpleVideo: JSON.stringify(SimpleVideoSchema),
  quiz: JSON.stringify(QuizSchema),
};

const createSlide = (
  name: string,
  mId: number,
  lId: number,
  id: number,
  type: keyof typeof TEMPLATES,
  media?: boolean,
  mediaUrl?: string
) => {
  const template: TemplateSchema = JSON.parse(TEMPLATES[type]);

  if (media && mediaUrl) {
    switch (template.meta.filename) {
      case 'block-text':
        template.content.bgImage.content.url.value = mediaUrl;
        break;
      case 'simple-video':
        template.content.videoAsset.content.webUrl.value = mediaUrl;
        break;
    }
  }

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
    name: 'Sexual Harrassment Prevention Training',
    subtitle: 'Promote a Safe Workplace',
    modules: [
      {
        id: 0,
        name: 'An Introduction to Harrassment & Discrimination',
      },
      {
        id: 1,
        name: 'Sexual Harrassment',
      },
      {
        id: 2,
        name: 'Additional Training For Supervisors',
      },
    ],
    lessons: [
      {
        moduleId: 0,
        id: 0,
        name: 'What is Sexual Harrassment?',
      },
      {
        moduleId: 0,
        id: 1,
        name: 'Building a Respectful Workplace',
      },
      {
        moduleId: 0,
        id: 2,
        name: "What to Do If You're Being Sexually Harrassed at Work",
      },
      {
        moduleId: 1,
        id: 3,
        name: 'Bystander Intervention',
      },
      {
        moduleId: 1,
        id: 4,
        name: 'Next Steps',
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
      createSlide('Slide 1.1', 0, 0, 0, 'lessonIntro'),
      createSlide(
        'Slide 1.2',
        0,
        0,
        1,
        'simpleVideo',
        true,
        'https://www.youtube.com/watch?v=Z_ppk0iQnsA'
      ),
      createSlide('Slide 1.3', 0, 0, 2, 'quiz'),
      createSlide('Slide 1.4', 0, 0, 3, 'blockText', true, './osg-logo.png'),

      createSlide('Slide 2.1', 0, 1, 4, 'twoColumn'),
      createSlide('Slide 2.2', 0, 1, 5, 'simpleText'),

      createSlide('Slide 3.1', 0, 2, 6, 'twoColumn'),
      createSlide('Slide 3.2', 0, 2, 7, 'twoColumn'),

      createSlide('Slide 4.1', 1, 3, 8, 'twoColumn'),
      createSlide('Slide 4.2', 1, 4, 9, 'twoColumn'),
      createSlide('Slide 4.3', 1, 4, 10, 'twoColumn'),

      createSlide('Slide 5.1', 2, 5, 11, 'twoColumn'),
      createSlide('Slide 5.2', 2, 5, 12, 'twoColumn'),
      createSlide('Slide 5.3', 2, 5, 13, 'lessonIntro'),
      createSlide('Slide 5.4', 2, 5, 14, 'twoColumn'),
      createSlide('Slide 5.6', 2, 5, 15, 'twoColumn'),

      createSlide('Slide 6.1', 2, 6, 16, 'twoColumn'),
      createSlide('Slide 6.2', 2, 6, 17, 'twoColumn'),
    ],
    glossary: [
      {
        id: 0,
        word: 'Discrimination',
        definition:
          'Any action that unlawfully or unjustly results in unequal treatment of persons or groups based on race, color, gender, national origin, religion, age, disability or other factors protected under federal, state or local laws, such as marital status or gender identity..',
      },
      {
        id: 1,
        word: 'Empathy',
        definition:
          'The action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experiences of another; the capacity for this.',
      },
      {
        id: 2,
        word: 'Coersion',
        definition:
          'The use of authority or force to impose an unwanted advance. The act of compelling by force of authority.',
      },
      {
        id: 3,
        word: 'Harrassment',
        definition:
          'The act of harrassing, or state of being harrassed; a feeling of intense annoyance, anxiety, or worry caused by being tormented.',
      },
      {
        id: 4,
        word: 'Agent',
        definition:
          'One who acts for, or in the place of, another, by authority from him or her; one entrusted with the business of another; a substitute; a deputy. Managers and supervisors are agents of the employer.',
      },
      {
        id: 5,
        word: 'Common Law Torts',
        definition:
          'Legal actions against civil wrongs, including assault and battery, intentional infliction of emotional distress, interference with contract and defamation. Tort actions may provide more relief than the federal and state laws.',
      },
      {
        id: 6,
        word: 'Subordinate',
        definition:
          'Placed in a lower order, class, or rank; holding a lower or inferior position. In traditional hierarchical work settings, workers are subordinate to their management.',
      },
      {
        id: 7,
        word: 'Peer',
        definition:
          'A person who is of equal standing with another in a group; one of the same rank, quality, endowments, character, etc.; an equal; a match; a mate.',
      },
      {
        id: 8,
        word: 'Third Party Harrassment',
        definition:
          '1) when a party or parties not sexually harassed directly but indirectly suffer the consequences of sexual harassment. 2) also, when a person who is not an employee of an organization but may subject an employee to harassment in a work setting (e.g., a client, vendor, customer, visitor); in which case the employer is responsible for stopping and preventing the harassment.',
      },
      {
        id: 9,
        word: 'Perspective',
        definition:
          'A way of regarding situations or topics. People interpret situations based on their beliefs and attitudes.',
      },
    ],
    resources: [
      {
        id: 0,
        filename: 'icon_1024.png',
        title: 'Mac icon',
        description: 'This is a mac icon for use in project slides.',
      },
      {
        id: 1,
        filename:
          'OSG-Logo-with-Slogan-Horizontal-_Secondary-Color-Version.png',
        title: 'OSG Logo',
        description: 'This is the OSG logo.',
      },
      {
        id: 2,
        filename: 'scrowl-notes.pdf',
        title: 'Scrowl Notes',
        description: 'Notes on next steps for Scrowl project.',
      },
    ],
  };

  return data;
};

export default {
  create,
};