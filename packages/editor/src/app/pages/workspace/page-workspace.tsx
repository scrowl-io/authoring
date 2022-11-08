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
} from './components';
import { Projects } from '../../models';
import { menu } from '../../services';

export const Path = '/workspace';

export const Page = () => {
  useProcessor();

  const projectData = Projects.useData();

  useEffect(() => {
    let isListening = true;

    const saveListener = () => {
      Projects.save(projectData).then((res) => {
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
    </>
  );
};

export default {
  Path,
  Page,
};
