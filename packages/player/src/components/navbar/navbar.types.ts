import React from 'react';
import { PlayerRootConfig } from '../../root';

export interface NavbarCommons {
  rootConfig: Array<PlayerRootConfig>;
}

export type NavbarProps = NavbarCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
