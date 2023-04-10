import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { core } from '@scrowl/template-core';
import { ui } from '@scrowl/ui';
import './_index.scss';
import { QuizSchema, QuizSchemaProps } from '../src';
const Quiz = React.lazy(() => import('../src/quiz'));

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);
const Scrowl = {
  core,
  ui,
};
window['Scrowl'] = Scrowl;

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = QuizSchema as QuizSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <Suspense fallback={<div>Loading...</div>}>
          <Quiz
            editMode={true}
            id="template-quiz"
            controller={controller}
            schema={schema}
          />
        </Suspense>
      </div>
    </div>
  );
};

root.render(<App />);
