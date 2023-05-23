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
const $29add62a37af587e$export$6ed414b8d8bead88 = {
    version: "2004v3",
    init: false,
    finished: false,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($29add62a37af587e$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $29add62a37af587e$export$6ed414b8d8bead88._time.startTime.getTime();
            return $29add62a37af587e$export$6ed414b8d8bead88._time.convert(sessionTime);
        },
        end: undefined,
        convert: (total)=>{
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
            let timespan = "PT" + totalH + "H" + totalM + "M" + totalS + "S";
            if (totalH > 9999) timespan = "9999:99:99";
            return timespan;
        }
    },
    API: null,
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit) return {
            error: true,
            message: "Service is not initialized"
        };
        const errorId = API.GetLastError();
        const errorMsg = API.GetErrorString(errorId);
        const errorStack = API.GetDiagnostic(errorId);
        const apiError = {
            id: errorId,
            message: errorMsg,
            stack: errorStack
        };
        if (printError) {
            console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
            const errorEvent = new CustomEvent("scormError", {
                detail: apiError
            });
            document.dispatchEvent(errorEvent);
            return {
                error: true,
                data: apiError
            };
        }
        return {
            error: false,
            data: apiError
        };
    },
    commit: ()=>{
        console.debug(`API.Commit`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.session_time", $29add62a37af587e$export$6ed414b8d8bead88._time.getSessionTime());
        API.Commit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $29add62a37af587e$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        $29add62a37af587e$export$6ed414b8d8bead88.init = false;
        if (!$29add62a37af587e$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $29add62a37af587e$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($29add62a37af587e$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $29add62a37af587e$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $29add62a37af587e$export$6ed414b8d8bead88.init = true;
        return [
            $29add62a37af587e$export$6ed414b8d8bead88.init,
            $29add62a37af587e$export$6ed414b8d8bead88.API
        ];
    },
    updateLocation: (location, slideId)=>{
        console.debug(`API.UpdateLocation`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $29add62a37af587e$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, location] = $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.location");
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
    getSuspendData: ()=>{
        console.debug(`API.GetSuspendData`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get suspend data: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, suspendData] = $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
            if (error || !suspendData) return [
                true,
                {}
            ];
            return [
                false,
                suspendData
            ];
        } catch (e) {
            console.error(e);
            return [
                true,
                {}
            ];
        }
    },
    setCourseStart: ()=>{
        console.debug(`API.SetCourseStart`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update suspend data: service not initialized`);
            return [
                true,
                {}
            ];
        }
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.suspend_data", JSON.stringify({
            courseStarted: true
        }));
        $29add62a37af587e$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getProgress: ()=>{
        console.debug(`API.GetProgress`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
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
        console.debug(`API.UpdateProgress`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
        // error 403 = Data Model Element Value Not Initialized (first time setting progress)
        // @ts-ignore
        if (progressError && previousProgress.data.id === "403") {
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $29add62a37af587e$export$6ed414b8d8bead88.commit();
        }
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $29add62a37af587e$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    start: (api)=>{
        console.debug(`API.Start 2004v3`);
        $29add62a37af587e$export$6ed414b8d8bead88.API = api;
        $29add62a37af587e$export$6ed414b8d8bead88._time.startTime = new Date();
        $29add62a37af587e$export$6ed414b8d8bead88.API?.Initialize("");
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, completionStatus] = $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (statusError) return [
            true
        ];
        if (completionStatus === "unknown") {
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 0);
            const startLocation = {
                cur: {
                    m: 0,
                    l: 0,
                    s: 0
                },
                max: {
                    m: 0,
                    l: 0,
                    s: 0
                }
            };
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify(startLocation));
        } else {
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.success_status", $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.success_status")[1]);
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.progress_measure")[1]);
            $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.completion_status", $29add62a37af587e$export$6ed414b8d8bead88.getValue("cmi.completion_status")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $29add62a37af587e$export$6ed414b8d8bead88.commit();
        console.debug("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $29add62a37af587e$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        $29add62a37af587e$export$6ed414b8d8bead88.commit();
        API.Terminate("");
        return [
            false
        ];
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) {
            if (API.SetValue(elem, val) === "false") $29add62a37af587e$export$6ed414b8d8bead88.getError(true);
        } else console.warn(`Unable to set value for ${elem}: value undefined`);
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $29add62a37af587e$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true,
                ""
            ];
        }
        const getRes = API.GetValue(elem);
        if (getRes === "") {
            console.error(`API failed to get value for: ${elem}`);
            $29add62a37af587e$export$6ed414b8d8bead88.getError(true);
        }
        return [
            false,
            getRes
        ];
    }
};
var $29add62a37af587e$export$2e2bcd8739ae039 = {
    service: $29add62a37af587e$export$6ed414b8d8bead88
};


const $bc9227963e5f4dff$export$6ed414b8d8bead88 = {
    version: "1.2",
    init: false,
    finished: false,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($bc9227963e5f4dff$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $bc9227963e5f4dff$export$6ed414b8d8bead88._time.startTime.getTime();
            return $bc9227963e5f4dff$export$6ed414b8d8bead88._time.convert(sessionTime);
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
            // should eventually check SCORM version and format time accordingly
            let timespan = ZeroPad(totalH, 4) + ":" + ZeroPad(totalM, 2) + ":" + ZeroPad(totalS, 2);
            if (totalH > 9999) timespan = "9999:99:99";
            return timespan;
        }
    },
    API: null,
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit) return {
            error: true,
            message: "Service is not initialized"
        };
        const errorId = API.LMSGetLastError();
        const errorMsg = API.LMSGetErrorString(errorId);
        const errorStack = API.LMSGetDiagnostic(errorId);
        const apiError = {
            id: errorId,
            message: errorMsg,
            stack: errorStack
        };
        if (printError) {
            console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
            const errorEvent = new CustomEvent("scormError", {
                detail: apiError
            });
            document.dispatchEvent(errorEvent);
        }
        return {
            error: false,
            data: apiError
        };
    },
    commit: ()=>{
        console.debug(`API.Commit`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.session_time", $bc9227963e5f4dff$export$6ed414b8d8bead88._time.getSessionTime());
        API.LMSCommit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        $bc9227963e5f4dff$export$6ed414b8d8bead88.init = false;
        if (!$bc9227963e5f4dff$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $bc9227963e5f4dff$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($bc9227963e5f4dff$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $bc9227963e5f4dff$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $bc9227963e5f4dff$export$6ed414b8d8bead88.init = true;
        return [
            $bc9227963e5f4dff$export$6ed414b8d8bead88.init,
            $bc9227963e5f4dff$export$6ed414b8d8bead88.API
        ];
    },
    updateLocation: (location, slideId)=>{
        console.debug(`API.UpdateLocation`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.lesson_location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, location] = $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.core.lesson_location");
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
    setCourseStart: ()=>{
        console.debug(`API.SetCourseStart`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set suspend data: service not initialized`);
            return [
                true,
                {}
            ];
        }
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", JSON.stringify({
            courseStarted: true
        }));
        $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getSuspendData: ()=>{
        console.debug(`API.GetSuspendData`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get suspend data: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, suspendData] = $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
            if (error || !suspendData) return [
                true,
                {}
            ];
            return [
                false,
                suspendData
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
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
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
        console.debug(`API.UpdateProgress`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
        // error 403 = Data Model Element Value Not Initialized (first time setting progress)
        // @ts-ignore
        if (progressError && previousProgress.data.id === "403") {
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", progressPercentage);
            $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        }
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", progressPercentage);
            $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    start: (api)=>{
        console.debug(`API.Start 1.2`);
        $bc9227963e5f4dff$export$6ed414b8d8bead88._time.startTime = new Date();
        $bc9227963e5f4dff$export$6ed414b8d8bead88.API = api;
        $bc9227963e5f4dff$export$6ed414b8d8bead88.API?.LMSInitialize("");
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, lessonStatus] = $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.core.lesson_status");
        if (statusError) return [
            true
        ];
        if (lessonStatus === "unknown" || lessonStatus === "not attempted") {
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", "incomplete");
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", 0);
            const startLocation = {
                cur: {
                    m: 0,
                    l: 0,
                    s: 0
                },
                max: {
                    m: 0,
                    l: 0,
                    s: 0
                }
            };
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.lesson_location", JSON.stringify(startLocation));
        } else {
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.core.lesson_status")[1]);
            $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", $bc9227963e5f4dff$export$6ed414b8d8bead88.getValue("cmi.suspend_data")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.exit", "suspend");
        $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        console.debug("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.score.raw", 100);
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", "passed");
        $bc9227963e5f4dff$export$6ed414b8d8bead88.setValue("cmi.suspend_data", 1);
        $bc9227963e5f4dff$export$6ed414b8d8bead88.commit();
        API.LMSFinish("");
        return [
            false
        ];
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) {
            if (API.LMSSetValue(elem, val) === "false") $bc9227963e5f4dff$export$6ed414b8d8bead88.getError(true);
        } else console.warn(`Unable to set value for ${elem}: value undefined`);
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $bc9227963e5f4dff$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true,
                ""
            ];
        }
        const getRes = API.LMSGetValue(elem);
        if (getRes === "") {
            console.error(`API failed to get value for: ${elem}`);
            $bc9227963e5f4dff$export$6ed414b8d8bead88.getError(true);
        }
        return [
            false,
            getRes
        ];
    }
};
var $bc9227963e5f4dff$export$2e2bcd8739ae039 = {
    service: $bc9227963e5f4dff$export$6ed414b8d8bead88
};


const $b3d1e3300d945f09$export$6ed414b8d8bead88 = {
    API: null,
    version: "1.2",
    _scanApi: (win, v)=>{
        let retries = 0;
        // Check to see if the window (win) contains the API
        // if the window (win) does not contain the API and
        // the window (win) has a parent window and the parent window
        // is not the same as the window (win)
        while(win[v] == null && win.parent != null && win.parent != win){
            // increment the number of findAPITries
            retries++;
            // Note: 7 is an arbitrary number, but should be more than sufficient
            if (retries > 7) {
                alert("Error finding API -- too deeply nested.");
                return null;
            }
            // set the variable that represents the window being
            // being searched to be the parent of the current window
            // then search for the API again
            win = win.parent;
        }
        return win[v];
    },
    // @ts-ignore
    start: (apiPreference)=>{
        let API;
        switch(apiPreference){
            case (0, $29add62a37af587e$export$6ed414b8d8bead88).version:
                API = $b3d1e3300d945f09$export$6ed414b8d8bead88._scanApi(window, "API_1484_11");
                $b3d1e3300d945f09$export$6ed414b8d8bead88.version = apiPreference;
                Object.assign($b3d1e3300d945f09$export$6ed414b8d8bead88, (0, $29add62a37af587e$export$6ed414b8d8bead88));
                break;
            case (0, $bc9227963e5f4dff$export$6ed414b8d8bead88).version:
            default:
                API = $b3d1e3300d945f09$export$6ed414b8d8bead88._scanApi(window, "API");
                $b3d1e3300d945f09$export$6ed414b8d8bead88.version = apiPreference;
                Object.assign($b3d1e3300d945f09$export$6ed414b8d8bead88, (0, $bc9227963e5f4dff$export$6ed414b8d8bead88));
                break;
        }
        if (!API) {
            console.error("Unable to start scorm runtime service");
            return [
                false
            ];
        }
        $b3d1e3300d945f09$export$6ed414b8d8bead88.API = API;
        // @ts-ignore
        $b3d1e3300d945f09$export$6ed414b8d8bead88.start(API);
        return [
            true
        ];
    }
};
var $b3d1e3300d945f09$export$2e2bcd8739ae039 = {
    service: $b3d1e3300d945f09$export$6ed414b8d8bead88
};


$parcel$exportWildcard(module.exports, $5a873cbe6b6bfafe$exports);
$parcel$exportWildcard(module.exports, $b3d1e3300d945f09$exports);


//# sourceMappingURL=scrowl.runtime.js.map
