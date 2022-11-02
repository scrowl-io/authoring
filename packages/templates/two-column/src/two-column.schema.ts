import { TwoColumnSchemaProps } from './two-column.types';

export const TwoColumnSchema: TwoColumnSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Two Column',
    component: 'TwoColumn',
    filename: 'two-column',
  },
  content: {
    firstColumnHeading: {
      type: 'Textbox',
      label: 'First Column Heading',
      value: 'First',
      placeholder: 'First ',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    firstColumnText: {
      type: 'Textbox',
      label: 'First Column Text',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write text content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    secondColumnHeading: {
      type: 'Textbox',
      label: 'Second Column Heading',
      value: 'Second',
      placeholder: 'Second',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    secondColumnText: {
      type: 'Textbox',
      label: 'Second Column Text',
      value:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      placeholder: 'Write text content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    thirdColumnHeading: {
      type: 'Textbox',
      label: 'Third Column Heading',
      value: 'Third',
      placeholder: 'Third',
      multiLine: true,
      lines: 5,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    thirdColumnText: {
      type: 'Textbox',
      label: 'Third Column Text',
      value:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Ut tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      placeholder: 'Write text content here...',
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
        numberOfColumns: {
          type: 'Select',
          label: 'Number of Columns',
          value: 3,
          options: [
            {
              name: '1',
              value: 1,
              icon: 'number_of_columns_1',
            },
            {
              name: '2',
              value: 2,
              icon: 'number_of_columns_2',
            },
            {
              name: '1',
              value: 1,
              icon: 'number_of_columns_3',
            },
          ],
          iconFromValue: true,
        },
        stackOnMobile: {
          type: 'Checkbox',
          label: 'Stack On Mobile',
          value: true,
        },
      },
    },
  },
};

export default {
  TwoColumnSchema,
};
