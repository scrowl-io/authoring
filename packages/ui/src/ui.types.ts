import React from 'react';
import * as utils from './utils';
import { ButtonDefaultProps } from './button';
import { IconDefaultProps } from './icon';
import { TabsDefaultProps } from './tabs';

export interface RefForwardingComponent<P = unknown> {
  (props: React.PropsWithChildren<P>, context?: any): React.ReactElement | null;
}

export type UI_PROPS = {
  utils: typeof utils;
  Button: RefForwardingComponent<ButtonDefaultProps>;
  Icon: RefForwardingComponent<IconDefaultProps>;
  Tabs: (TabsDefaultProps) => JSX.Element;
};