import React, { useEffect } from 'react';
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

  let moduleIdx;
  let lessonIdx;

  if (Scrowl.runtime) {
    const [locationError, location] = Scrowl.runtime.getLocation();

    if (!locationError && location) {
      console.log('location in pages');
      console.log(location);
      moduleIdx = location.module;
      lessonIdx = location.lesson;
    }
  }

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

  const submitLocationObj = {};

  useEffect(() => {
    const handleSlideEnter = (ev) => {
      const sceneEvent = ev.detail;

      console.log('slide enter', sceneEvent);
      const id = sceneEvent.currentTarget.id;

      const splitEntries = id.split('--');

      splitEntries.map((entry) => {
        const keyPair = entry.split('-');
        submitLocationObj[keyPair[0]] = parseInt(keyPair[1]);
      });

      Scrowl.runtime?.updateLocation(
        submitLocationObj,
        0.5,
        sceneEvent.currentTarget.id
      );
    };
    const handleSlideStart = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;

      // console.log('slide start', sceneEvent);
    };
    const handleSlideEnd = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;

      // console.log('slide end', sceneEvent);
    };
    const handleSlideLeave = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;

      // console.log('slide leave', sceneEvent);
    };

    document.addEventListener('slide.enter', handleSlideEnter);
    document.addEventListener('slide.start', handleSlideStart);
    document.addEventListener('slide.end', handleSlideEnd);
    document.addEventListener('slide.leave', handleSlideLeave);

    return () => {
      document.removeEventListener('slide.enter', handleSlideEnter);
      document.removeEventListener('slide.start', handleSlideStart);
      document.removeEventListener('slide.end', handleSlideEnd);
      document.removeEventListener('slide.leave', handleSlideLeave);
    };
  }, [project]);

  let targetUrl;
  if (moduleIdx !== undefined) {
    targetUrl = `/module-${moduleIdx}--lesson-${lessonIdx}`;
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
                  to={
                    targetUrl && targetUrl.length > 1 ? targetUrl : pages[0].url
                  }
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};;

export default {
  Root,
};
