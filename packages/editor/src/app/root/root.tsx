import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './_root.scss';
import {
  MemoryRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Pages, Models } from './root.types';
import { rq, sys } from '../services';
import * as pages from '../pages';
import * as models from '../models';
import { menu, events, config } from '../services';
import { Elem } from '../utils';
import { ProjectBrowser, ContextMenu } from '../components';

const Loader = () => {
  return <div>Loading...</div>;
};

const PageRoutes = () => {
  const navigate = useNavigate();
  const hasWelcomed = models.Settings.useHasWelcomed();
  const saveStatus = models.Projects.useInteractions();
  const projectData = models.Projects.useData();
  const assets = models.Projects.useAssets();
  let defaultPath = hasWelcomed ? pages.Start.Path : pages.Welcome.Path;
  const pageModules = pages as Pages;
  const pageNames = Object.keys(pageModules);

  pageNames.map((page: string) => {
    const pageModule = pageModules[page];

    if (pageModule.useProcessor) {
      pageModule.useProcessor();
    }
  });

  useEffect(() => {
    const closeListener = (ev: React.FormEvent) => {
      Elem.stopEvent(ev);

      const closeProject = () => {
        models.Projects.resetState();
        pages.Workspace.resetWorkspace();
        pages.Workspace.resetActiveSlide();

        setTimeout(() => {
          navigate(defaultPath);
        }, 1);
      };

      const promptDiscardProject = () => {
        sys
          .messageDialog({
            type: 'question',
            title: 'Confirm',
            message: 'Close Project Without Saving?',
            detail: 'Your changes are not saved.',
            buttons: ['Save and Close', 'Discard and Close', 'Cancel'],
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            switch (res.data.response) {
              case 0:
                models.Projects.save({
                  data: projectData,
                  assets,
                }).then((saveRes) => {
                  if (saveRes.data && saveRes.data.action) {
                    switch (saveRes.data.action) {
                      case 'prompt-project-name':
                        pages.Workspace.openPromptProjectName({
                          action: events.project.EVENTS.close,
                        });
                        break;
                    }
                    return;
                  } else if (saveRes.error) {
                    sys.messageDialog({
                      message: res.message,
                    });
                    return;
                  }

                  closeProject();
                });
                break;
              case 1:
                closeProject();
                break;
            }
          });
      };

      if (saveStatus.isUncommitted) {
        promptDiscardProject();
        return;
      }

      closeProject();
    };

    menu.API.onProjectClose(closeListener);
    events.project.onClose(closeListener);

    models.Projects.API.onUnsavedCheck(() => {
      models.Projects.API.sendUnsavedStatus({
        status: saveStatus,
        project: {
          data: projectData,
          assets,
        },
      });
    });

    return () => {
      menu.API.offProjectClose();
      events.project.offClose(closeListener);
      models.Projects.API.offUnsavedCheck();
    };
  }, [saveStatus, projectData, assets]);

  return (
    <Routes>
      {pageNames.map((page: string, idx: number) => {
        const pageModule = pageModules[page];

        return (
          <Route
            key={idx}
            path={pageModule.Path}
            element={<pageModule.Page />}
          />
        );
      })}
      <Route path="*" element={<Navigate to={defaultPath} />} />
    </Routes>
  );
};

export const Root = () => {
  const modelModules = models as Models;
  const modelNames = Object.keys(modelModules);
  const inits: Array<Promise<rq.ApiResult>> = [];
  const [isReady, setIsReady] = useState(false);
  const isDesktop = config.app.desktop;

  models.Settings.useProcessor();
  models.Projects.useProcessor();

  useEffect(() => {
    if (isReady) {
      return;
    }

    modelNames.map((name) => {
      const model = modelModules[name];

      if (!model.init) {
        return;
      }

      inits.push(model.init(), menu.API.disableProjectActions());
    });

    Promise.allSettled(inits).then(() => {
      setIsReady(true);
    });
  }, [modelModules, modelNames, inits]);

  if (isDesktop) {
    return (
      <MemoryRouter>
        <main>{!isReady ? <Loader /> : <PageRoutes />}</main>
        <ProjectBrowser />
        <ContextMenu.Menu />
      </MemoryRouter>
    );
  } else {
    return (
      <BrowserRouter basename="/app">
        <main>{!isReady ? <Loader /> : <PageRoutes />}</main>
        <ProjectBrowser />
        <ContextMenu.Menu />
      </BrowserRouter>
    );
  }
};
