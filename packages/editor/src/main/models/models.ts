import * as settings from './settings';

export const init = () => {
  const models = [settings];
  
  models.forEach((model) => {
    if (model.init) {
      model.init();
    }
  });
};

export default {
  init,
};
