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
  courseProgress: 0,
  lessonLocation: '',
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

    console.log('cmi version:');
    const version = service.getValue('cmi._version');
    console.log(version);

    console.log('lesson Status (1.2):');
    const lessonStatus = service.getValue('cmi.core.lesson_status');
    console.log(lessonStatus);

    console.log('completion Status (2004):');
    const completionStatus = service.getValue('cmi.completion_status');
    console.log(completionStatus);

    console.log('success Status (2004):');
    const successStatus = service.getValue('cmi.success_status');
    console.log(successStatus);

    console.log('lesson location:');
    const lessonLocation = service.getValue('cmi.core.lesson_location');
    console.log(lessonLocation);

    console.log('session time (1.2):');
    const sessionTime = service.getValue('cmi.core.session_time');
    console.log(sessionTime);

    console.log('total time (1.2):');
    const totalTime = service.getValue('cmi.core.totalTime');
    console.log(totalTime);

    console.log('session time (2004):');
    const sessionTime2004 = service.getValue('cmi.session_time');
    console.log(sessionTime2004);

    // console.log('score raw (1.2):');
    // const score_raw = service.getValue('cmi.core.score_raw');
    // console.log(score_raw);

    // console.log('score to pass (2004):');
    // const score_pass_1 = service.getValue('cmi.scaled_passing_score');
    // console.log(score_pass_1);

    // console.log('score mastery (1.2):');
    // const score_mastery = service.getValue('cmi.student_data.mastery_score');
    // console.log(score_mastery);

    console.log('course progress (2004):');
    const progress_measure = service.getValue('cmi.progress_measure');
    console.log(progress_measure);

    console.log('score (2004):');
    const scoreVal2004 = service.getValue('cmi.score.raw');
    console.log(scoreVal2004);

    return {
      error: false,
    };
  },
  save: () => {
    const res = service.isAvailable();

    if (res.error) {
      return res;
    }

    const resSave = res.API.LMSCommit();

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

    const getRes = res.API.LMSGetValue('cmi.progress_measure');
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
    service.courseProgress = 1;
    service.setValue('cmi.progress_measure', service.courseProgress);
    service.setValue('cmi.score.raw', 80.0);
    service.setValue('cmi.success_status', 'passed');

    // SCORM 1.2 (status is handled separately, but scores will conflict, so only update 1)
    // service.updateStatus('success');
    // service.setValue('cmi.core.score.raw', 57.0);
    // service.updateStatus('failed');

    service.save();

    console.log('SERVICE:');
    console.log(service);
    service.exit();
  },
};

export default {
  service,
}
