import { Model } from './models.types';
import * as settings from './settings';
import * as projects from './projects';

export const init = () => {
  const models = [settings, projects];
  
  models.forEach((model: Model) => {
    if (model.init) {
      model.init();
    }
  });
};

export default {
  init,
};
