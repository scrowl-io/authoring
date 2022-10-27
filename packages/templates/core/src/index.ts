import anime from 'animejs';
import scroll from 'scrollmagic';
import * as template from './template';
import * as markdown from './markdown';

export * from './core.types';
export * from './template/template.types';

export const core = {
  ...template,
  ...markdown,
  anime,
  scroll,
};

export default {
  core,
};
