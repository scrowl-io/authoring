import { LessonIntroSchemaProps } from './lesson-intro.types';

export const LessonIntroSchema: LessonIntroSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Text Block',
    component: 'BlockText',
    filename: 'block-text',
  },
  content: {
    lessonTitle: {
      type: 'Textbox',
      label: 'Title',
      value: 'Enter Your New Title',
      placeholder: 'Title',
      multiLine: false,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    lessonSubtitle: {
      type: 'Textbox',
      label: 'Subtitle',
      value: 'Subtitle',
      placeholder: 'Subtitle',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    lessonTime: {
      type: 'Textbox',
      label: 'Time',
      value: 'Time',
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
    heroImage: {
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
          assetType: 'image',
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
          value: false,
        },
      },
    },
  },
};

export default {
  LessonIntroSchema,
};
