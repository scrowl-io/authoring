import React, { useEffect, useState, useRef } from 'react';
import * as css from './_page-workspace.scss';
import {
  openPromptProjectName,
  resetWorkspace,
  resetActiveSlide,
  useActiveSlide,
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
import { Projects, Settings } from '../../models';
import { menu, sys } from '../../services';

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
  const projectData = Projects.useData();
  const assets = Projects.useAssets();
  const activeSlide = useActiveSlide() as Projects.ProjectSlide;
  const projectInteractions = Projects.useInteractions();
  const [inProgress, setProgress] = useState(false);
  const isListening = useRef(false);

  useEffect(() => {
    isListening.current = true;

    const saveListener = () => {
      Projects.save({ data: projectData, assets }).then((res) => {
        if (!isListening.current) {
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

    const previewListener = (ev, type: menu.PreviewTypes) => {
      const payload: Projects.PreviewProjectReq = {
        type,
        project: projectData,
        assets,
      };

      switch (type) {
        case 'slide':
          payload.id = activeSlide.id;
          break;
        case 'lesson':
          payload.id = activeSlide.lessonId;
          break;
        case 'module':
          payload.id = activeSlide.moduleId;
          break;
      }

      Settings.setPreviewMode(type);
      Projects.preview(payload).then((res) => {
        if (res.error) {
          sys.messageDialog({
            message: res.message,
          });
          return;
        }

        console.log('preview result', res);
      });
    };

    const createListener = () => {
      if (inProgress) {
        return;
      }

      const createNewProject = () => {
        setProgress(true);
        Projects.resetState();
        resetWorkspace();
        resetActiveSlide();

        Projects.create().then((result) => {
          if (result.error) {
            setProgress(false);
            console.error(result);
            return;
          }
        });
      };

      const promptDiscardProject = () => {
        sys
          .messageDialog({
            type: 'question',
            title: 'Confirm',
            message: 'Create new Project Without Saving?',
            detail: 'Your changes are not saved.',
            buttons: ['Save Project', 'Discard and Create New', 'Cancel'],
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            switch (res.data.response) {
              case 0:
                Projects.save({
                  data: projectData,
                  assets,
                }).then((saveRes) => {
                  if (saveRes.data && saveRes.data.action) {
                    switch (saveRes.data.action) {
                      case 'prompt-project-name':
                        openPromptProjectName();
                        break;
                    }
                    return;
                  } else if (saveRes.error) {
                    sys.messageDialog({
                      message: res.message,
                    });
                    return;
                  }

                  createNewProject();
                });
                break;
              case 1:
                createNewProject();
                break;
            }
          });
      };

      if (
        projectInteractions.isNew ||
        projectInteractions.isDirty ||
        projectInteractions.isUncommitted
      ) {
        promptDiscardProject();
        return;
      }

      createNewProject();
    };

    menu.API.onProjectCreate(createListener);
    menu.API.onProjectSave(saveListener);
    menu.API.onProjectOpen(openListener);
    menu.API.onPreviewOpen(previewListener);

    return () => {
      isListening.current = false;
      menu.API.offProjectCreate();
      menu.API.offProjectSave();
      menu.API.offProjectOpen();
      menu.API.offPreviewOpen();
    };
  }, [projectData, assets, activeSlide, projectInteractions, inProgress]);

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
  openProject,
};
