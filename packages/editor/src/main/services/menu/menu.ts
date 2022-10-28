import { register } from './menu-api';
import { createMenu } from './menu-items';

export const init = () => {
  register();
  createMenu();
};

export default {
  init,
};
