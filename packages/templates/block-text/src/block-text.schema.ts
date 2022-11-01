import { BlockTextSchemaProps } from './block-text.types';

export const BlockTextSchema: BlockTextSchemaProps = {
  meta: {
    version: "1.0.0",
    label: "Text Block",
    component: "BlockText",
    filename: "block-text"
  },
  content: {
    text: {
      type: 'Textbox',
      label: 'Block Text',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
        }
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
            { name: 'Align Left', value: 'left', icon: 'align_horizontal_left' },
            { name: 'Align Right', value: 'right', icon: 'align_horizontal_right' },
          ],
          pre: {
            width: 26,
            items: [
              {
                type: 'icon',
                name: 'align_horizontal_left',
              },
            ]
          }
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
  BlockTextSchema,
};
