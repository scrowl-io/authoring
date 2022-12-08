import React from 'react';
import * as bs from 'react-bootstrap';

// eslint-disable-next-line import/namespace
export interface TabsItem extends bs.TabProps {
  title: string;
  view: React.ReactNode;
}

export interface TabsDefaultCommons {
  theme?: 'Default' | 'Dark';
  pxScale?: 'Sm' | 'Md' | 'Lg';
  prefix?: string;
  items: TabsItem[];
}

export type TabsDefaultProps = TabsDefaultCommons & bs.TabsProps;