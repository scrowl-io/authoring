!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var s in r)("object"==typeof exports?exports:e)[s]=r[s]}}(self,(()=>(()=>{"use strict";var __webpack_modules__={166:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./src/runtime.ts\nconst hasProp = (obj, prop) => {\n    return Object.prototype.hasOwnProperty.call(obj, prop);\n};\nconst service = {\n    init: false,\n    finished: false,\n    _time: {\n        start: undefined,\n        end: undefined,\n        convert: (total) => {\n            function ZeroPad(val, pad) {\n                let res = new String(val);\n                const len = res.length;\n                if (len > pad) {\n                    return res.substr(0, pad);\n                }\n                for (let i = len; i < pad; i++) {\n                    res = '0' + res;\n                }\n                return res;\n            }\n            let totalMs = total % 1000;\n            let totalS = ((total - totalMs) / 1000) % 60;\n            let totalM = ((total - totalMs - totalS * 1000) / 60000) % 60;\n            let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;\n            if (totalH == 10000) {\n                totalH = 9999;\n                totalM = (total - totalH * 3600000) / 60000;\n                if (totalM == 100) {\n                    totalM = 99;\n                }\n                totalM = Math.floor(totalM);\n                totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;\n                if (totalS == 100) {\n                    totalS = 99;\n                }\n                totalS = Math.floor(totalS);\n                totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;\n            }\n            let timespan = ZeroPad(totalH, 4) +\n                ':' +\n                ZeroPad(totalM, 2) +\n                ':' +\n                ZeroPad(totalS, 2);\n            if (totalH > 9999) {\n                timespan = '9999:99:99';\n            }\n            return timespan;\n        },\n    },\n    STATUSES: {\n        update: {\n            true: 'true',\n            false: 'false',\n        },\n        lesson: {\n            success: 'passed',\n            failed: 'failed',\n            done: 'completed',\n            active: 'incomplete',\n            viewed: 'browsed',\n            unseen: 'not attempted',\n        },\n        exit: {\n            timeout: 'time-out',\n            save: 'suspend',\n            logout: 'logout',\n        },\n    },\n    courseProgress: 0,\n    lessonLocation: '',\n    isAvailable: () => {\n        const isReady = service.init && !service.finished;\n        if (!isReady || !service.API) {\n            return {\n                error: true,\n                message: 'Service is unavailable',\n            };\n        }\n        return {\n            error: false,\n            API: service.API,\n        };\n    },\n    getError: (printError) => {\n        printError =\n            printError === undefined || printError === null ? true : printError;\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const errorId = res.API.LMSGetLastError();\n        const errorMsg = res.API.LMSGetErrorString(errorId);\n        const errorStack = res.API.LMSGetDiagnostic(errorId);\n        const apiError = {\n            id: errorId,\n            message: errorMsg,\n            stack: errorStack,\n        };\n        if (printError) {\n            console.error(`Error:\\n${JSON.stringify(apiError, null, 2)}`);\n        }\n        return {\n            error: false,\n            data: apiError,\n        };\n    },\n    _findAPI: (source) => {\n        let retryCnt = 0;\n        const retryLimit = 7;\n        if (source.API) {\n            return {\n                error: false,\n                API: source.API,\n            };\n        }\n        if (source.parent === source) {\n            return {\n                error: true,\n                message: 'Error: unable to find API - top level reached',\n            };\n        }\n        while (source.API == null &&\n            source.parent != null &&\n            retryCnt < retryLimit) {\n            retryCnt++;\n            source = source.parent;\n        }\n        if (retryCnt >= retryLimit) {\n            return {\n                error: true,\n                message: 'Error: unable to find API - nested to deep',\n            };\n        }\n        return {\n            error: false,\n            API: source.API,\n        };\n    },\n    start: () => {\n        const resFind = service._findAPI(window);\n        if (resFind.error) {\n            return resFind;\n        }\n        service.API = resFind.API;\n        service._time.start = new Date();\n        service.init = true;\n        const resInit = service.API.LMSInitialize();\n        if (resInit === service.STATUSES.update.false) {\n            return {\n                error: true,\n                message: 'SCORM service failed to initialize',\n                data: service.getError(),\n            };\n        }\n        console.log('cmi version:');\n        const version = service.getValue('cmi._version');\n        console.log(version);\n        console.log('lesson Status (1.2):');\n        const lessonStatus = service.getValue('cmi.core.lesson_status');\n        console.log(lessonStatus);\n        console.log('completion Status (2004):');\n        const completionStatus = service.getValue('cmi.completion_status');\n        console.log(completionStatus);\n        console.log('success Status (2004):');\n        const successStatus = service.getValue('cmi.success_status');\n        console.log(successStatus);\n        console.log('lesson location:');\n        const lessonLocation = service.getValue('cmi.core.lesson_location');\n        console.log(lessonLocation);\n        console.log('session time (1.2):');\n        const sessionTime = service.getValue('cmi.core.session_time');\n        console.log(sessionTime);\n        console.log('total time (1.2):');\n        const totalTime = service.getValue('cmi.core.totalTime');\n        console.log(totalTime);\n        console.log('session time (2004):');\n        const sessionTime2004 = service.getValue('cmi.session_time');\n        console.log(sessionTime2004);\n        // console.log('score raw (1.2):');\n        // const score_raw = service.getValue('cmi.core.score_raw');\n        // console.log(score_raw);\n        // console.log('score to pass (2004):');\n        // const score_pass_1 = service.getValue('cmi.scaled_passing_score');\n        // console.log(score_pass_1);\n        // console.log('score mastery (1.2):');\n        // const score_mastery = service.getValue('cmi.student_data.mastery_score');\n        // console.log(score_mastery);\n        console.log('course progress (2004):');\n        const progress_measure = service.getValue('cmi.progress_measure');\n        console.log(progress_measure);\n        console.log('score (2004):');\n        const scoreVal2004 = service.getValue('cmi.score.raw');\n        console.log(scoreVal2004);\n        return {\n            error: false,\n        };\n    },\n    save: () => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const resSave = res.API.LMSCommit();\n        if (resSave === service.STATUSES.update.false) {\n            return {\n                error: true,\n                message: 'SCORM service failed to save',\n                data: service.getError(),\n            };\n        }\n        return {\n            error: false,\n        };\n    },\n    stop: () => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const saveRes = service.save();\n        if (saveRes.error) {\n            return saveRes;\n        }\n        const resFinish = res.API.LMSFinish();\n        if (resFinish === service.STATUSES.update.false) {\n            return {\n                error: true,\n                message: 'SCORM service failed to save',\n                data: service.getError(),\n            };\n        }\n        service.finished = true;\n        service.save();\n        console.log('terminating');\n        res.API.Commit();\n        return {\n            error: false,\n        };\n    },\n    setValue: (elem, val) => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const setRes = res.API.LMSSetValue(elem, val);\n        if (setRes === service.STATUSES.update.false) {\n            return {\n                error: true,\n                message: `SCORM service failed to set ${elem} to ${val}`,\n                data: service.getError(true),\n            };\n        }\n        return {\n            error: false,\n        };\n    },\n    getValue: (elem) => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const getRes = res.API.LMSGetValue(elem);\n        console.log('GET RES');\n        console.log(getRes);\n        if (getRes === service.STATUSES.update.false) {\n            return {\n                error: true,\n                message: `SCORM service failed to get ${elem}`,\n                data: service.getError(true),\n            };\n        }\n        return {\n            error: false,\n        };\n    },\n    getProgress: () => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        const getRes = res.API.LMSGetValue('cmi.progress_measure');\n        const numberRes = parseFloat(getRes);\n        if (numberRes > 0) {\n            return numberRes;\n        }\n        else {\n            return 0;\n        }\n    },\n    updateStatus: (status) => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        if (!hasProp(service.STATUSES.lesson, status)) {\n            const validStatuses = Object.keys(service.STATUSES.lesson).join(', ');\n            const msg = `Invalid lesson status: ${status}. Must be one of: ${validStatuses}`;\n            console.error(msg);\n            return {\n                error: true,\n                message: msg,\n            };\n        }\n        const lessonStatus = service.STATUSES.lesson[status];\n        const setRes = service.setValue('cmi.core.lesson_status', lessonStatus);\n        if (setRes.error) {\n            return setRes;\n        }\n        return {\n            error: false,\n        };\n    },\n    exit: () => {\n        const res = service.isAvailable();\n        if (res.error) {\n            return res;\n        }\n        service._time.end = new Date();\n        if (!service._time.start) {\n            return {\n                error: true,\n                message: 'Service was never started',\n            };\n        }\n        const totalTime = service._time.end.getTime() - service._time.start.getTime();\n        const endRes = service.setValue('cmi.core.session_time', service._time.convert(totalTime));\n        if (endRes.error) {\n            return endRes;\n        }\n        const exitRes = service.setValue('cmi.core.exit', service.STATUSES.exit.save);\n        if (exitRes.error) {\n            return exitRes;\n        }\n        return service.stop();\n    },\n    updateProgress: (percentageCompleted) => {\n        console.log('new percentage');\n        console.log(percentageCompleted);\n        console.log('old percentage');\n        console.log(service.getProgress());\n        const oldRes = service.getProgress();\n        if (percentageCompleted > oldRes) {\n            console.log('higher?');\n            // service.courseProgress = percentageCompleted;\n            service.setValue('cmi.progress_measure', percentageCompleted);\n        }\n        console.log(percentageCompleted);\n        service.save();\n    },\n    finish: () => {\n        console.log('DONE');\n        // SCORM 2004\n        service.courseProgress = 1;\n        service.setValue('cmi.progress_measure', service.courseProgress);\n        service.setValue('cmi.score.raw', 80.0);\n        service.setValue('cmi.success_status', 'passed');\n        // SCORM 1.2 (status is handled separately, but scores will conflict, so only update 1)\n        // service.updateStatus('success');\n        // service.setValue('cmi.core.score.raw', 57.0);\n        // service.updateStatus('failed');\n        service.save();\n        console.log('SERVICE:');\n        console.log(service);\n        service.exit();\n    },\n};\n/* harmony default export */ const runtime = ({\n    service,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.Scrowl = window.Scrowl || {};\nwindow.Scrowl.runtime = service;\n\n\n//# sourceURL=webpack://@scrowl/runtime/./web/index.ts_+_2_modules?")}},__webpack_require__={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};return __webpack_modules__[166](0,__webpack_exports__,__webpack_require__),__webpack_exports__})()));