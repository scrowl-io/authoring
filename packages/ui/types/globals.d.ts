import { UI_PROPS } from '../src/ui.types';

declare global {
  interface Window {
    Scrowl: {
      ui: UI_PROPS;
    };
  };
};