import './theme/_index.scss';
import * as utils from './utils'; 
import * as btn from './button';
import * as icon from './icon';
import * as tabs from './tabs';

export * from './utils/utils.types';
export * from './button/button.types';
export * from './icon/icon.types';
export * from './tabs/tabs.types';

export const ui = {
  utils,
  ...btn,
  ...icon,
  ...tabs,
};

export default ui;
