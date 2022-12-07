import './theme/_index.scss';
import * as utils from './utils'; 
import * as btn from './button';
import * as icon from './icon';

export * from './utils/utils.types';
export * from './button/button.types';
export * from './icon/icon.types';

export const ui = {
  utils,
  ...btn,
  ...icon,
};

export default ui;
