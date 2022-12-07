import * as React from 'react';
import { Button as BsButton, ThemeProvider } from 'react-bootstrap';
import { ButtonDefaultProps } from './button.types';
import { ThemePrefixesProps } from '../utils';

export const Button = ({ children, ...props }: ButtonDefaultProps) => {
  const themePrefixes: ThemePrefixesProps = {};
  const baseClass = 'btn';

  themePrefixes[baseClass] = `owlui-${baseClass}`;

  return (
    <ThemeProvider prefixes={themePrefixes}>
      <BsButton {...props}>{children}</BsButton>
    </ThemeProvider>
  );
};

export default {
  Button,
};
