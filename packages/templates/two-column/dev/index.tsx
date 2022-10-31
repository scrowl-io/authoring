import '@owlui/lib/dist/owl.lib.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { TwoColumn, TwoColumnSchema, TwoColumnLayout } from '../src';

document.body.className = `${css.body} owlui-theme--default`;

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const layout = TwoColumnSchema as TwoColumnLayout;
  const controller = new Scrowl.core.scroll.Controller();
  layout.options.fields.showProgress.value = true;
  return (
    <TwoColumn
      id="template-block-text"
      templateKey="BlockText@1.0.0"
      duration={0}
      controller={controller}
      layout={layout}
    />
  );
};

root.render(<App />);
