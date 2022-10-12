import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Pages } from './root.types';
import * as pages from '../pages';

export const Root = () => {
  const modules = pages as Pages;
  const pageKeys = Object.keys(modules);
  const defaultPath = pages.Welcome.Path;

  return (
    <Router>
      <main>
        <Routes>
          {pageKeys.map((page: string, idx: number) => {
            const config = modules[page];

            return (
              <Route key={idx} path={config.Path} element={<config.Page />} />
            );
          })}
          <Route path="*" element={<Navigate to={defaultPath} />} />
        </Routes>
      </main>
    </Router>
  );
};
