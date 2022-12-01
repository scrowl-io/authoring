function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $5a873cbe6b6bfafe$exports = {};


var $b3d1e3300d945f09$exports = {};

$parcel$defineInteropFlag($b3d1e3300d945f09$exports);

$parcel$export($b3d1e3300d945f09$exports, "service", () => $b3d1e3300d945f09$export$6ed414b8d8bead88);
$parcel$export($b3d1e3300d945f09$exports, "default", () => $b3d1e3300d945f09$export$2e2bcd8739ae039);
const $b3d1e3300d945f09$var$hasProp = (obj, prop)=>{
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
const $b3d1e3300d945f09$export$6ed414b8d8bead88 = {
    init: false,
    finished: false,
    _time: {
        start: undefined,
        end: undefined,
        convert: (total)=>{
            function ZeroPad(val, pad) {
                let res = new String(val);
                const len = res.length;
                if (len > pad) return res.substr(0, pad);
                for(let i = len; i < pad; i++)res = "0" + res;
                return res;
            }
            let totalMs = total % 1000;
            let totalS = (total - totalMs) / 1000 % 60;
            let totalM = (total - totalMs - totalS * 1000) / 60000 % 60;
            let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;
            if (totalH == 10000) {
                totalH = 9999;
                totalM = (total - totalH * 3600000) / 60000;
                if (totalM == 100) totalM = 99;
                totalM = Math.floor(totalM);
                totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;
                if (totalS == 100) totalS = 99;
                totalS = Math.floor(totalS);
                totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;
            }
            let timespan = ZeroPad(totalH, 4) + ":" + ZeroPad(totalM, 2) + ":" + ZeroPad(totalS, 2);
            if (totalH > 9999) timespan = "9999:99:99";
            return timespan;
        }
    },
    STATUSES: {
        update: {
            true: "true",
            false: "false"
        },
        lesson: {
            success: "passed",
            failed: "failed",
            done: "completed",
            active: "incomplete",
            viewed: "browsed",
            unseen: "not attempted"
        },
        exit: {
            timeout: "time-out",
            save: "suspend",
            logout: "logout"
        }
    },
    courseProgress: 0,
    lessonLocation: "",
    isAvailable: ()=>{
        const isReady = $b3d1e3300d945f09$export$6ed414b8d8bead88.init && !$b3d1e3300d945f09$export$6ed414b8d8bead88.finished;
        if (!isReady || !$b3d1e3300d945f09$export$6ed414b8d8bead88.API) return {
            error: true,
            message: "Service is unavailable"
        };
        return {
            error: false,
            API: $b3d1e3300d945f09$export$6ed414b8d8bead88.API
        };
    },
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const errorId = res.API.LMSGetLastError();
        const errorMsg = res.API.LMSGetErrorString(errorId);
        const errorStack = res.API.LMSGetDiagnostic(errorId);
        const apiError = {
            id: errorId,
            message: errorMsg,
            stack: errorStack
        };
        if (printError) console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
        return {
            error: false,
            data: apiError
        };
    },
    _findAPI: (source)=>{
        let retryCnt = 0;
        const retryLimit = 7;
        if (source.API) return {
            error: false,
            API: source.API
        };
        if (source.parent === source) return {
            error: true,
            message: "Error: unable to find API - top level reached"
        };
        while(source.API == null && source.parent != null && retryCnt < retryLimit){
            retryCnt++;
            source = source.parent;
        }
        if (retryCnt >= retryLimit) return {
            error: true,
            message: "Error: unable to find API - nested to deep"
        };
        return {
            error: false,
            API: source.API
        };
    },
    start: ()=>{
        const resFind = $b3d1e3300d945f09$export$6ed414b8d8bead88._findAPI(window);
        if (resFind.error) return resFind;
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API = resFind.API;
        $b3d1e3300d945f09$export$6ed414b8d8bead88._time.start = new Date();
        $b3d1e3300d945f09$export$6ed414b8d8bead88.init = true;
        const resInit = $b3d1e3300d945f09$export$6ed414b8d8bead88.API.LMSInitialize();
        if (resInit === $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: "SCORM service failed to initialize",
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError()
        };
        console.log("cmi version:");
        const version = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi._version");
        console.log(version);
        console.log("lesson Status (1.2):");
        const lessonStatus = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.core.lesson_status");
        console.log(lessonStatus);
        console.log("completion Status (2004):");
        const completionStatus = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        console.log(completionStatus);
        console.log("success Status (2004):");
        const successStatus = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.success_status");
        console.log(successStatus);
        console.log("lesson location:");
        const lessonLocation = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.core.lesson_location");
        console.log(lessonLocation);
        console.log("session time (1.2):");
        const sessionTime = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.core.session_time");
        console.log(sessionTime);
        console.log("total time (1.2):");
        const totalTime = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.core.totalTime");
        console.log(totalTime);
        console.log("session time (2004):");
        const sessionTime2004 = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.session_time");
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
        console.log("course progress (2004):");
        const progress_measure = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
        console.log(progress_measure);
        console.log("score (2004):");
        const scoreVal2004 = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.score.raw");
        console.log(scoreVal2004);
        return {
            error: false
        };
    },
    save: ()=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const resSave = res.API.LMSCommit();
        if (resSave === $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: "SCORM service failed to save",
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError()
        };
        return {
            error: false
        };
    },
    stop: ()=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const saveRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.save();
        if (saveRes.error) return saveRes;
        const resFinish = res.API.LMSFinish();
        if (resFinish === $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: "SCORM service failed to save",
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError()
        };
        $b3d1e3300d945f09$export$6ed414b8d8bead88.finished = true;
        $b3d1e3300d945f09$export$6ed414b8d8bead88.save();
        console.log("terminating");
        res.API.Commit();
        return {
            error: false
        };
    },
    setValue: (elem, val)=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const setRes = res.API.LMSSetValue(elem, val);
        if (setRes === $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: `SCORM service failed to set ${elem} to ${val}`,
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError(true)
        };
        return {
            error: false
        };
    },
    getValue: (elem)=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const getRes = res.API.LMSGetValue(elem);
        console.log("GET RES");
        console.log(getRes);
        if (getRes === $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: `SCORM service failed to get ${elem}`,
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError(true)
        };
        return {
            error: false
        };
    },
    getProgress: ()=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const getRes = res.API.LMSGetValue("cmi.progress_measure");
        const numberRes = parseFloat(getRes);
        if (numberRes > 0) return numberRes;
        else return 0;
    },
    updateStatus: (status)=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        if (!$b3d1e3300d945f09$var$hasProp($b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.lesson, status)) {
            const validStatuses = Object.keys($b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.lesson).join(", ");
            const msg = `Invalid lesson status: ${status}. Must be one of: ${validStatuses}`;
            console.error(msg);
            return {
                error: true,
                message: msg
            };
        }
        const lessonStatus = $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.lesson[status];
        const setRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", lessonStatus);
        if (setRes.error) return setRes;
        return {
            error: false
        };
    },
    exit: ()=>{
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        $b3d1e3300d945f09$export$6ed414b8d8bead88._time.end = new Date();
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88._time.start) return {
            error: true,
            message: "Service was never started"
        };
        const totalTime = $b3d1e3300d945f09$export$6ed414b8d8bead88._time.end.getTime() - $b3d1e3300d945f09$export$6ed414b8d8bead88._time.start.getTime();
        const endRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.core.session_time", $b3d1e3300d945f09$export$6ed414b8d8bead88._time.convert(totalTime));
        if (endRes.error) return endRes;
        const exitRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.core.exit", $b3d1e3300d945f09$export$6ed414b8d8bead88.STATUSES.exit.save);
        if (exitRes.error) return exitRes;
        return $b3d1e3300d945f09$export$6ed414b8d8bead88.stop();
    },
    updateProgress: (percentageCompleted)=>{
        console.log("new percentage");
        console.log(percentageCompleted);
        console.log("old percentage");
        console.log($b3d1e3300d945f09$export$6ed414b8d8bead88.getProgress());
        const oldRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.getProgress();
        if (percentageCompleted > oldRes) {
            console.log("higher?");
            // service.courseProgress = percentageCompleted;
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", percentageCompleted);
        }
        console.log(percentageCompleted);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.save();
    },
    finish: ()=>{
        console.log("DONE");
        // SCORM 2004
        $b3d1e3300d945f09$export$6ed414b8d8bead88.courseProgress = 1;
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $b3d1e3300d945f09$export$6ed414b8d8bead88.courseProgress);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.raw", 90.0);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        // SCORM 1.2 (status is handled separately, but scores will conflict, so only update 1)
        $b3d1e3300d945f09$export$6ed414b8d8bead88.updateStatus("success");
        // service.setValue('cmi.core.score.raw', 87.0);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.save();
        console.log("SERVICE:");
        console.log($b3d1e3300d945f09$export$6ed414b8d8bead88);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.exit();
    }
};
var $b3d1e3300d945f09$export$2e2bcd8739ae039 = {
    service: $b3d1e3300d945f09$export$6ed414b8d8bead88
};


$parcel$exportWildcard(module.exports, $5a873cbe6b6bfafe$exports);
$parcel$exportWildcard(module.exports, $b3d1e3300d945f09$exports);


//# sourceMappingURL=scrowl.runtime.js.map
