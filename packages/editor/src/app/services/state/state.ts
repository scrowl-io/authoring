import { configureStore } from '@reduxjs/toolkit';
import { StoreConfig } from './state.types';
import * as models from '../../models';
import * as pages from '../../pages';

export const init = () => {
  const modelNames = Object.keys(models);
  const pageNames = Object.keys(pages);
  const config: StoreConfig = {
    reducer: {},
  };
  const addGlobalState = (entity) => {
    if (!entity.state || !entity.state.reducer || !entity.state.config.name) {
      return;
    }

    config.reducer[entity.state.config.name] = entity.state.reducer;
  };

  modelNames.forEach((name) => {
    addGlobalState(models[name]);
  });

  pageNames.forEach((name) => {
    addGlobalState(pages[name]);
  });

  return configureStore(config);
};

export default {
  init,
};
