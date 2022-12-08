import * as bs from 'react-bootstrap';

export interface ButtonDefaultCommons {
  prefix?: string;
  theme?: 'Default' | 'Dark';
  pxScale?: 'Sm' | 'Md' | 'Lg';
}

export type ButtonDefaultProps = Partial<ButtonDefaultCommons> & bs.ButtonProps;