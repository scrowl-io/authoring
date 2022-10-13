import React from 'react';
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
