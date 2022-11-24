import React, { useEffect } from 'react';
import * as css from './_page-workspace.scss';
import {
  useProcessor,
  openPromptProjectName,
  resetWorkspace,
  resetActiveSlide,
} from './page-workspace-hooks';
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
import { menu, sys } from '../../services';
import { ProjectBrowser } from '../../components';

export const Path = '/workspace';

export const openProject = (project: Projects.ProjectMeta) => {
  Projects.open(project).then((res) => {
    if (res.error) {
      sys.messageDialog({
        message: res.message,
      });
      return;
    }

    Projects.resetState();
    resetWorkspace();
    resetActiveSlide();

    setTimeout(() => {
      Projects.setData(res.data.project);
    }, 1);
  });
};

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

    const openListener = (ev, project?: Projects.ProjectMeta) => {
      if (project) {
        openProject(project);
        return;
      }

      Projects.openProjectBrowser();
    };

    menu.API.onProjectSave(saveListener);
    menu.API.onProjectOpen(openListener);

    return () => {
      isListening = false;
      menu.API.offProjectSave();
      menu.API.offProjectOpen();
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
      <ProjectBrowser />
    </>
  );
};

export default {
  Path,
  Page,
  openProject,
};
