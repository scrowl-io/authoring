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

export const Root = ({
  project,
  templateList,
  scorm,
  ...props
}: PlayerRootProps) => {
  const Scrowl = window['Scrowl'];
  let apiPreference;
  if (scorm && scorm.outputFormat) {
    switch (scorm.outputFormat) {
      case '2004 3rd Edition':
        apiPreference = '2004v3';
        break;
      case '1.2':
      default:
        apiPreference = '1.2';
    }
  }


  if (Scrowl.runtime) {
    const [isStarted] = Scrowl.runtime.start(apiPreference);

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
  let slideId;

  if (Scrowl.runtime) {
    const [locationError, location] = Scrowl.runtime.getLocation();

    if (!locationError && location && location.cur) {
      moduleIdx = location.cur.m;
      lessonIdx = location.cur.l;
      slideId = location.slideId;
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
  const pages = Pages.create(config, templateList, slideId);

  useEffect(() => {
    const handleSlideEnter = (ev) => {
      const sceneEvent = ev.detail;
      const previousLocation = Scrowl.runtime?.getLocation();

      type LocationObject = {
        cur: {
          m: number;
          l: number;
          s?: number;
        };
        max: {
          m?: number;
          l?: number;
          s?: number;
        };
      };

      const locationObj: LocationObject = {
        cur: {
          m: 0,
          l: 0,
          s: 0,
        },
        max: {
          m: previousLocation?.[1].max ? previousLocation[1].max.m : 0,
          l: previousLocation?.[1].max ? previousLocation[1].max.l : 0,
          s: previousLocation?.[1].max ? previousLocation[1].max.s : 0,
        },
      };

      const id = sceneEvent.currentTarget.id;

      const shortenedId = id
        .replace('module', 'm')
        .replace('lesson', 'l')
        .replace('slide', 's');

      const splitEntries = shortenedId.split('--');

      splitEntries.map((entry) => {
        const keyPair = entry.split('-');
        if (locationObj && locationObj.cur) {
          locationObj.cur[keyPair[0]] = parseInt(keyPair[1]);
        }
      });

      if (
        !previousLocation ||
        !previousLocation[1].max ||
        previousLocation[1].max === undefined
      ) {
        Scrowl.runtime?.updateLocation(locationObj, id);
      } else {
        if (locationObj.cur.m > previousLocation[1].max.m) {
          locationObj.max.m = locationObj.cur.m;

          if (locationObj.cur.l < previousLocation[1].max.l) {
            locationObj.max.l = locationObj.cur.l;
          }
        } else if (locationObj.cur.l > previousLocation?.[1].max.l) {
          if (locationObj.cur.m >= previousLocation?.[1].max.m) {
            locationObj.max.l = locationObj.cur.l;
          }
        }

        Scrowl.runtime?.updateLocation(locationObj, id);
      }
    };
    const handleSlideStart = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;
    };
    const handleSlideEnd = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;
    };
    const handleSlideLeave = (ev) => {
      // @ts-ignore
      const sceneEvent = ev.detail;
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
};

export default {
  Root,
};
