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
        if (win.parent != null && win.parent != win) // @ts-ignore
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
        console.debug(`API.Commit`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.session_time", $b3d1e3300d945f09$export$6ed414b8d8bead88._time.getSessionTime());
        API.Commit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        console.debug("API.Initialize()");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.init = false;
        if (!$b3d1e3300d945f09$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $b3d1e3300d945f09$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($b3d1e3300d945f09$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $b3d1e3300d945f09$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $b3d1e3300d945f09$export$6ed414b8d8bead88.init = true;
        return [
            $b3d1e3300d945f09$export$6ed414b8d8bead88.init,
            $b3d1e3300d945f09$export$6ed414b8d8bead88.API
        ];
    },
    // { m: 1, l: 1, s?: 3 }
    updateLocation: (location, slideId)=>{
        console.log(`API.UpdateLocation`);
        console.log(location);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        // {m:1, l:1, s?:3} || {} || null
        try {
            const [error, location] = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.location");
            if (error || !location) return [
                true,
                {}
            ];
            return [
                false,
                JSON.parse(location)
            ];
        } catch (e) {
            console.error(e);
            return [
                true,
                {}
            ];
        }
    },
    getProgress: ()=>{
        console.debug(`API.GetProgress`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
            if (error || !progress) return [
                true,
                {}
            ];
            return [
                false,
                progress
            ];
        } catch (e) {
            console.error(e);
            return [
                true,
                {}
            ];
        }
    },
    updateProgress: (progressPercentage)=>{
        console.log(`API.UpdateProgress`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    start: ()=>{
        console.debug(`API.Start`);
        $b3d1e3300d945f09$export$6ed414b8d8bead88._time.startTime = new Date();
        $b3d1e3300d945f09$export$6ed414b8d8bead88.getAPI(window);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API?.Initialize("");
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, completionStatus] = $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (statusError) return [
            true
        ];
        if (completionStatus === "unknown") {
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
        } else {
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.scaled", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.score.scaled")[1]);
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.raw", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.score.raw")[1]);
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.success_status")[1]);
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.progress_measure")[1]);
            $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", $b3d1e3300d945f09$export$6ed414b8d8bead88.getValue("cmi.completion_status")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        console.log("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $b3d1e3300d945f09$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        $b3d1e3300d945f09$export$6ed414b8d8bead88.commit();
        API.Terminate("");
        return [
            false
        ];
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) API.SetValue(elem, val);
        else console.warn(`Unable to set value for ${elem}: value undefined`);
        // if (service.API.SetValue(elem, val) === 'false') {
        //   throw {
        //     message: `SCORM service failed to set ${elem} to ${val}`,
        //     data: service.getError(true),
        //   };
        // }
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $b3d1e3300d945f09$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true,
                ""
            ];
        }
        const getRes = API.GetValue(elem);
        if (getRes === "false") {
            console.error(`API failed to get value for: ${elem}`);
            return [
                true,
                ""
            ];
        }
        return [
            false,
            getRes
        ];
    }
};
var $b3d1e3300d945f09$export$2e2bcd8739ae039 = {
    service: $b3d1e3300d945f09$export$6ed414b8d8bead88
};


$parcel$exportWildcard(module.exports, $5a873cbe6b6bfafe$exports);
$parcel$exportWildcard(module.exports, $b3d1e3300d945f09$exports);


//# sourceMappingURL=scrowl.runtime.js.map
