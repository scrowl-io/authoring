import React from 'react';
import * as css from './_page-workspace.scss';
import { useProcessor } from './page-workspace-hooks';
import {
  Overlay,
  Header,
  PaneDetails,
  Canvas,
  PaneEditor,
  StatusBar,
} from './components';

export const Path = '/workspace';

export const Page = () => {
  useProcessor();

  return (
    <>
      <Overlay />
      <div className={css.workspace}>
        <Header />
        <PaneDetails />
        <Canvas />
        <PaneEditor />
        <StatusBar />
      </div>
    </>
  );
};

export default {
  Path,
  Page,
};
