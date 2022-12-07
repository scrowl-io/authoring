import {
  ui,
  ButtonDefaultProps,
  IconDefaultProps,
  TabsDefaultProps,
} from '../src';

declare global {
  interface Window {
    Scrowl: {
      ui: {
        utils: typeof ui.utils;
        Button: (ButtonDefaultProps) => JSX.Element;
        Icon: (IconDefaultProps) => JSX.Element;
        Tabs: (TabsDefaultProps) => JSX.Element;
      };
    };
  };
};