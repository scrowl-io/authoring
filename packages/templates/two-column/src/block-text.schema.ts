import {
  TemplateContent,
  LAYOUT_INPUT_TYPE,
  MIGRATION_HINT,
} from '@scrowl/template-core';

export const BlockTextSchema: TemplateContent = {
  textLeft: {
    type: LAYOUT_INPUT_TYPE.Textbox,
    hint: MIGRATION_HINT.BodyText,
    label: 'Block Text',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    placeholder: 'Write content here...',
    multiLine: true,
    lines: 10,
    autoGrow: 10,
    allowLinebreaks: true,
  },
  textRight: {
    type: LAYOUT_INPUT_TYPE.Textbox,
    hint: MIGRATION_HINT.BodyText,
    label: 'Block Text',
    value:
      'DIFFERENT TEXT ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    placeholder: 'Write content here...',
    multiLine: true,
    lines: 10,
    autoGrow: 10,
    allowLinebreaks: true,
  },
  bgImage: {
    type: LAYOUT_INPUT_TYPE.Fieldset,
    label: 'Background Image',
    fields: {
      alt: {
        type: LAYOUT_INPUT_TYPE.Textbox,
        label: 'Alt Text',
        placeholder: 'Image alt text',
      },
      url: {
        type: LAYOUT_INPUT_TYPE.Asset,
        assetType: 'image',
        label: 'Image',
      },
      bg: {
        type: LAYOUT_INPUT_TYPE.Checkbox,
        label: 'Use as Background',
        value: false,
      },
    },
  },
  options: {
    type: LAYOUT_INPUT_TYPE.Fieldset,
    label: 'Options',
    fields: {
      alignment: {
        type: LAYOUT_INPUT_TYPE.Select,
        hint: MIGRATION_HINT.BodyAlignment,
        label: 'Alignment',
        value: 'left',
        options: [
          { name: 'Align Left', value: 'left', icon: 'align_horizontal_left' },
          {
            name: 'Align Right',
            value: 'right',
            icon: 'align_horizontal_right',
          },
        ],
        pre: {
          width: 26,
          items: [
            {
              type: 'icon',
              name: 'align_horizontal_left',
            },
          ],
        },
      },
      showProgress: {
        type: LAYOUT_INPUT_TYPE.Checkbox,
        label: 'Show Progress Bar',
        value: false,
      },
    },
  },
};

export default {
  BlockTextSchema,
};
