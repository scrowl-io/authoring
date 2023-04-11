import { LessonIntroSchemaProps } from './lesson-intro.types';

export const LessonIntroSchema: LessonIntroSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Lesson Intro',
    component: 'LessonIntro',
    filename: 'lesson-intro',
    tags: ['text', 'introduction'],
    icon: 'article',
  },
  content: {
    title: {
      type: 'Textbox',
      label: 'Title',
      value: 'Enter Your New Title',
      placeholder: 'Title',
      multiLine: false,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    subtitle: {
      type: 'Textbox',
      label: 'Subtitle',
      value: 'Subtitle Goes Here',
      placeholder: 'Subtitle',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    time: {
      type: 'Textbox',
      label: 'Time',
      value: '40 min',
      placeholder: 'Time',
      multiLine: false,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    startLabel: {
      type: 'Textbox',
      label: 'Start Label',
      value: 'START',
      placeholder: 'Start Label',
      multiLine: false,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    bgImage: {
      type: 'Fieldset',
      label: 'Background Image',
      content: {
        alt: {
          type: 'Textbox',
          label: 'Alt Text',
          placeholder: 'Image alt text',
        },
        url: {
          type: 'Asset',
          assetTypes: ['image'],
          label: 'Image',
        },
        bg: {
          type: 'Checkbox',
          label: 'Use as Background',
          value: false,
        },
      },
    },
  },
  controlOptions: {
    stopUserAdvancement: {
      type: 'Checkbox',
      label: 'Stop User Advancement',
      value: false,
    },
    disableAnimations: {
      type: 'Checkbox',
      label: 'Disable Animations',
      value: false,
    },
  },
};

export default {
  LessonIntroSchema,
};
