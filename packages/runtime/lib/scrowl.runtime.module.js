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
            console.log("GET TIME");
            console.log(sessionTime);
            console.log($defce2f29876acb7$export$6ed414b8d8bead88._time.convert(sessionTime));
            return $defce2f29876acb7$export$6ed414b8d8bead88._time.convert(sessionTime);
        },
        end: undefined,
        convert: (total)=>{
            // @ts-ignore
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
            let timespan = "PT" + totalH + // ZeroPad(totalH, 4) +
            "H" + totalM + // ZeroPad(totalM, 2) +
            "M" + totalS + // ZeroPad(totalS, 2) +
            "S";
            if (totalH > 9999) timespan = "9999:99:99";
            console.log("TIMESPAN");
            console.log(timespan);
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
        if (win.parent != null && win.parent != win) // @ts-ignore
        $defce2f29876acb7$export$6ed414b8d8bead88.API = $defce2f29876acb7$export$6ed414b8d8bead88.scanForAPI(win.parent);
        if ($defce2f29876acb7$export$6ed414b8d8bead88.API == null && win.opener != null) // @ts-ignore
        $defce2f29876acb7$export$6ed414b8d8bead88.API = $defce2f29876acb7$export$6ed414b8d8bead88.scanForAPI(win.opener);
    },
    getError: (printError)=>{
        printError = printError === undefined || printError === null ? true : printError;
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
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
        if (printError) console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
        return {
            error: false,
            data: apiError
        };
    },
    commit: ()=>{
        console.debug(`API.Commit`);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.session_time", $defce2f29876acb7$export$6ed414b8d8bead88._time.getSessionTime());
        API.Commit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $defce2f29876acb7$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        console.debug("API.Initialize()");
        $defce2f29876acb7$export$6ed414b8d8bead88.init = false;
        if (!$defce2f29876acb7$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $defce2f29876acb7$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($defce2f29876acb7$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $defce2f29876acb7$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $defce2f29876acb7$export$6ed414b8d8bead88.init = true;
        return [
            $defce2f29876acb7$export$6ed414b8d8bead88.init,
            $defce2f29876acb7$export$6ed414b8d8bead88.API
        ];
    },
    // { m: 1, l: 1, s?: 3 }
    updateLocation: (location, slideId)=>{
        console.log(`API.UpdateLocation`);
        console.log(location);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        // {m:1, l:1, s?:3} || {} || null
        try {
            const [error, location] = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.location");
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
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
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
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
        // error 403 = Data Model Element Value Not Initialized (first time setting progress)
        // @ts-ignore
        if (progressError && previousProgress.data.id === "403") {
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        }
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    start: ()=>{
        console.debug(`API.Start`);
        $defce2f29876acb7$export$6ed414b8d8bead88._time.startTime = new Date();
        $defce2f29876acb7$export$6ed414b8d8bead88.getAPI(window);
        $defce2f29876acb7$export$6ed414b8d8bead88.API?.Initialize("");
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, completionStatus] = $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (statusError) return [
            true
        ];
        if (completionStatus === "unknown") {
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
        } else {
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.scaled", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.score.scaled")[1]);
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.raw", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.score.raw")[1]);
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.success_status")[1]);
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.progress_measure")[1]);
            $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", $defce2f29876acb7$export$6ed414b8d8bead88.getValue("cmi.completion_status")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        console.log("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $defce2f29876acb7$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        $defce2f29876acb7$export$6ed414b8d8bead88.commit();
        API.Terminate("");
        return [
            false
        ];
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) {
            if (API.SetValue(elem, val) === "false") $defce2f29876acb7$export$6ed414b8d8bead88.getError(true);
        // return [true, service.getError(true)];
        } else console.warn(`Unable to set value for ${elem}: value undefined`);
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $defce2f29876acb7$export$6ed414b8d8bead88.isInitialized();
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
            $defce2f29876acb7$export$6ed414b8d8bead88.getError(true);
        }
        return [
            false,
            getRes
        ];
    }
};
var $defce2f29876acb7$export$2e2bcd8739ae039 = {
    service: $defce2f29876acb7$export$6ed414b8d8bead88
};




export {$defce2f29876acb7$export$6ed414b8d8bead88 as service};
//# sourceMappingURL=scrowl.runtime.module.js.map
