import React from 'react';
import { createRoot } from 'react-dom/client';
import '@owlui/lib/src/theme/_index.scss';
import './_index.scss';
import Scrowl from '@scrowl/template-core';
import { LessonIntro, LessonIntroSchema, LessonIntroSchemaProps } from '../src';

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = LessonIntroSchema as LessonIntroSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <LessonIntro
          editMode={true}
          id="template-lesson-intro"
          controller={controller}
          schema={schema}
        />
      </div>
    </div>
  );
};

root.render(<App />);
