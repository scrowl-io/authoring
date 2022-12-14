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
const $defce2f29876acb7$export$6ed414b8d8bead88 = {
    init: false,
    finished: false,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($defce2f29876acb7$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $defce2f29876acb7$export$6ed414b8d8bead88._time.startTime.getTime();
            return $defce2f29876acb7$export$6ed414b8d8bead88._time.convert(sessionTime);
        },
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
    commit: ()=>{
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) console.error("MISSING_SCORM_API - COMMIT");
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.session_time", $defce2f29876acb7$export$6ed414b8d8bead88._time.getSessionTime());
        $defce2f29876acb7$export$6ed414b8d8bead88.API?.Commit("");
        console.log("API.Commit()");
        if ($defce2f29876acb7$export$6ed414b8d8bead88.API?.Commit("") === "false") throw "ERROR_COMMIT_SCORM_API";
    },
    exit: ()=>{
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
    },
    initialize: ()=>{
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) console.error("MISSING_SCORM_API - INIT");
        console.log("API.Initialize()");
        if ($defce2f29876acb7$export$6ed414b8d8bead88.API?.Initialize("") === "false") throw "ERROR_INIT_SCORM_API";
    },
    // { m: 1, l: 1, s?: 3 }
    updateLocation: (location, progressPercentage)=>{
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location.lesson
        }));
        // Update progress
        progressPercentage = progressPercentage || 0;
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
    },
    getLocation: ()=>{
        // {m:1, l:1, s?:3} || {} || null
        try {
            const location = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.location");
            if (location !== undefined) return JSON.parse(location);
        } catch (e) {
            return {};
        }
    },
    start: ()=>{
        $defce2f29876acb7$export$6ed414b8d8bead88._time.startTime = new Date();
        $defce2f29876acb7$export$6ed414b8d8bead88.getAPI(window);
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) console.error("MISSING_SCORM_API - START");
        $defce2f29876acb7$export$6ed414b8d8bead88.init = true;
        $defce2f29876acb7$export$6ed414b8d8bead88.initialize();
        const completionStatus = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (completionStatus === "unknown") {
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
        } else {
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.scaled", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.score.scaled"));
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.raw", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.score.raw"));
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.success_status"));
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.progress_measure"));
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.completion_status"));
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        return {
            error: false
        };
    },
    finish: ()=>{
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        console.log("SERVICE");
        console.log($defce2f29876acb7$export$6ed414b8d8bead88);
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        $defce2f29876acb7$export$6ed414b8d8bead88.API?.Terminate("");
    },
    setValue: (elem, val)=>{
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) console.error("MISSING_SCORM_API - SETVAL");
        console.log("API.SetValue", elem, val);
        if (val !== undefined) $defce2f29876acb7$export$6ed414b8d8bead88.API?.SetValue(elem, val);
        // if (service.API.SetValue(elem, val) === 'false') {
        //   throw {
        //     message: `SCORM service failed to set ${elem} to ${val}`,
        //     data: service.getError(true),
        //   };
        // }
        return {
            error: false
        };
    },
    getValue: (elem)=>{
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) console.error("MISSING_SCORM_API - GETVAL");
        const getRes = $defce2f29876acb7$export$6ed414b8d8bead88.API?.GetValue(elem);
        if (getRes === "false") throw {
            message: `SCORM service failed to get ${elem}`,
            data: $defce2f29876acb7$export$6ed414b8d8bead88.getError(true)
        };
        console.log("API.GetValue", elem, getRes);
        return getRes;
    }
};
var $defce2f29876acb7$export$2e2bcd8739ae039 = {
    service: $defce2f29876acb7$export$6ed414b8d8bead88
};




export {$defce2f29876acb7$export$6ed414b8d8bead88 as service};
//# sourceMappingURL=scrowl.runtime.module.js.map
