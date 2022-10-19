import React from 'react';
import * as css from './_page-workspace.scss';
import { Overlay, Header, PaneDetails, Canvas, PaneEditor } from './components';

export const Path = '/workspace';

export const Page = () => {
  return (
    <>
      <Overlay />
      <div className={css.workspace}>
        <Header />
        <PaneDetails />
        <Canvas />
        <PaneEditor />
      </div>
    </>
  );
};

export default {
  Path,
  Page,
};
