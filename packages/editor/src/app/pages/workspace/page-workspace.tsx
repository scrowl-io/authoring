import React from 'react';
import * as css from './_page-workspace.scss';
import { useProcessor } from './page-workspace-hooks';
import {
  Header,
  PaneDetails,
  Canvas,
  PaneEditor,
  TemplateBrowser,
} from './components';

export const Path = '/workspace';

export const Page = () => {
  useProcessor();

  return (
    <>
      <div className={css.workspace}>
        <Header />
        <PaneDetails />
        <Canvas />
        <PaneEditor />
      </div>
      <TemplateBrowser />
    </>
  );
};

export default {
  Path,
  Page,
};
