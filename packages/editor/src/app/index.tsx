import '@scrowl/ui/src/theme/_index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './root';
import { Provider } from 'react-redux';
import { stateManager } from './services';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const store = stateManager.init();

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
