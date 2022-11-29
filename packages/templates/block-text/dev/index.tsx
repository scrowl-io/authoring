import React from 'react';
import { createRoot } from 'react-dom/client';
import '@owlui/lib/dist/owl.lib.css';
import './_index.scss';
import Scrowl from '@scrowl/template-core';
import { BlockText, BlockTextSchema, BlockTextSchemaProps } from '../src';

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = BlockTextSchema as BlockTextSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <BlockText
          id="template-block-text"
          controller={controller}
          schema={schema}
        />
      </div>
    </div>
  );
};

root.render(<App />);
