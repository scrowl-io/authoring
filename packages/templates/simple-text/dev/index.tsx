import React from 'react';
import { createRoot } from 'react-dom/client';
import '@owlui/lib/src/theme/_index.scss';
import './_index.scss';
import Scrowl from '@scrowl/template-core';
import { SimpleText, SimpleTextSchema, SimpleTextSchemaProps } from '../src';

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = SimpleTextSchema as SimpleTextSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <SimpleText
          editMode={true}
          id="template-simple-text"
          controller={controller}
          schema={schema}
        />
      </div>
    </div>
  );
};

root.render(<App />);
