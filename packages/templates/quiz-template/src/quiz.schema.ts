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
    question: {
      type: 'Fieldset',
      label: 'Question',
      content: {
        question: {
          type: 'Textbox',
          label: 'Question Text',
          value: 'What does AODA stand for?',
          placeholder: 'Quiz content here...',
          multiLine: true,
          lines: 2,
          autoGrow: 2,
          allowLinebreaks: true,
        },
        correctAnswer: {
          type: 'Radio',
          label: 'Correct Answer',
          value: 1,
          displayLabel: true,
          options: [
            {
              label: 'Answer 1',
              value: 1,
              icon: 'crop_portrait',
            },
            {
              label: 'Answer 2',
              value: 2,
              icon: 'crop_portrait',
            },
            {
              label: 'Answer 3',
              value: 3,
              icon: 'crop_portrait',
            },
          ],
        },
      },
    },
    answers: {
      type: 'Fieldset',
      label: 'Answers',
      content: [
        {
          type: 'Textbox',
          label: 'Answer 1',
          value: 'Accessibility for Ontarians with Disabilities Act.',
          placeholder: 'Answer 1',
          multiLine: true,
          lines: 2,
          autoGrow: 2,
          allowLinebreaks: true,
        },
        {
          type: 'Textbox',
          label: 'Answer 2',
          value: "Association for Ontario's Disabled Adults.",
          placeholder: 'Answer 2',
          multiLine: true,
          lines: 2,
          autoGrow: 2,
          allowLinebreaks: true,
        },
        {
          type: 'Textbox',
          label: 'Answer 3',
          value: 'Act for Ontarians with Disabilities and Afflictions.',
          placeholder: 'Answer 3',
          multiLine: true,
          lines: 2,
          autoGrow: 2,
          allowLinebreaks: true,
        },
      ],
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
              name: 'Align Center',
              value: 'center',
              icon: 'align_horizontal_center',
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
