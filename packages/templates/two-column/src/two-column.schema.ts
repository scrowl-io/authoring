import { TwoColumnSchemaProps } from './two-column.types';

export const TwoColumnSchema: TwoColumnSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Two Column',
    component: 'TwoColumn',
    filename: 'two-column',
    icon: 'view_week',
    tags: ['text', 'columns'],
  },
  content: {
    options: {
      type: 'Fieldset',
      label: 'Columns',
      content: {
        numberOfColumns: {
          type: 'Radio',
          label: 'Number of Columns',
          value: 3,
          options: [
            {
              label: 'One column',
              value: 1,
              icon: 'crop_portrait',
              controller: {
                fields: ['secondColumn', 'thridColumn'],
                effect: 'hide',
              },
            },
            {
              label: 'Two columns',
              value: 2,
              icon: 'view_column_2',
              controller: {
                fields: ['thridColumn'],
                effect: 'hide',
              },
            },
            {
              label: 'Three columns',
              value: 3,
              icon: 'view_week',
            },
          ],
        },
        stackOnMobile: {
          type: 'Checkbox',
          label: 'Stack On Mobile',
          value: true,
        },
      },
    },
    firstColumn: {
      type: 'Fieldset',
      label: 'First Column',
      content: {
        heading: {
          type: 'Textbox',
          label: 'Heading',
          placeholder: 'Heading',
          value: 'Heading 1',
        },
        body: {
          type: 'Textbox',
          label: 'body',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          placeholder: 'Write content here...',
          multiLine: true,
          lines: 3,
          autoGrow: 5,
          allowLinebreaks: true,
        },
      },
    },
    secondColumn: {
      type: 'Fieldset',
      label: 'Second Column',
      content: {
        heading: {
          type: 'Textbox',
          label: 'Heading',
          placeholder: 'Heading',
          value: 'Heading 2',
        },
        body: {
          type: 'Textbox',
          label: 'body',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          placeholder: 'Write content here...',
          multiLine: true,
          lines: 3,
          autoGrow: 5,
          allowLinebreaks: true,
        },
      },
    },
    thirdColumn: {
      type: 'Fieldset',
      label: 'Third Column',
      content: {
        heading: {
          type: 'Textbox',
          label: 'Heading',
          placeholder: 'Heading',
          value: 'Heading 3',
        },
        body: {
          type: 'Textbox',
          label: 'body',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          placeholder: 'Write content here...',
          multiLine: true,
          lines: 3,
          autoGrow: 5,
          allowLinebreaks: true,
        },
      },
    },
  },
};

export default {
  TwoColumnSchema,
};
