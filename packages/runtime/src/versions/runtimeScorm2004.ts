/*
  SCORM API REF
  https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*/
import { RUNTIME_SERVICE } from '../runtime.types';

export const service: RUNTIME_SERVICE = {
  version: '2004v3',
  init: false,
  finished: false,
  _time: {
    startTime: undefined,
    getSessionTime: () => {
      let sessionTime;
      if (service._time.startTime) {
        sessionTime = new Date().getTime() - service._time.startTime.getTime();
      }
      return service._time.convert(sessionTime);
    },
    end: undefined,
    convert: (total) => {
      let totalMs = total % 1000;
      let totalS = ((total - totalMs) / 1000) % 60;
      let totalM = ((total - totalMs - totalS * 1000) / 60000) % 60;
      let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;

      if (totalH == 10000) {
        totalH = 9999;
        totalM = (total - totalH * 3600000) / 60000;

        if (totalM == 100) {
          totalM = 99;
        }

        totalM = Math.floor(totalM);
        totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;

        if (totalS == 100) {
          totalS = 99;
        }

        totalS = Math.floor(totalS);
        totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;
      }

      let timespan = 'PT' + totalH + 'H' + totalM + 'M' + totalS + 'S';

      if (totalH > 9999) {
        timespan = '9999:99:99';
      }

      return timespan;
    },
  },
  API: null,
  getError: (printError) => {
    printError =
      printError === undefined || printError === null ? true : printError;

    const [isInit, API] = service.isInitialized();

    if (!isInit) {
      return {
        error: true,
        message: 'Service is not initialized',
      };
    }

    const errorId = API.GetLastError();
    const errorMsg = API.GetErrorString(errorId);
    const errorStack = API.GetDiagnostic(errorId);
    const apiError = {
      id: errorId,
      message: errorMsg,
      stack: errorStack,
    };

    if (printError) {
      console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
      const errorEvent = new CustomEvent('scormError', {
        detail: apiError,
      });
      document.dispatchEvent(errorEvent);

      return {
        error: true,
        data: apiError,
      };
    }

    return {
      error: false,
      data: apiError,
    };
  },
  commit: () => {
    console.debug(`API.Commit`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to get location: service not initialized`);
      return [true];
    }

    service.setValue('cmi.session_time', service._time.getSessionTime());
    API.Commit('');
    return [false];
  },
  exit: () => {
    console.debug('API.Exit');
    return service.commit();
  },
  isInitialized: () => {
    service.init = false;

    if (!service.API) {
      console.error('MISSING_SCORM_API - INIT');
      return [service.init, false];
    }

    // @ts-ignore
    if (service.API.Initialized === 'false') {
      console.error('API failed to initialize');
      return [service.init, false];
    }

    service.init = true;
    return [service.init, service.API];
  },
  updateLocation: (location, slideId) => {
    console.debug(`API.UpdateLocation`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to get location: service not initialized`);
      return [true];
    }

    service.setValue(
      'cmi.location',
      JSON.stringify({ v1: 1, ...location, slideId: slideId })
    );

    service.commit();
    return [false];
  },
  getLocation: () => {
    console.debug(`API.GetLocation`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to get location: service not initialized`);
      return [true, {}];
    }
    try {
      const [error, location] = service.getValue('cmi.location');

      if (error || !location) {
        return [true, {}];
      }

      return [false, JSON.parse(location)];
    } catch (e) {
      console.error(e);
      return [true, {}];
    }
  },
  getProgress: () => {
    console.debug(`API.GetProgress`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to get progress: service not initialized`);
      return [true, {}];
    }

    try {
      const [error, progress] = service.getValue('cmi.progress_measure');

      if (error || !progress) {
        return [true, {}];
      }

      return [false, progress];
    } catch (e) {
      console.error(e);
      return [true, {}];
    }
  },
  updateProgress: (progressPercentage) => {
    console.debug(`API.UpdateProgress`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to update progress: service not initialized`);
      return [true];
    }

    const [progressError, previousProgress] = service.getValue(
      'cmi.progress_measure'
    );

    // error 403 = Data Model Element Value Not Initialized (first time setting progress)
    // @ts-ignore
    if (progressError && previousProgress.data.id === '403') {
      service.setValue('cmi.progress_measure', progressPercentage);
      service.commit();
    }

    if (!progressError) {
      if (
        !previousProgress ||
        parseFloat(previousProgress) === 0 ||
        progressPercentage > parseFloat(previousProgress)
      ) {
        service.setValue('cmi.progress_measure', progressPercentage);
      }
      service.commit();
    }

    return [false];
  },
  start: (api) => {
    console.debug(`API.Start 2004v3`);

    service.API = api;
    service._time.startTime = new Date();
    service.API?.Initialize('');

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      return [true];
    }

    const [statusError, completionStatus] = service.getValue(
      'cmi.completion_status'
    );

    if (statusError) {
      return [true];
    }

    if (completionStatus === 'unknown') {
      service.setValue('cmi.completion_status', 'incomplete');
      service.setValue('cmi.success_status', 'unknown');
      service.setValue('cmi.suspend_data', '{}');
      service.setValue('cmi.progress_measure', 0);
      const startLocation = {
        cur: {
          m: 0,
          l: 0,
          s: 0,
        },
        max: {
          m: 0,
          l: 0,
          s: 0,
        },
      };
      service.setValue('cmi.location', JSON.stringify(startLocation));
    } else {
      // service.setValue(
      //   'cmi.score.scaled',
      //   service.getValue('cmi.score.scaled')[1]
      // );
      // service.setValue('cmi.score.raw', service.getValue('cmi.score.raw')[1]);
      service.setValue(
        'cmi.success_status',
        service.getValue('cmi.success_status')[1]
      );
      service.setValue(
        'cmi.progress_measure',
        service.getValue('cmi.progress_measure')[1]
      );
      service.setValue(
        'cmi.completion_status',
        service.getValue('cmi.completion_status')[1]
      );
    }

    // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
    service.setValue('cmi.exit', 'suspend');
    service.commit();

    console.debug('runtime started');

    return [false];
  },
  finish: () => {
    console.debug(`API.Finish`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to finish: service not initialized`);
      return [true];
    }

    service.setValue('cmi.score.min', 0);
    service.setValue('cmi.score.max', 100);
    service.setValue('cmi.score.scaled', 1);
    service.setValue('cmi.score.raw', 100);
    service.setValue('cmi.success_status', 'passed');
    service.setValue('cmi.progress_measure', 1);
    service.setValue('cmi.completion_status', 'completed');
    service.commit();
    API.Terminate('');

    return [false];
  },
  setValue: (elem, val) => {
    console.debug(`API.SetValue for ${elem} to ${val}`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to set value for ${elem}: service not initialized`);
      return [true];
    }

    if (val !== undefined) {
      if (API.SetValue(elem, val) === 'false') {
        service.getError(true);
      }
    } else {
      console.warn(`Unable to set value for ${elem}: value undefined`);
    }

    return [false];
  },
  getValue: (elem) => {
    console.debug(`API.GetValue for ${elem}`);

    const [isInit, API] = service.isInitialized();

    if (!isInit || !API) {
      console.warn(`Unable to set value for ${elem}: service not initialized`);
      return [true, ''];
    }

    const getRes = API.GetValue(elem);

    if (getRes === '') {
      console.error(`API failed to get value for: ${elem}`);
      service.getError(true);
    }

    return [false, getRes];
  },
};

export default {
  service,
};
