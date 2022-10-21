import { LAYOUT_INPUT_TYPE } from '../pane-editor.types';
import { ImageAsset, Checkbox, NumberSpinner, Select, Textbox } from './';

export const InputFactory = (type: LAYOUT_INPUT_TYPE): any => {
  switch (type) {
    case LAYOUT_INPUT_TYPE.Textbox:
      return Textbox;
    case LAYOUT_INPUT_TYPE.Asset:
      return ImageAsset;
    case LAYOUT_INPUT_TYPE.Checkbox:
      return Checkbox;
    case LAYOUT_INPUT_TYPE.Select:
      return Select;
    case LAYOUT_INPUT_TYPE.NumberSpinner:
      return NumberSpinner;

    default:
      console.error('Invalid Input Type: ' + type);
      return Textbox;
  }
};

export default {
  InputFactory,
};
