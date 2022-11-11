import '@owlui/lib/dist/owl.lib.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BlockText } from '@scrowl/template-block-text';
import { LessonIntro } from '@scrowl/template-lesson-intro';
import { SimpleText } from '@scrowl/template-simple-text';
import { TwoColumn } from '@scrowl/template-two-column';
import './_index.scss';
import { player } from '../src';
import { create } from './project';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const project = create();
  const templateList = {
    BlockText: BlockText,
    LessonIntro: LessonIntro,
    SimpleText: SimpleText,
    TwoColumn: TwoColumn,
  };

  return <player.Root project={project} templateList={templateList} />;
};

root.render(<App />);
