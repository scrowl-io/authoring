import { configureStore } from '@reduxjs/toolkit';
import { StoreConfig } from './state.types';
import * as models from '../../models';

export const init = () => {
  const modelNames = Object.keys(models);
  const config: StoreConfig = {
    reducer: {},
  };

  modelNames.forEach((name) => {
    if (!models[name].state || !models[name].state.reducer || !models[name].state.config.name) {
      return;
    }

    config.reducer[models[name].state.config.name] = models[name].state.reducer;
  });

  return configureStore(config);
};

export default {
  init,
};
