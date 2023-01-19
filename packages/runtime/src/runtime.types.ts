export type CMIElement = string;
export type CMIElementValue = string | number | undefined;
export type CMIErrorCode = string;
export type SCORM_STATUS_UPDATE = 'true' | 'false';
export type SCORM_STATUS_LESSON = 'success' | 'failed' | 'done' | 'active' | 'viewed' | 'unseen';
export type SCORM_STATUS_EXIT = 'timeout' | 'save' | 'logout'

export type SCORM_API = {
  Commit: (msg?: string) => SCORM_STATUS_UPDATE;
  GetDiagnostic: (errorCode: CMIErrorCode) => string;
  GetErrorString: (errorCode: CMIErrorCode) => string;
  GetLastError: () => CMIErrorCode;
  GetValue: (element: CMIElement) => string;
  Initialize: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSCommit: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSFinish: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSGetDiagnostic: (errorCode: CMIErrorCode) => string;
  LMSGetErrorString: (errorCode: CMIErrorCode) => string;
  LMSGetLastError: () => CMIErrorCode;
  LMSGetValue: (element: CMIElement) => string;
  LMSInitialize: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSSetValue: (element: CMIElement, value: string | number) => string;
  SetValue: (element: CMIElement, value: string | number) => string;
  Terminate: (msg?: string) => SCORM_STATUS_UPDATE;
  apolloClient: {
    [key: string]: any;
  };
  checkCompletion_1_2: () => void;
  checkCompletion_2004: () => void;
  deflateString: () => void;
  failed_1_2: () => void;
  failed_2004: () => void;
  inflateString: () => void;
  moduleId: string;
  mutate: () => void;
  onFailure: () => void;
  onSuccess: () => void;
  passed_1_2: () => void;
  passed_2004: () => void;
  scormData: {
    [key: string]: string | boolean | number;
  };
  trainSessionId: string;
};

export type GENERIC_DATA = {
  [key: string]: any;
};

export interface RUNTIME_SERVICE_API_RESULT_READY {
  error: false;
  API: SCORM_API;
}

export interface RUNTIME_SERVICE_API_RESULT_ERROR {
  error: true;
  message: string;
}

export type RUNTIME_SERVICE_API_RESULT =
  | RUNTIME_SERVICE_API_RESULT_READY
  | RUNTIME_SERVICE_API_RESULT_ERROR;

export type RUNTIME_SERVICE_RESULT = {
  error: boolean;
  message?: string;
  data?: string | GENERIC_DATA;
};

export type RUNTIME_SERVICE = {
  version: '1.2' | '2004v4' | '2004v3';
  API?: SCORM_API | null;
  init: boolean;
  finished: boolean;
  _time: {
    startTime: undefined | Date;
    end: undefined | Date;
    getSessionTime: () => string;
    convert: (total: number) => string;
  };
  commit: () => [error: boolean];
  exit: () => [error: boolean];
  isInitialized: () =>
    | [error: true, API: SCORM_API]
    | [error: false, API: false];
  start: (test?: string) => [error: boolean];
  updateLocation: (location: any, slideId: string) => [error: boolean];
  updateProgress: (progressPercentage: number) => [error: boolean];
  isAvailable?: () => RUNTIME_SERVICE_API_RESULT;
  getError: (printError?: boolean) => RUNTIME_SERVICE_RESULT;
  getProgress: () => [error: boolean, progress: any];
  getLocation: () => [error: boolean, location: any];
  save?: () => RUNTIME_SERVICE_RESULT;
  stop?: () => RUNTIME_SERVICE_RESULT;
  setValue: (elem: CMIElement, val: CMIElementValue) => [error: boolean];
  getValue: (elem: CMIElement) => [error: boolean, value: string];
  updateStatus?: (status: SCORM_STATUS_LESSON) => RUNTIME_SERVICE_RESULT;
  finish: () => [error: boolean];
};
