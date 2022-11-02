import { TwoColumnSchemaProps } from './two-column.types';

export const TwoColumnSchema: TwoColumnSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Two Column',
    component: 'TwoColumn',
    filename: 'two-column',
  },
  content: {
    options: {
      type: 'Fieldset',
      label: 'Options',
      content: {
        showProgress: {
          type: 'Checkbox',
          label: 'Show Progress Bar',
          value: false,
        },
        numberOfColumns: {
          type: 'Radio',
          label: 'Number of Columns',
          value: 3,
          options: [
            {
              label: '1',
              value: 1,
              icon: 'number_of_columns_1',
              inputControls: ['1', '2'],
            },
            {
              label: '2',
              value: 2,
              icon: 'number_of_columns_2',
              inputControls: ['2'],
            },
            {
              label: '3',
              value: 3,
              icon: 'number_of_columns_3',
              inputControls: [''],
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
  },
};

export default {
  TwoColumnSchema,
};
