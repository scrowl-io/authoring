function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $b3b4796e9e8d98a1$exports = {};


var $defce2f29876acb7$exports = {};

$parcel$defineInteropFlag($defce2f29876acb7$exports);

$parcel$export($defce2f29876acb7$exports, "service", () => $defce2f29876acb7$export$6ed414b8d8bead88);
$parcel$export($defce2f29876acb7$exports, "default", () => $defce2f29876acb7$export$2e2bcd8739ae039);
const $defce2f29876acb7$var$hasProp = (obj, prop)=>{
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
const $defce2f29876acb7$export$6ed414b8d8bead88 = {
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
    nFindAPITries: 0,
    // @ts-ignore
    API: null,
    maxTries: 500,
    //@ts-ignore
    scanForAPI: (win)=>{
        while(win.API_1484_11 == null && win.parent != null && win.parent != win){
            $defce2f29876acb7$export$6ed414b8d8bead88.nFindAPITries++;
            if ($defce2f29876acb7$export$6ed414b8d8bead88.nFindAPITries > $defce2f29876acb7$export$6ed414b8d8bead88.maxTries) return null;
            win = win.parent;
        }
        return win.API_1484_11;
    },
    getAPI: (win)=>{
        if (win.parent != null && win.parent != win) //@ts-ignore
        $defce2f29876acb7$export$6ed414b8d8bead88.API = $defce2f29876acb7$export$6ed414b8d8bead88.scanForAPI(win.parent);
        if ($defce2f29876acb7$export$6ed414b8d8bead88.API == null && win.opener != null) // @ts-ignore
        $defce2f29876acb7$export$6ed414b8d8bead88.API = $defce2f29876acb7$export$6ed414b8d8bead88.scanForAPI(win.opener);
    },
    isAvailable: ()=>{
        const isReady = $defce2f29876acb7$export$6ed414b8d8bead88.init && !$defce2f29876acb7$export$6ed414b8d8bead88.finished;
        if (!isReady || !$defce2f29876acb7$export$6ed414b8d8bead88.API) return {
            error: true,
            message: "Service is unavailable"
        };
        return {
            error: false,
            API: $defce2f29876acb7$export$6ed414b8d8bead88.API
        };
    },
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const errorId = res.API.GetLastError();
        const errorMsg = res.API.GetErrorString(errorId);
        const errorStack = res.API.GetDiagnostic(errorId);
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
    start: ()=>{
        $defce2f29876acb7$export$6ed414b8d8bead88.getAPI(window);
        $defce2f29876acb7$export$6ed414b8d8bead88._time.start = new Date();
        $defce2f29876acb7$export$6ed414b8d8bead88.init = true;
        $defce2f29876acb7$export$6ed414b8d8bead88?.API?.Initialize("");
        return {
            error: false
        };
    },
    save: ()=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const resSave = res.API.Commit("");
        if (resSave === $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: "SCORM service failed to save",
            data: $defce2f29876acb7$export$6ed414b8d8bead88.getError()
        };
        return {
            error: false
        };
    },
    stop: ()=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const saveRes = $defce2f29876acb7$export$6ed414b8d8bead88.save();
        if (saveRes.error) return saveRes;
        const resFinish = res.API.Terminate("");
        if (resFinish === $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: "SCORM service failed to save",
            data: $defce2f29876acb7$export$6ed414b8d8bead88.getError()
        };
        $defce2f29876acb7$export$6ed414b8d8bead88.finished = true;
        $defce2f29876acb7$export$6ed414b8d8bead88.save();
        console.log("terminating");
        res.API.Commit();
        return {
            error: false
        };
    },
    setValue: (elem, val)=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const setRes = res.API.SetValue(elem, val);
        if (setRes === $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: `SCORM service failed to set ${elem} to ${val}`,
            data: $defce2f29876acb7$export$6ed414b8d8bead88.getError(true)
        };
        return {
            error: false
        };
    },
    getValue: (elem)=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const getRes = res.API.GetValue(elem);
        console.log("GET RES");
        console.log(getRes);
        if (getRes === $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.update.false) return {
            error: true,
            message: `SCORM service failed to get ${elem}`,
            data: $defce2f29876acb7$export$6ed414b8d8bead88.getError(true)
        };
        return {
            error: false
        };
    },
    getProgress: ()=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        const getRes = res.API.GetValue("cmi.progress_measure");
        const numberRes = parseFloat(getRes);
        if (numberRes > 0) return numberRes;
        else return 0;
    },
    updateStatus: (status)=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        if (!$defce2f29876acb7$var$hasProp($defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.lesson, status)) {
            const validStatuses = Object.keys($defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.lesson).join(", ");
            const msg = `Invalid lesson status: ${status}. Must be one of: ${validStatuses}`;
            console.error(msg);
            return {
                error: true,
                message: msg
            };
        }
        const lessonStatus = $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.lesson[status];
        const setRes = $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", lessonStatus);
        if (setRes.error) return setRes;
        return {
            error: false
        };
    },
    exit: ()=>{
        const res = $defce2f29876acb7$export$6ed414b8d8bead88.isAvailable();
        if (res.error) return res;
        $defce2f29876acb7$export$6ed414b8d8bead88._time.end = new Date();
        if (!$defce2f29876acb7$export$6ed414b8d8bead88._time.start) return {
            error: true,
            message: "Service was never started"
        };
        const totalTime = $defce2f29876acb7$export$6ed414b8d8bead88._time.end.getTime() - $defce2f29876acb7$export$6ed414b8d8bead88._time.start.getTime();
        const endRes = $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.session_time", $defce2f29876acb7$export$6ed414b8d8bead88._time.convert(totalTime));
        if (endRes.error) return endRes;
        const exitRes = $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.core.exit", $defce2f29876acb7$export$6ed414b8d8bead88.STATUSES.exit.save);
        if (exitRes.error) return exitRes;
        return $defce2f29876acb7$export$6ed414b8d8bead88.stop();
    },
    updateProgress: (percentageCompleted)=>{
        console.log("new percentage");
        console.log(percentageCompleted);
        console.log("old percentage");
        console.log($defce2f29876acb7$export$6ed414b8d8bead88.getProgress());
        const oldRes = $defce2f29876acb7$export$6ed414b8d8bead88.getProgress();
        if (percentageCompleted > oldRes) {
            console.log("higher?");
            // service.courseProgress = percentageCompleted;
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", percentageCompleted);
        }
        console.log(percentageCompleted);
        $defce2f29876acb7$export$6ed414b8d8bead88.save();
    },
    finish: ()=>{
        console.log("DONE");
        // SCORM 2004
        // service.setValue('cmi.progress_measure', service.getProgress);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.raw", 90.0);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        // SCORM 1.2 (status is handled separately, but scores will conflict, so only update 1)
        $defce2f29876acb7$export$6ed414b8d8bead88.updateStatus("success");
        // service.setValue('cmi.core.score.raw', 87.0);
        $defce2f29876acb7$export$6ed414b8d8bead88.save();
        console.log("SERVICE:");
        console.log($defce2f29876acb7$export$6ed414b8d8bead88);
        $defce2f29876acb7$export$6ed414b8d8bead88.exit();
    }
};
var $defce2f29876acb7$export$2e2bcd8739ae039 = {
    service: $defce2f29876acb7$export$6ed414b8d8bead88
};




export {$defce2f29876acb7$export$6ed414b8d8bead88 as service};
//# sourceMappingURL=scrowl.runtime.module.js.map
