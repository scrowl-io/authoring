import { TwoColumnSchemaProps } from './two-column.types';

export const TwoColumnSchema: TwoColumnSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Two Column',
    component: 'TwoColumn',
    filename: 'two-column',
  },
  content: {
    headingLeft: {
      type: 'Textbox',
      label: 'Left Heading',
      value: 'Left Heading',
      placeholder: 'Left Heading',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    textLeft: {
      type: 'Textbox',
      label: 'Left Content',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    headingRight: {
      type: 'Textbox',
      label: 'Right Heading',
      value: 'Right Heading',
      placeholder: 'Right Heading',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    textRight: {
      type: 'Textbox',
      label: 'Right Content',
      value:
        'RIGHT DIFFERENT TEXT ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    headingMiddle: {
      type: 'Textbox',
      label: 'Middle Heading',
      value: 'Middle Heading',
      placeholder: 'Middle Heading',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    textMiddle: {
      type: 'Textbox',
      label: 'Middle Content',
      value:
        'This is the middle text... ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    columnOptions: {
      numberOfColumns: 3,
      stackOnMobile: true,
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
  TwoColumnSchema,
};
