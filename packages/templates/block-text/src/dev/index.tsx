import '@owlui/lib/dist/owl.lib.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { scroll } from '@scrowl/template-core';
import * as css from './_index.scss';
import { BlockText, BlockTextSchema, BlockTextLayout } from '../index';

document.body.className = `${css.body} owlui-theme--default`;

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const layout = BlockTextSchema as BlockTextLayout;
  const controller = new scroll.Controller();
  layout.options.fields.showProgress.value = true;
  return (
    <BlockText
      id="template-block-text"
      templateKey="BlockText@1.0.0"
      duration={0}
      controller={controller}
      layout={layout}
    />
  );
};

root.render(<App />);
