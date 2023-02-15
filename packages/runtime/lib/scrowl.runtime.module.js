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
const $cefd77ae0ca42fc5$export$93a0b81c2b28266f = {
    ENDPOINT: "https://cloud.scorm.com/lrs/P9AQQNBMYJ/sandbox",
    AUTH_USER: "nI9YC1Jcy2bR5HLGFU8",
    AUTH_PASSWORD: "GuBkhtMVy0essGGJgtA"
};


const $704b14303ded74fd$var$TinCan = window["TinCan"];
const $704b14303ded74fd$export$6ed414b8d8bead88 = {
    version: "2004v3",
    init: false,
    finished: false,
    //@ts-ignore
    tincan: null,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($704b14303ded74fd$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $704b14303ded74fd$export$6ed414b8d8bead88._time.startTime.getTime();
            return $704b14303ded74fd$export$6ed414b8d8bead88._time.convert(sessionTime);
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
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
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
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.session_time", $704b14303ded74fd$export$6ed414b8d8bead88._time.getSessionTime());
        API.Commit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $704b14303ded74fd$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        $704b14303ded74fd$export$6ed414b8d8bead88.init = false;
        if (!$704b14303ded74fd$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $704b14303ded74fd$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($704b14303ded74fd$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $704b14303ded74fd$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $704b14303ded74fd$export$6ed414b8d8bead88.init = true;
        return [
            $704b14303ded74fd$export$6ed414b8d8bead88.init,
            $704b14303ded74fd$export$6ed414b8d8bead88.API
        ];
    },
    //@ts-ignore
    updateLocationXAPI: (location, slideId, courseName)=>{
        console.debug(`API.UpdateLocationXAPI`);
        var advanceSlideExperience = new $704b14303ded74fd$var$TinCan.Statement({
            actor: {
                name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/experienced"
            },
            target: {
                id: `https://osg.ca/api/v1/activities/courses/${courseName}/update-slide-${slideId}`,
                definition: {
                    name: {
                        "en-US": `Update Slide: ${slideId}`
                    }
                }
            }
        });
        // @ts-ignore
        $704b14303ded74fd$export$6ed414b8d8bead88.tincan.saveStatement(advanceSlideExperience, {
            callback: function(err, xhr) {
                if (err !== null) {
                    if (xhr !== null) {
                        console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                        // TODO: do something with error, didn't save statement
                        return;
                    }
                    console.log("Failed to save statement: " + err);
                    // TODO: do something with error, didn't save statement
                    return;
                }
                console.log("Statement saved");
            // TOOO: do something with success (possibly ignore)
            }
        });
    },
    updateLocation: (location, slideId)=>{
        console.debug(`API.UpdateLocation`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $704b14303ded74fd$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, location] = $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.location");
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
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
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
    updateProgressXAPI: (project, lessonId, moduleCompleted, completedModule)=>{
        console.debug(`API.UpdateProgressXAPI`);
        let statements = [];
        let completedModuleExperience;
        var completedLessonExperience = new $704b14303ded74fd$var$TinCan.Statement({
            actor: {
                name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/completed"
            },
            target: {
                id: `https://osg.ca/api/v1/activities/courses/${project.name}/completed-${lessonId}`,
                definition: {
                    name: {
                        "en-US": `Completed Lesson: ${lessonId}`
                    }
                }
            }
        });
        // @ts-ignore
        statements.push(completedLessonExperience);
        if (moduleCompleted) {
            completedModuleExperience = new $704b14303ded74fd$var$TinCan.Statement({
                actor: {
                    name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                    mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
                },
                verb: {
                    id: "http://adlnet.gov/expapi/verbs/completed"
                },
                target: {
                    id: `https://osg.ca/api/v1/activities/courses/${project.name}/completed-${completedModule}`,
                    definition: {
                        name: {
                            "en-US": `Completed Module: ${completedModule}`
                        }
                    }
                }
            });
            // @ts-ignore
            statements.push(completedModuleExperience);
        }
        statements.forEach((statement)=>{
            // @ts-ignore
            $704b14303ded74fd$export$6ed414b8d8bead88.tincan.saveStatement(statement, {
                callback: function(err, xhr) {
                    if (err !== null) {
                        if (xhr !== null) {
                            console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                            // TODO: do something with error, didn't save statement
                            return;
                        }
                        console.log("Failed to save statement: " + err);
                        // TODO: do something with error, didn't save statement
                        return;
                    }
                    console.log("Statement saved");
                // TOOO: do something with success (possibly ignore)
                }
            });
        });
    },
    updateProgress: (progressPercentage)=>{
        console.debug(`API.UpdateProgress`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.progress_measure");
        // error 403 = Data Model Element Value Not Initialized (first time setting progress)
        // @ts-ignore
        if (progressError && previousProgress.data.id === "403") {
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $704b14303ded74fd$export$6ed414b8d8bead88.commit();
        }
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.progress_measure", progressPercentage);
            $704b14303ded74fd$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    // @ts-ignore
    startXAPI: (courseName)=>{
        console.debug("start XAPI");
        if ($704b14303ded74fd$var$TinCan) {
            try {
                // @ts-ignore
                $704b14303ded74fd$export$6ed414b8d8bead88.tincan = new $704b14303ded74fd$var$TinCan.LRS({
                    endpoint: (0, $cefd77ae0ca42fc5$export$93a0b81c2b28266f).ENDPOINT,
                    username: (0, $cefd77ae0ca42fc5$export$93a0b81c2b28266f).AUTH_USER,
                    password: (0, $cefd77ae0ca42fc5$export$93a0b81c2b28266f).AUTH_PASSWORD,
                    allowFail: false
                });
            } catch (ex) {
                console.log("Failed to setup LRS object: ", ex);
            // TODO: do something with error, can't communicate with LRS
            }
            const statements = [];
            var intializeCourse = new $704b14303ded74fd$var$TinCan.Statement({
                actor: {
                    name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                    mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
                },
                verb: {
                    id: "http://adlnet.gov/expapi/verbs/initialized",
                    display: {
                        und: "initialized"
                    }
                },
                target: {
                    id: `https://osg.ca/api/v1/activities/courses/${courseName}/`,
                    definition: {
                        name: {
                            "en-US": `LMS Course: ${courseName}`
                        }
                    }
                }
            });
            // @ts-ignore
            // statements.push(launchExperience);
            // @ts-ignore
            statements.push(intializeCourse);
            statements.forEach((statement)=>{
                // @ts-ignore
                $704b14303ded74fd$export$6ed414b8d8bead88.tincan.saveStatement(statement, {
                    callback: function(err, xhr) {
                        if (err !== null) {
                            if (xhr !== null) {
                                console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                                // TODO: do something with error, didn't save statement
                                return;
                            }
                            console.log("Failed to save statement: " + err);
                            // TODO: do something with error, didn't save statement
                            return;
                        }
                        console.log("Statement saved");
                    // TOOO: do something with success (possibly ignore)
                    }
                });
            });
        }
    },
    start: (api)=>{
        console.debug(`API.Start 2004v3`);
        $704b14303ded74fd$export$6ed414b8d8bead88.API = api;
        $704b14303ded74fd$export$6ed414b8d8bead88._time.startTime = new Date();
        $704b14303ded74fd$export$6ed414b8d8bead88.API?.Initialize("");
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, completionStatus] = $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.completion_status");
        if (statusError) return [
            true
        ];
        if (completionStatus === "unknown") {
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.completion_status", "incomplete");
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.success_status", "unknown");
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.suspend_data", "{}");
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
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.location", JSON.stringify(startLocation));
        } else {
            // service.setValue(
            //   'cmi.score.scaled',
            //   service.getValue('cmi.score.scaled')[1]
            // );
            // service.setValue('cmi.score.raw', service.getValue('cmi.score.raw')[1]);
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.success_status", $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.success_status")[1]);
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.progress_measure", $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.progress_measure")[1]);
            $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.completion_status", $704b14303ded74fd$export$6ed414b8d8bead88.getValue("cmi.completion_status")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.exit", "suspend");
        $704b14303ded74fd$export$6ed414b8d8bead88.commit();
        console.debug("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.score.min", 0);
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.score.max", 100);
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.score.scaled", 1);
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.score.raw", 100);
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.success_status", "passed");
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.progress_measure", 1);
        $704b14303ded74fd$export$6ed414b8d8bead88.setValue("cmi.completion_status", "completed");
        $704b14303ded74fd$export$6ed414b8d8bead88.commit();
        API.Terminate("");
        return [
            false
        ];
    },
    finishXAPI: (project, moduleIndex)=>{
        console.debug(`API.FinishXAPI`);
        let statements = [];
        const completedModuleExperience = new $704b14303ded74fd$var$TinCan.Statement({
            actor: {
                name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/completed"
            },
            target: {
                id: `https://osg.ca/api/v1/activities/courses/${project.name}/completed-module-${moduleIndex}`,
                definition: {
                    name: {
                        "en-US": `Completed Module: module-${moduleIndex}`
                    }
                }
            }
        });
        //@ts-ignore
        console.log("service.tincan", $704b14303ded74fd$export$6ed414b8d8bead88.tincan);
        const completedCourseStatement = new $704b14303ded74fd$var$TinCan.Statement({
            actor: {
                name: $704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerName : "",
                mbox: `mailto:${$704b14303ded74fd$export$6ed414b8d8bead88.API ? $704b14303ded74fd$export$6ed414b8d8bead88.API.LearnerId : ""}`
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/completed",
                display: {
                    "en-US": "completed"
                }
            },
            target: {
                id: `https://osg.ca/api/v1/activities/courses/${project.name}`,
                definition: {
                    name: {
                        "en-US": project.name
                    }
                }
            },
            result: {
                completion: true,
                success: true,
                score: {
                    scaled: 0.9
                }
            }
        });
        // @ts-ignore
        statements.push(completedCourseStatement);
        // @ts-ignore
        statements.push(completedModuleExperience);
        statements.forEach((statement)=>{
            //@ts-ignore
            $704b14303ded74fd$export$6ed414b8d8bead88.tincan.saveStatement(statement, {
                callback: function(err, xhr) {
                    if (err !== null) {
                        if (xhr !== null) {
                            console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                            // TODO: do something with error, didn't save statement
                            return;
                        }
                        console.log("Failed to save statement: " + err);
                        // TODO: do something with error, didn't save statement
                        return;
                    }
                    console.log("Statement saved");
                // TOOO: do something with success (possibly ignore)
                }
            });
        });
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) {
            if (API.SetValue(elem, val) === "false") $704b14303ded74fd$export$6ed414b8d8bead88.getError(true);
        } else console.warn(`Unable to set value for ${elem}: value undefined`);
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $704b14303ded74fd$export$6ed414b8d8bead88.isInitialized();
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
            $704b14303ded74fd$export$6ed414b8d8bead88.getError(true);
        }
        return [
            false,
            getRes
        ];
    }
};
var $704b14303ded74fd$export$2e2bcd8739ae039 = {
    service: $704b14303ded74fd$export$6ed414b8d8bead88
};


const $0f0d20ec2fcb698f$export$6ed414b8d8bead88 = {
    version: "1.2",
    init: false,
    finished: false,
    _time: {
        startTime: undefined,
        getSessionTime: ()=>{
            let sessionTime;
            if ($0f0d20ec2fcb698f$export$6ed414b8d8bead88._time.startTime) sessionTime = new Date().getTime() - $0f0d20ec2fcb698f$export$6ed414b8d8bead88._time.startTime.getTime();
            return $0f0d20ec2fcb698f$export$6ed414b8d8bead88._time.convert(sessionTime);
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
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
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
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.session_time", $0f0d20ec2fcb698f$export$6ed414b8d8bead88._time.getSessionTime());
        API.LMSCommit("");
        return [
            false
        ];
    },
    exit: ()=>{
        console.debug("API.Exit");
        return $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
    },
    isInitialized: ()=>{
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.init = false;
        if (!$0f0d20ec2fcb698f$export$6ed414b8d8bead88.API) {
            console.error("MISSING_SCORM_API - INIT");
            return [
                $0f0d20ec2fcb698f$export$6ed414b8d8bead88.init,
                false
            ];
        }
        // @ts-ignore
        if ($0f0d20ec2fcb698f$export$6ed414b8d8bead88.API.Initialized === "false") {
            console.error("API failed to initialize");
            return [
                $0f0d20ec2fcb698f$export$6ed414b8d8bead88.init,
                false
            ];
        }
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.init = true;
        return [
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.init,
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.API
        ];
    },
    updateLocation: (location, slideId)=>{
        console.debug(`API.UpdateLocation`);
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true
            ];
        }
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.lesson_location", JSON.stringify({
            v1: 1,
            ...location,
            slideId: slideId
        }));
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
        return [
            false
        ];
    },
    getLocation: ()=>{
        console.debug(`API.GetLocation`);
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get location: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, location] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.core.lesson_location");
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
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to get progress: service not initialized`);
            return [
                true,
                {}
            ];
        }
        try {
            const [error, progress] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
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
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to update progress: service not initialized`);
            return [
                true
            ];
        }
        const [progressError, previousProgress] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.suspend_data");
        // error 403 = Data Model Element Value Not Initialized (first time setting progress)
        // @ts-ignore
        if (progressError && previousProgress.data.id === "403") {
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.suspend_data", progressPercentage);
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
        }
        if (!progressError) {
            if (!previousProgress || parseFloat(previousProgress) === 0 || progressPercentage > parseFloat(previousProgress)) $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.suspend_data", progressPercentage);
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
        }
        return [
            false
        ];
    },
    start: (api)=>{
        console.debug(`API.Start 1.2`);
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88._time.startTime = new Date();
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.API = api;
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.API?.LMSInitialize("");
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) return [
            true
        ];
        const [statusError, lessonStatus] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.core.lesson_status");
        if (statusError) return [
            true
        ];
        if (lessonStatus === "unknown" || lessonStatus === "not attempted") {
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", "incomplete");
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
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.lesson_location", JSON.stringify(startLocation));
        } else {
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.core.lesson_status")[1]);
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.suspend_data", $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getValue("cmi.suspend_data")[1]);
        }
        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.exit", "suspend");
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
        console.debug("runtime started");
        return [
            false
        ];
    },
    finish: ()=>{
        console.debug(`API.Finish`);
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to finish: service not initialized`);
            return [
                true
            ];
        }
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.score.raw", 100);
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.core.lesson_status", "passed");
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.setValue("cmi.suspend_data", 1);
        $0f0d20ec2fcb698f$export$6ed414b8d8bead88.commit();
        API.LMSFinish("");
        return [
            false
        ];
    },
    setValue: (elem, val)=>{
        console.debug(`API.SetValue for ${elem} to ${val}`);
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true
            ];
        }
        if (val !== undefined) {
            if (API.LMSSetValue(elem, val) === "false") $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getError(true);
        } else console.warn(`Unable to set value for ${elem}: value undefined`);
        return [
            false
        ];
    },
    getValue: (elem)=>{
        console.debug(`API.GetValue for ${elem}`);
        const [isInit, API] = $0f0d20ec2fcb698f$export$6ed414b8d8bead88.isInitialized();
        if (!isInit || !API) {
            console.warn(`Unable to set value for ${elem}: service not initialized`);
            return [
                true,
                ""
            ];
        }
        const getRes = API.LMSGetValue(elem);
        // Unlike in SCORM 2004v3, failing to retrieve a value from the LMS does not cause an error: it just returns an empty string and continues. Below has been added to keep 1.2 consistent with 2004, but for now I don't think we should treat this as an error
        // if (getRes === '' || getRes === null || getRes === undefined) {
        //   const apiError = {
        //     id: '403',
        //     message: `Data Model Element Not Initialized`,
        //     stack: `The ${elem} field has not been set for this SCO.`,
        //   };
        //   const errorEvent = new CustomEvent('scormError', {
        //     detail: apiError,
        //   });
        //   document.dispatchEvent(errorEvent);
        // }
        if (getRes === "") {
            console.error(`API failed to get value for: ${elem}`);
            $0f0d20ec2fcb698f$export$6ed414b8d8bead88.getError(true);
        }
        return [
            false,
            getRes
        ];
    }
};
var $0f0d20ec2fcb698f$export$2e2bcd8739ae039 = {
    service: $0f0d20ec2fcb698f$export$6ed414b8d8bead88
};


const $defce2f29876acb7$export$6ed414b8d8bead88 = {
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
            case (0, $704b14303ded74fd$export$6ed414b8d8bead88).version:
                API = $defce2f29876acb7$export$6ed414b8d8bead88._scanApi(window, "API_1484_11");
                $defce2f29876acb7$export$6ed414b8d8bead88.version = apiPreference;
                Object.assign($defce2f29876acb7$export$6ed414b8d8bead88, (0, $704b14303ded74fd$export$6ed414b8d8bead88));
                break;
            case (0, $0f0d20ec2fcb698f$export$6ed414b8d8bead88).version:
            default:
                API = $defce2f29876acb7$export$6ed414b8d8bead88._scanApi(window, "API");
                $defce2f29876acb7$export$6ed414b8d8bead88.version = apiPreference;
                Object.assign($defce2f29876acb7$export$6ed414b8d8bead88, (0, $0f0d20ec2fcb698f$export$6ed414b8d8bead88));
                break;
        }
        if (!API) {
            console.error("Unable to start scorm runtime service");
            return [
                false
            ];
        }
        $defce2f29876acb7$export$6ed414b8d8bead88.API = API;
        // @ts-ignore
        $defce2f29876acb7$export$6ed414b8d8bead88.start(API);
        return [
            true
        ];
    }
};
var $defce2f29876acb7$export$2e2bcd8739ae039 = {
    service: $defce2f29876acb7$export$6ed414b8d8bead88
};




export {$defce2f29876acb7$export$6ed414b8d8bead88 as service};
//# sourceMappingURL=scrowl.runtime.module.js.map
