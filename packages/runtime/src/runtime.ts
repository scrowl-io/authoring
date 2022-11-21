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

    const errorId = res.API.LMSGetLastError();
    const errorMsg = res.API.LMSGetErrorString(errorId);
    const errorStack = res.API.LMSGetDiagnostic(errorId);
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
  _findAPI: (source) => {
    let retryCnt = 0;
    const retryLimit = 7;

    if (source.API) {
      return {
        error: false,
        API: source.API,
      };
    }

    if (source.parent === source) {
      return {
        error: true,
        message: 'Error: unable to find API - top level reached',
      };
    }

    while (
      source.API == null &&
      source.parent != null &&
      retryCnt < retryLimit
    ) {
      retryCnt++;
      source = source.parent;
    }

    if (retryCnt >= retryLimit) {
      return {
        error: true,
        message: 'Error: unable to find API - nested to deep',
      };
    }

    return {
      error: false,
      API: source.API,
    };
  },
  start: () => {
    const resFind = service._findAPI(window);

    if (resFind.error) {
      return resFind;
    }

    service.API = resFind.API;
    service._time.start = new Date();
    service.init = true;

    const resInit = service.API.LMSInitialize();

    if (resInit === service.STATUSES.update.false) {
      return {
        error: true,
        message: 'SCORM service failed to initialize',
        data: service.getError(),
      };
    }

    return {
      error: false,
    };
  },
  save: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const resSave = res.API.LMSCommit('');

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

    const resFinish = res.API.LMSFinish();

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

    const setRes = res.API.LMSSetValue(elem, val);

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

    const getRes = res.API.LMSGetValue(elem);

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
    const setRes = service.setValue('cmi.core.lesson_status', lessonStatus);

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
      'cmi.core.session_time',
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
  finish: () => {
    console.log('DONE');
    service.updateStatus('success');
    service.setValue('cmi.core.score.raw', 87.00);
    // service._time.end = new Date();
    console.log(service);
    service.save();
    const val = service.getValue('cmi.core.lesson_status');
    console.log(val);
    service.save();
    const core = service.getValue('cmi.core');
    console.log(core);
    service.exit();
    console.log(service);
    

  },
};

export default {
  service,
}
