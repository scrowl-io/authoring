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

      let timespan =
        ZeroPad(totalH, 4) +
        ':' +
        ZeroPad(totalM, 2) +
        ':' +
        ZeroPad(totalS, 2);

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
      //@ts-ignore
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
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const errorId = res.API.GetLastError();
    const errorMsg = res.API.GetErrorString(errorId);
    const errorStack = res.API.GetDiagnostic(errorId);
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
    if (!service.API) {
      console.error('MISSING_SCORM_API - COMMIT');
    }

    service.setValue('cmi.session_time', service._time.getSessionTime());

    service.API?.Commit('');

    console.log('API.Commit()');
    if (service.API?.Commit('') === 'false') {
      throw 'ERROR_COMMIT_SCORM_API';
    }
  },
  exit: () => {
    service.commit();
  },
  initialize: () => {
    if (!service.API) {
      console.error('MISSING_SCORM_API - INIT');
    }
    console.log('API.Initialize()');
    if (service.API?.Initialize('') === 'false') {
      throw 'ERROR_INIT_SCORM_API';
    }
  },
  // { m: 1, l: 1, s?: 3 }
  updateLocation: (location, progressPercentage) => {
    service.setValue(
      'cmi.location',
      JSON.stringify({ v1: 1, ...location.lesson })
    );

    // Update progress
    progressPercentage = progressPercentage || 0;
    service.setValue('cmi.progress_measure', progressPercentage);

    service.commit();
  },
  getLocation: () => {
    // {m:1, l:1, s?:3} || {} || null
    try {
      const location = service.getValue('cmi.location');
      if (location !== undefined) {
        return JSON.parse(location);
      }
    } catch (e) {
      return {};
    }
  },
  start: () => {
    service._time.startTime = new Date();
    service.getAPI(window);

    if (!service.API) {
      console.error('MISSING_SCORM_API - START');
    }

    service.init = true;

    service.initialize();

    const completionStatus = service.getValue('cmi.completion_status');

    if (completionStatus === 'unknown') {
      service.setValue('cmi.completion_status', 'incomplete');
      service.setValue('cmi.success_status', 'unknown');
      service.setValue('cmi.suspend_data', '{}');
    } else {
      service.setValue(
        'cmi.score.scaled',
        service.getValue('cmi.score.scaled')
      );
      service.setValue('cmi.score.raw', service.getValue('cmi.score.raw'));
      service.setValue(
        'cmi.success_status',
        service.getValue('cmi.success_status')
      );
      service.setValue(
        'cmi.progress_measure',
        service.getValue('cmi.progress_measure')
      );
      service.setValue(
        'cmi.completion_status',
        service.getValue('cmi.completion_status')
      );
    }

    // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
    service.setValue('cmi.exit', 'suspend');

    service.commit();

    return {
      error: false,
    };
  },
  finish: () => {
    service.setValue('cmi.score.min', 0);
    service.setValue('cmi.score.max', 100);
    service.setValue('cmi.score.scaled', 1);
    service.setValue('cmi.score.raw', 100);
    service.setValue('cmi.success_status', 'passed');
    service.setValue('cmi.progress_measure', 1);
    service.setValue('cmi.completion_status', 'completed');

    console.log('SERVICE');
    console.log(service);
    service.commit();
    service.API?.Terminate('');
  },
  setValue: (elem, val) => {
    if (!service.API) {
      console.error('MISSING_SCORM_API - SETVAL');
    }

    console.log('API.SetValue', elem, val);

    if (val !== undefined) {
      service.API?.SetValue(elem, val);
    }

    // if (service.API.SetValue(elem, val) === 'false') {
    //   throw {
    //     message: `SCORM service failed to set ${elem} to ${val}`,
    //     data: service.getError(true),
    //   };
    // }

    return {
      error: false,
    };
  },
  getValue: (elem) => {
    if (!service.API) {
      console.error('MISSING_SCORM_API - GETVAL');
    }

    const getRes = service.API?.GetValue(elem);

    if (getRes === 'false') {
      throw {
        message: `SCORM service failed to get ${elem}`,
        data: service.getError(true),
      };
    }

    console.log('API.GetValue', elem, getRes);

    return getRes;
  },
};

export default {
  service,
}
