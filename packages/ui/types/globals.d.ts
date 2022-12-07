import { ui, ButtonDefaultProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      ui: {
        utils: typeof ui.utils;
        Button: (ButtonDefaultProps) => JSX.Element;
      };
    };
  };
};