import { QuizSchemaProps } from './quiz.types';

export const QuizSchema: QuizSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Quiz',
    component: 'Quiz',
    filename: 'quiz',
    tags: ['text', 'image'],
    icon: 'vertical_split',
  },
  content: {
    text: {
      type: 'Textbox',
      label: 'Quiz',
      value: 'Quiz content to follow.',
      placeholder: 'Quiz content here...',
      multiLine: true,
      lines: 10,
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
    options: {
      //@ts-ignore
      type: 'Fieldset',
      label: 'Options',
      content: {
        alignment: {
          type: 'Select',
          hint: 'BodyAlignment',
          label: 'Alignment',
          value: 'left',
          options: [
            {
              name: 'Align Left',
              value: 'left',
              icon: 'align_horizontal_left',
            },
            {
              name: 'Align Right',
              value: 'right',
              icon: 'align_horizontal_right',
            },
          ],
          iconFromValue: true,
        },
        showProgress: {
          type: 'Checkbox',
          label: 'Show Progress Bar',
          value: true,
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
      value: true,
    },
  },
};

export default {
  QuizSchema,
};
