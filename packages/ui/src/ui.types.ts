import * as utils from './utils';
import { ButtonDefaultProps } from './button';
import { IconDefaultProps } from './icon';
import { TabsDefaultProps } from './tabs';

export type UI_PROPS = {
  utils: typeof utils;
  Button: (ButtonDefaultProps) => JSX.Element;
  Icon: (IconDefaultProps) => JSX.Element;
  Tabs: (TabsDefaultProps) => JSX.Element;
};