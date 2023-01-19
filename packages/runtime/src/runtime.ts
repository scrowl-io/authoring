/*
  SCORM API REF
  https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*/
import { RUNTIME_SERVICE } from "./runtime.types";

// const hasProp = (obj: {}, prop: string) => {
//   return Object.prototype.hasOwnProperty.call(obj, prop);
// };

export const service: RUNTIME_SERVICE = {
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
      // @ts-ignore
      function ZeroPad(val: number, pad: number) {
        let res = new String(val);
        const len = res.length;

        if (len > pad) {
          return res.substr(0, pad);
        }

        for (let i = len; i < pad; i++) {
          res = '0' + res;
        }

        return res;
      }

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

      // should eventually check SCORM version and format time accordingly
      let timespan =
        'PT' +
        totalH +
        // ZeroPad(totalH, 4) +
        'H' +
        totalM +
        // ZeroPad(totalM, 2) +
        'M' +
        totalS +
        // ZeroPad(totalS, 2) +
        'S';

      if (totalH > 9999) {
        timespan = '9999:99:99';
      }

      return timespan;
    },
  },
  nFindAPITries: 0,
  // @ts-ignore
  API: null,
  maxTries: 500,
  //@ts-ignore
  scanForAPI: (win) => {
    while (win.API_1484_11 == null && win.parent != null && win.parent != win) {
      service.nFindAPITries++;

      if (service.nFindAPITries > service.maxTries) {
        return null;
      }

      win = win.parent;
    }

    return win.API_1484_11;
  },
  getAPI: (win) => {
    if (win.parent != null && win.parent != win) {
      // @ts-ignore
      service.API = service.scanForAPI(win.parent);
    }

    if (service.API == null && win.opener != null) {
      // @ts-ignore
      service.API = service.scanForAPI(win.opener);
    }
  },
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
    console.debug('API.Initialize()');
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
  // { m: 1, l: 1, s?: 3 }
  updateLocation: (location, slideId) => {
    console.info(`API.UpdateLocation`);
    console.info(location);
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
    // {m:1, l:1, s?:3} || {} || null
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
    console.info(`API.UpdateProgress`);

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
  start: () => {
    console.debug(`API.Start`);
    service._time.startTime = new Date();
    service.getAPI(window);

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
    } else {
      service.setValue(
        'cmi.score.scaled',
        service.getValue('cmi.score.scaled')[1]
      );
      service.setValue('cmi.score.raw', service.getValue('cmi.score.raw')[1]);
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

    console.info('runtime started');

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
        // return [true, service.getError(true)];
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
}
