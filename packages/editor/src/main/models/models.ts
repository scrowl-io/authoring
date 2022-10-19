import { Model } from './models.types';
import * as settings from './settings';
import * as projects from './projects';
import * as templates from './templates';

export const init = () => {
  const models = [settings, projects, templates];
  
  models.forEach((model: Model) => {
    if (model.init) {
      model.init();
    }
  });
};

export default {
  init,
};
