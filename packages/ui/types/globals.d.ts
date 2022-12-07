import { ui, ButtonDefaultProps, IconDefaultCommons, IconDefaultProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      ui: {
        utils: typeof ui.utils;
        Button: (ButtonDefaultProps) => JSX.Element;
        Icon: (IconDefaultProps) => JSX.Element;
      };
    };
  };
};