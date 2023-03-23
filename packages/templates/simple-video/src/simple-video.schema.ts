import { SimpleVideoSchemaProps } from './simple-video.types';

export const SimpleVideoSchema: SimpleVideoSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Simple Video',
    component: 'SimpleVideo',
    filename: 'simple-video',
    icon: 'view_week',
    tags: ['text', 'columns'],
  },
  content: {
    text: {
      type: 'Textbox',
      label: 'Video Text',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      placeholder: 'Write content here...',
      multiLine: true,
      lines: 10,
      autoGrow: 10,
      allowLinebreaks: true,
    },
    videoAsset: {
      type: 'Fieldset',
      label: 'Video',
      content: {
        alt: {
          type: 'Textbox',
          label: 'Alt Text',
          placeholder: 'Image alt text',
        },
        assetUrl: {
          type: 'Asset',
          assetTypes: ['video'],
          label: 'Video',
        },
        webUrl: {
          type: 'Textbox',
          label: 'Embed URL',
          placeholder: 'Embed URL',
          // value:
          //   'https://www.ted.com/talks/pia_mancini_how_to_upgrade_democracy_for_the_internet_era',
          // value: 'https://www.dailymotion.com/video/x873541',
          // value: 'https://vimeo.com/253989945',
          // value: 'https://www.youtube.com/watch?v=Z_ppk0iQnsA',
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
          value: true,
        },
      },
    },
  },
};

export default {
  SimpleVideoSchema,
};
