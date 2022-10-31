import {
  TemplateContent,
  LAYOUT_INPUT_TYPE,
  MIGRATION_HINT,
} from '@scrowl/template-core';

export const TwoColumnSchema: TemplateContent = {
  // textLeft: {
  //   type: LAYOUT_INPUT_TYPE.Textbox,
  //   hint: MIGRATION_HINT.BodyText,
  //   label: 'Block Text',
  //   value:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   placeholder: 'Write content here...',
  //   multiLine: true,
  //   lines: 10,
  //   autoGrow: 10,
  //   allowLinebreaks: true,
  // },
  leftColumn: {
    headingLeft: {
      type: LAYOUT_INPUT_TYPE.Textbox,
      label: 'Left Heading',
      value: 'Left Heading',
      placeholder: 'Left Heading',
      multiline: true,
      lines: 5,
      autoGrow: 10,
      allowLineBreaks: true,
    },
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
  },
  rightColumn: {
    headingRight: {
      type: LAYOUT_INPUT_TYPE.Textbox,
      label: 'Right Heading',
      value: 'Right Heading',
      placeholder: 'Right Heading',
      multiline: true,
      lines: 5,
      autoGrow: 10,
      allowLineBreaks: true,
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
  },
  middleColumn: {
    headingMiddle: {
      type: LAYOUT_INPUT_TYPE.Textbox,
      label: 'Middle Heading',
      value: 'Middle Heading',
      placeholder: 'Middle Heading',
      multiline: true,
      lines: 5,
      autoGrow: 10,
      allowLineBreaks: true,
    },
    textMiddle: {
      type: LAYOUT_INPUT_TYPE.Textbox,
      hint: MIGRATION_HINT.BodyText,
      label: 'Block Text',
      value:
        'This is the middle text... ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
  },
  columnOptions: {
    numberOfColumns: 2,
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
  TwoColumnSchema,
};
