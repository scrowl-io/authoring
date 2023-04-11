import { SimpleTextSchemaProps } from './simple-text.types';

export const SimpleTextSchema: SimpleTextSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Simple Text',
    component: 'SimpleText',
    filename: 'simple-text',
    tags: ['text'],
    icon: 'notes',
  },
  content: {
    text: {
      type: 'Textbox',
      label: 'Text',
      value:
        '# Starting \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!',
      placeholder: 'Enter your text',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    animateLists: {
      type: 'Select',
      label: 'Animations',
      value: 'all',
      options: [
        { name: 'No Animation', value: 'none' },
        { name: 'Lists & Paragraphs', value: 'all' },
      ],
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
          value: 'center',
          options: [
            {
              name: 'Full Justify',
              value: 'justify',
              icon: 'align_horizontal_right',
            },
            {
              name: 'Align Left',
              value: 'left',
              icon: 'align_horizontal_left',
            },
            {
              name: 'Align Center',
              value: 'center',
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
  SimpleTextSchema,
};
