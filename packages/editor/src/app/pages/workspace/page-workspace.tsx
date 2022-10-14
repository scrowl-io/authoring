import React from 'react';
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
      <Header />
      <PaneDetails />
      <Canvas />
      <PaneEditor />
      <StatusBar />
    </>
  );
};

export default {
  Path,
  Page,
};
