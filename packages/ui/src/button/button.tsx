import React, { forwardRef } from 'react';
import { Button as BsButton, ThemeProvider } from 'react-bootstrap';
import { ButtonDefaultProps } from './button.types';
import { ThemePrefixesProps } from '../utils';

export const Button = forwardRef<HTMLButtonElement, ButtonDefaultProps>(
  ({ children, ...props }, ref) => {
    const themePrefixes: ThemePrefixesProps = {};
    const baseClass = 'btn';

    themePrefixes[baseClass] = `owlui-${baseClass}`;

    return (
      <ThemeProvider prefixes={themePrefixes}>
        <BsButton ref={ref} {...props}>
          {children}
        </BsButton>
      </ThemeProvider>
    );
  }
);

export default {
  Button,
};
