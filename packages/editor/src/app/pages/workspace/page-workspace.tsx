import React, { useEffect } from 'react';
import * as css from './_page-workspace.scss';
import { useProcessor, openPromptProjectName } from './page-workspace-hooks';
import {
  Header,
  PaneDetails,
  Canvas,
  PaneEditor,
  TemplateBrowser,
  PromptProjectName,
  PublishProgress,
} from './components';
import { Projects } from '../../models';
import { menu } from '../../services';

export const Path = '/workspace';

export const Page = () => {
  useProcessor();

  const projectData = Projects.useData();
  const assets = Projects.useAssets();

  useEffect(() => {
    let isListening = true;

    const saveListener = () => {
      Projects.save({ data: projectData, assets }).then((res) => {
        if (!isListening) {
          return;
        }

        if (res.data && res.data.action) {
          switch (res.data.action) {
            case 'prompt-project-name':
              openPromptProjectName();
              break;
          }
          return;
        }

        if (res.error) {
          console.error(res);
          return;
        }

        // notification - project saved correctly
      });
    };

    menu.API.onProjectSave(saveListener);

    return () => {
      isListening = false;
      menu.API.offProjectSave();
    };
  }, [projectData]);

  return (
    <>
      <div className={css.workspace}>
        <Header />
        <PaneDetails />
        <Canvas />
        <PaneEditor />
      </div>
      <TemplateBrowser />
      <PromptProjectName />
      <PublishProgress />
    </>
  );
};

export default {
  Path,
  Page,
};
