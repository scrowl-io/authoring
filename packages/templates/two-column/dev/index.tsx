import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { core } from '@scrowl/template-core';
import { ui } from '@scrowl/ui';
import './_index.scss';
import { TwoColumnSchema, TwoColumnSchemaProps } from '../src';
const TwoColumn = React.lazy(() => import('../src/two-column'));

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);
const Scrowl = {
  core,
  ui,
};
window['Scrowl'] = Scrowl;

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = TwoColumnSchema as TwoColumnSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <Suspense fallback={<div>Loading...</div>}>
          <TwoColumn
            editMode={true}
            id="template-two-columns"
            controller={controller}
            schema={schema}
          />
        </Suspense>
      </div>
    </div>
  );
};

root.render(<App />);
