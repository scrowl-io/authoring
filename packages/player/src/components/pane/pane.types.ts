import React from 'react';

export interface PaneCommons {
  side: 'left';
}

export type PaneProps = Partial<PaneCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;
