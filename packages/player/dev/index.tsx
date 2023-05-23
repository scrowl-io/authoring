import React from 'react';
import { createRoot } from 'react-dom/client';
import { ui } from '@scrowl/ui';
import { core } from '@scrowl/template-core';
import BlockText from '@scrowl/template-block-text/src/block-text';
import LessonIntro from '@scrowl/template-lesson-intro/src/lesson-intro';
import SimpleText from '@scrowl/template-simple-text/src/simple-text';
import SimpleVideo from '@scrowl/template-simple-video/src/simple-video';
import TwoColumn from '@scrowl/template-two-column/src/two-column';
import './_index.scss';
import { player } from '../src';
import { create } from './project';

window['Scrowl'] = {
  core: core,
  ui: ui,
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const project = create();
  const templateList = {
    BlockText: BlockText,
    LessonIntro: LessonIntro,
    SimpleText: SimpleText,
    TwoColumn: TwoColumn,
    SimpleVideo: SimpleVideo,
  };
  // @ts-ignore
  return <player.Root project={project} templateList={templateList} />;
};

root.render(<App />);
