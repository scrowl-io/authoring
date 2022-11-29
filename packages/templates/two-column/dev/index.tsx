import '@owlui/lib/dist/owl.lib.css';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { TwoColumn, TwoColumnSchema, TwoColumnSchemaProps } from '../src';

document.body.className = `${css.body} owlui-theme--default`;

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const schema = TwoColumnSchema as TwoColumnSchemaProps;
  const controller = new Scrowl.core.scroll.Controller();

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  });

  return (
    <TwoColumn
      id="template-two-column"
      controller={controller}
      schema={schema}
    />
  );
};

root.render(<App />);
