import { SimpleTextSchemaProps } from './simple-text.types';

export const SimpleTextSchema: SimpleTextSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Text Block',
    component: 'BlockText',
    filename: 'block-text',
  },
  content: {
    text: {
      type: 'Textbox',
      label: 'Block Text',
      value: '## Welcome to your project!',
      placeholder: 'Write content here...',
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
  SimpleTextSchema,
};
