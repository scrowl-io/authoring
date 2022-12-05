import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './_root.scss';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Pages, Models } from './root.types';
import { rq } from '../services';
import * as pages from '../pages';
import * as models from '../models';
import { menu } from '../services';
import { ProjectBrowser } from '../components';

const Loader = () => {
  return <div>Loading...</div>;
};

const PageRoutes = () => {
  const navigate = useNavigate();
  const hasWelcomed = models.Settings.useHasWelcomed();
  let defaultPath = hasWelcomed ? pages.Start.Path : pages.Welcome.Path;
  const pageModules = pages as Pages;
  const pageNames = Object.keys(pageModules);

  pageNames.map((page: string) => {
    const config = pageModules[page];

    if (config.useProcessor) {
      config.useProcessor();
    }
  });

  useEffect(() => {
    const closeProject = () => {
      models.Projects.resetState();
      pages.Workspace.resetWorkspace();
      pages.Workspace.resetActiveSlide();

      setTimeout(() => {
        navigate(defaultPath);
      }, 1);
    };

    menu.API.onProjectClose(closeProject);

    return () => {
      menu.API.offProjectClose();
    };
  });

  return (
    <Routes>
      {pageNames.map((page: string, idx: number) => {
        const config = pageModules[page];

        return <Route key={idx} path={config.Path} element={<config.Page />} />;
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
  const saveStatus = models.Projects.useInteractions();

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

  useEffect(() => {
    models.Projects.API.onUnsavedCheck(() => {
      models.Projects.API.sendUnsavedStatus(saveStatus);
    });

    return () => {
      models.Projects.API.offUnsavedCheck();
    };
  }, [saveStatus]);

  return (
    <Router>
      <main>{!isReady ? <Loader /> : <PageRoutes />}</main>
      <ProjectBrowser />
    </Router>
  );
};
