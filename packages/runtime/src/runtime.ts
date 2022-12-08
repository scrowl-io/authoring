/*
  SCORM API REF
  https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*/
import { RUNTIME_SERVICE } from "./runtime.types";

const hasProp = (obj: {}, prop: string) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const service: RUNTIME_SERVICE = {
  init: false,
  finished: false,
  _time: {
    start: undefined,
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
  STATUSES: {
    update: {
      true: 'true',
      false: 'false',
    },
    lesson: {
      success: 'passed',
      failed: 'failed',
      done: 'completed',
      active: 'incomplete',
      viewed: 'browsed',
      unseen: 'not attempted',
    },
    exit: {
      timeout: 'time-out',
      save: 'suspend',
      logout: 'logout',
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
  isAvailable: () => {
    const isReady = service.init && !service.finished;

    if (!isReady || !service.API) {
      return {
        error: true,
        message: 'Service is unavailable',
      };
    }

    return {
      error: false,
      API: service.API,
    };
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
  start: () => {
    service.getAPI(window);

    service._time.start = new Date();
    service.init = true;

    service?.API?.Initialize('');

    return {
      error: false,
    };
  },
  save: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const resSave = res.API.Commit('');

    if (resSave === service.STATUSES.update.false) {
      return {
        error: true,
        message: 'SCORM service failed to save',
        data: service.getError(),
      };
    }

    return {
      error: false,
    };
  },
  stop: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const saveRes = service.save();

    if (saveRes.error) {
      return saveRes;
    }

    const resFinish = res.API.Terminate('');

    if (resFinish === service.STATUSES.update.false) {
      return {
        error: true,
        message: 'SCORM service failed to save',
        data: service.getError(),
      };
    }

    service.finished = true;
    service.save();
    console.log('terminating');
    res.API.Commit();
    return {
      error: false,
    };
  },
  setValue: (elem, val) => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const setRes = res.API.SetValue(elem, val);

    if (setRes === service.STATUSES.update.false) {
      return {
        error: true,
        message: `SCORM service failed to set ${elem} to ${val}`,
        data: service.getError(true),
      };
    }

    return {
      error: false,
    };
  },
  getValue: (elem) => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const getRes = res.API.GetValue(elem);

    console.log('GET RES');
    console.log(getRes);

    if (getRes === service.STATUSES.update.false) {
      return {
        error: true,
        message: `SCORM service failed to get ${elem}`,
        data: service.getError(true),
      };
    }

    return {
      error: false,
    };
  },
  getProgress: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const getRes = res.API.GetValue('cmi.progress_measure');
    const numberRes = parseFloat(getRes);
    if (numberRes > 0) {
      return numberRes;
    } else {
      return 0;
    }
  },
  updateStatus: (status) => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    if (!hasProp(service.STATUSES.lesson, status)) {
      const validStatuses = Object.keys(service.STATUSES.lesson).join(', ');
      const msg = `Invalid lesson status: ${status}. Must be one of: ${validStatuses}`;

      console.error(msg);
      return {
        error: true,
        message: msg,
      };
    }

    const lessonStatus = service.STATUSES.lesson[status];
    const setRes = service.setValue('cmi.completion_status', lessonStatus);

    if (setRes.error) {
      return setRes;
    }

    return {
      error: false,
    };
  },
  exit: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    service._time.end = new Date();

    if (!service._time.start) {
      return {
        error: true,
        message: 'Service was never started',
      };
    }

    const totalTime =
      service._time.end.getTime() - service._time.start.getTime();
    const endRes = service.setValue(
      'cmi.session_time',
      service._time.convert(totalTime)
    );

    if (endRes.error) {
      return endRes;
    }

    const exitRes = service.setValue(
      'cmi.core.exit',
      service.STATUSES.exit.save
    );

    if (exitRes.error) {
      return exitRes;
    }

    return service.stop();
  },
  updateProgress: (percentageCompleted) => {
    console.log('new percentage');
    console.log(percentageCompleted);
    console.log('old percentage');
    console.log(service.getProgress());
    const oldRes = service.getProgress();
    if (percentageCompleted > oldRes) {
      console.log('higher?');
      // service.courseProgress = percentageCompleted;
      service.setValue('cmi.progress_measure', percentageCompleted);
    }
    console.log(percentageCompleted);
    service.save();
  },
  finish: () => {
    console.log('DONE');

    // SCORM 2004
    // service.setValue('cmi.progress_measure', service.getProgress);
    service.setValue('cmi.score.raw', 90.0);
    service.setValue('cmi.success_status', 'passed');

    // SCORM 1.2 (status is handled separately, but scores will conflict, so only update 1)
    service.updateStatus('success');
    // service.setValue('cmi.core.score.raw', 87.0);

    service.save();

    console.log('SERVICE:');
    console.log(service);
    service.exit();
  },
};

export default {
  service,
}
