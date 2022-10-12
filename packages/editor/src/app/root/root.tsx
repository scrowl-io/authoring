import React, { useEffect, useState } from 'react';
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

const Loader = () => {
  return <div>Loading...</div>;
};

const PageRoutes = () => {
  const isFirstLoad = models.Settings.useFirstLoad();
  let defaultPath = isFirstLoad ? pages.Welcome.Path : pages.Start.Path;
  const pageModules = pages as Pages;
  const pageNames = Object.keys(pageModules);

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

  models.Settings.useProcessor();

  useEffect(() => {
    let initd = false;

    modelNames.map((name) => {
      const model = modelModules[name];

      if (!model.init) {
        return;
      }

      inits.push(model.init());
    });

    Promise.allSettled(inits).then(() => {
      if (initd) {
        return;
      }

      setIsReady(true);
    });

    return () => {
      initd = true;
    };
  }, [modelModules, modelNames, inits]);

  return (
    <Router>
      <main>{!isReady ? <Loader /> : <PageRoutes />}</main>
    </Router>
  );
};
