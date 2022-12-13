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
const $b3d1e3300d945f09$export$6ed414b8d8bead88 = {
    init: false,
    finished: false,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($b3d1e3300d945f09$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $b3d1e3300d945f09$export$6ed414b8d8bead88._time.startTime.getTime();
            return $b3d1e3300d945f09$export$6ed414b8d8bead88._time.convert(sessionTime);
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
            $b3d1e3300d945f09$export$6ed414b8d8bead88.nFindAPITries++;
            if ($b3d1e3300d945f09$export$6ed414b8d8bead88.nFindAPITries > $b3d1e3300d945f09$export$6ed414b8d8bead88.maxTries) return null;
            win = win.parent;
        }
        return win.API_1484_11;
    },
    getAPI: (win)=>{
        if (win.parent != null && win.parent != win) //@ts-ignore
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API = $b3d1e3300d945f09$export$6ed414b8d8bead88.scanForAPI(win.parent);
        if ($b3d1e3300d945f09$export$6ed414b8d8bead88.API == null && win.opener != null) // @ts-ignore
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API = $b3d1e3300d945f09$export$6ed414b8d8bead88.scanForAPI(win.opener);
    },
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const res = $b3d1e3300d945f09$export$6ed414b8d8bead88.isAvailable();
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
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) throw "MISSING_SCORM_API";
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.session_time", $b3d1e3300d945f09$export$6ed414b8d8bead88._time.getSessionTime());
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API.Commit("");
        console.log("API.Commit()");
        if ($b3d1e3300d945f09$export$6ed414b8d8bead88.API.Commit("") === "false") throw "ERROR_COMMIT_SCORM_API";
    },
    exit: ()=>{
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
    },
    initialize: ()=>{
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) throw "MISSING_SCORM_API";
        console.log("API.Initialize()");
        if ($b3d1e3300d945f09$export$6ed414b8d8bead88.API.Initialize("") === "false") throw "ERROR_INIT_SCORM_API";
    },
    // { m: 1, l: 1, s?: 3 }
    updateLocation: (location, progressPercentage)=>{
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location.lesson
        }));
        // Update progress
        progressPercentage = progressPercentage || 0;
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
    },
    getLocation: ()=>{
        // {m:1, l:1, s?:3} || {} || null
        try {
            return JSON.parse($b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.location"));
        } catch (e) {
            return {};
        }
    },
    start: ()=>{
        $b3d1e3300d945f09$export$6ed414b8d8bead88._time.startTime = new Date();
        $b3d1e3300d945f09$export$6ed414b8d8bead88.getAPI(window);
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) throw "MISSING_SCORM_API";
        $b3d1e3300d945f09$export$6ed414b8d8bead88.init = true;
        $b3d1e3300d945f09$export$6ed414b8d8bead88.initialize();
        const completionStatus = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (completionStatus === "unknown") {
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
        } else {
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.scaled", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.score.scaled"));
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.raw", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.score.raw"));
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.success_status"));
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.progress_measure"));
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.completion_status"));
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        return {
            error: false
        };
    },
    finish: ()=>{
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        console.log("SERVICE");
        console.log($b3d1e3300d945f09$export$6ed414b8d8bead88);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API?.Terminate("");
    },
    setValue: (elem, val)=>{
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) throw "MISSING_SCORM_API";
        console.log("API.SetValue", elem, val);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API.SetValue(elem, val);
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
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) throw "MISSING_SCORM_API";
        const getRes = $b3d1e3300d945f09$export$6ed414b8d8bead88.API.GetValue(elem);
        if (getRes === "false") throw {
            message: `SCORM service failed to get ${elem}`,
            data: $b3d1e3300d945f09$export$6ed414b8d8bead88.getError(true)
        };
        console.log("API.GetValue", elem, getRes);
        return getRes;
    }
};
var $b3d1e3300d945f09$export$2e2bcd8739ae039 = {
    service: $b3d1e3300d945f09$export$6ed414b8d8bead88
};


$parcel$exportWildcard(module.exports, $5a873cbe6b6bfafe$exports);
$parcel$exportWildcard(module.exports, $b3d1e3300d945f09$exports);


//# sourceMappingURL=scrowl.runtime.js.map
