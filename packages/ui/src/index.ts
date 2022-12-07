import './theme/_index.scss';
import * as utils from './utils'; 
import * as btn from './button';

export * from './utils/utils.types';
export * from './button/button.types';

export const ui = {
  utils,
  ...btn
};

export default ui;
