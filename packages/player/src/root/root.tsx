import React, { useState, useEffect } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './_root.scss';
import { PlayerRootProps } from './root.types';
import Config from './config';
import { Error as ErrorComponent } from '../components';
import { ErrorModal } from '../components/modal';
import { Pages } from '../services';
import 'scorm-again';
import * as _css from './_root.scss';
import utils from '../utils';

const css = utils.css.removeMapPrefix(_css);

export const Root = ({
  project,
  templateList,
  scorm,
  ...props
}: PlayerRootProps) => {
  const Scrowl = window['Scrowl'];
  let apiPreference;

  const [showPanel, _setShowPanel] = useState(true);

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

  if (window['Scorm2004API']) {
    // @ts-ignore
    window['API_1484_11'] = new Scorm2004API({});
  }

  if (window['API_1484_11'] !== undefined) {
    window['API_1484_11'].Initialize();
  }

  if (Scrowl.runtime) {
    const [isStarted] = Scrowl.runtime.start(apiPreference);

    if (!isStarted) {
      console.error('unable to start runtime');
    }
  }

  if (!templateList || !Object.keys(templateList).length) {
    return <ErrorComponent msg="Templates missing" />;
  }

  if (!project || !project.slides || !project.slides.length) {
    return <ErrorComponent msg="Slides missing" />;
  }

  if (!project || !project.lessons || !project.lessons.length) {
    return <ErrorComponent msg="Lessons missing" />;
  }

  if (!project || !project.modules || !project.modules.length) {
    return <ErrorComponent msg="Modules missing" />;
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
    let locationError;
    let location;
    try {
      [locationError, location] = Scrowl.runtime.getLocation();
    } catch (e) {
      console.log(e);
    }

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

  const formatResponse = (response) => {
    // const location = response['location'];
    // ask Chris about destructuring issue
    const {
      location,
      completion_status,
      completion_threshold,
      credit,
      entry,
      // exit,
      launch_data,
      learner_id,
      learner_name,
      max_time_allowed,
      mode,
      progress_measure,
      scaled_passing_score,
      // session_time,
      success_status,
      suspend_data,
      time_limit_action,
      total_time,
      ...rest
    } = response;
    const loc = JSON.parse(location);

    rest['location'] = loc;
    rest['completion_status'] = completion_status;
    rest['completion_threshold'] = completion_threshold;
    rest['credit'] = credit;
    rest['entry'] = entry;
    // rest['exit'] = exit;
    rest['launch_data'] = launch_data;
    rest['learner_id'] = learner_id;
    rest['learner_name'] = learner_name;
    rest['max_time_allowed'] = max_time_allowed;
    rest['mode'] = mode;
    rest['progress_measure'] = progress_measure;
    rest['scaled_passing_score'] = scaled_passing_score;
    // rest['session_time'] = session_time;
    rest['success_status'] = success_status;
    rest['suspend_data'] = suspend_data;
    rest['time_limit_action'] = time_limit_action;
    rest['total_time'] = total_time;

    return JSON.stringify(rest, null, 2);
  };

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
        if (window['API_1484_11'] !== undefined) {
          window['API_1484_11'].SetValue(
            'cmi.location',
            JSON.stringify(locationObj)
          );
          const value = window['API_1484_11'].GetValue('cmi');
          const p = document.querySelector('#test-paragraph');
          if (p) {
            p.textContent = formatResponse(value);
          }
        }
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

  useEffect(() => {
    if (Scrowl && Scrowl.runtime) {
      Scrowl.runtime.getError(true);
    }
  }, []);

  useEffect(() => {
    if (Scrowl.runtime && Scrowl.runtime !== null) {
      if (Scrowl.runtime?.API === null) {
        const errorObject = {
          id: '600',
          message: 'Unable to connect to API',
          stack:
            'This course was not able to connect to the SCORM API. Course data will not be saved to the LMS.',
        };
        const errorEvent = new CustomEvent('APIError', { detail: errorObject });
        document.dispatchEvent(errorEvent);
      }
    }

    if (window.navigator.onLine === false) {
      const errorObject = {
        id: '700',
        message: 'No internet connection',
        stack:
          'You are not connected to the internet. Course data will not be saved.',
      };
      const onlineEvent = new CustomEvent('connectionError', {
        detail: errorObject,
      });
      document.dispatchEvent(onlineEvent);
    }
    window.addEventListener('error', (event) => {
      const errorEvent = new CustomEvent('playerError', { detail: event });
      document.dispatchEvent(errorEvent);
    });
  }, [project, slides]);

  let targetUrl;

  if (moduleIdx !== undefined) {
    targetUrl = `/module-${moduleIdx}--lesson-${lessonIdx}`;
  }

  const PreviewPanel = () => {
    return (
      <div className={css.previewPanel}>
        <h3>SCORM Preview</h3>
        <pre>window.API_1484_11.cmi = &#123;</pre>
        <pre>"cmi":</pre>
        <pre id="test-paragraph"></pre>
      </div>
    );
  };

  if (window['API_1484_11']) {
    window['API_1484_11'].on('SetValue.cmi.*', () => {
      console.log('on Set');
    });
  }

  return (
    <Router>
      <div id="scrowl-player" {...props}>
        <main className="owlui-lesson-wrapper">
          <ErrorModal />
          {window['API_1484_11'] !== undefined && showPanel ? (
            <PreviewPanel />
          ) : null}
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
