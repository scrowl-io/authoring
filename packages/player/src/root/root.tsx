import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './_root.scss';
import { PlayerRootProps } from './root.types';
import Config from './config';
import { Error } from '../components';
import { Pages } from '../services';

export const Root = ({ project, templateList, ...props }: PlayerRootProps) => {
  const Scrowl = window['Scrowl'];

  if (Scrowl.runtime) {
    const [isStarted] = Scrowl.runtime.start();

    if (!isStarted) {
      console.error('unable to start runtime');
    }
  }

  if (!templateList || !Object.keys(templateList).length) {
    return <Error msg="Templates missing" />;
  }

  if (!project || !project.slides || !project.slides.length) {
    return <Error msg="Slides missing" />;
  }

  if (!project || !project.lessons || !project.lessons.length) {
    return <Error msg="Lessons missing" />;
  }

  if (!project || !project.modules || !project.modules.length) {
    return <Error msg="Modules missing" />;
  }

  const slides = project.slides;
  const lessons = project.lessons;
  const modules = project.modules;
  const resources = project.resources;
  const glossary = project.glossary;
  const name = project.name;

  const config = Config.create(
    slides,
    lessons,
    modules,
    resources,
    glossary,
    name
  );
  const pages = Pages.create(config, templateList);

  // @ts-ignore
  const lessonTotal = pages.length;
  let lessonIdx;

  if (Scrowl.runtime) {
    const [locationError, location] = Scrowl.runtime.getLocation();

    if (!locationError && location) {
      lessonIdx = location.id + 1;
    }
  }

  return (
    <Router>
      <div id="scrowl-player" {...props}>
        <main className="owlui-lesson-wrapper">
          <Routes>
            {pages.map((page, idx) => {
              return (
                <Route key={idx} path={page.url} element={<page.Element />} />
              );
            })}
            <Route
              path="*"
              element={
                <Navigate
                  to={lessonIdx ? pages[lessonIdx].url : pages[0].url}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default {
  Root,
};
