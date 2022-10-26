export type CMIELement = string;
export type CMIErrorCode = string;
export type SCORM_STATUS_UPDATE = 'true' | 'false';
export type SCORM_STATUS_LESSON = 'success' | 'failed' | 'done' | 'active' | 'viewed' | 'unseen';
export type SCORM_STATUS_EXIT = 'timeout' | 'save' | 'logout'

export type SCORM_API = {
  Commit: (msg?: string) => SCORM_STATUS_UPDATE;
  GetDiagnostic: (errorCode: CMIErrorCode) => string;
  GetErrorString: (errorCode: CMIErrorCode) => string;
  GetLastError: () => CMIErrorCode;
  GetValue: (element: CMIELement) => string;
  Initialize: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSCommit: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSFinish: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSGetDiagnostic: (errorCode: CMIErrorCode) => string;
  LMSGetErrorString: (errorCode: CMIErrorCode) => string;
  LMSGetLastError: () => CMIErrorCode;
  LMSGetValue: (element: CMIELement) => string;
  LMSInitialize: (msg?: string) => SCORM_STATUS_UPDATE;
  LMSSetValue: (element: CMIELement, value: string) => string;
  SetValue: (element: CMIELement, value: string) => string;
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
}

export interface RUNTIME_SERVICE_API_RESULT_READY {
  error: false;
  API: SCORM_API;
}

export interface RUNTIME_SERVICE_API_RESULT_ERROR {
  error: true;
  message: string;
}

export type RUNTIME_SERVICE_API_RESULT = RUNTIME_SERVICE_API_RESULT_READY | RUNTIME_SERVICE_API_RESULT_ERROR;

export type RUNTIME_SERVICE_RESULT = {
  error: boolean;
  message?: string;
  data?: string | GENERIC_DATA;
}

export type RUNTIME_SERVICE = {
  API?: SCORM_API;
  init: boolean;
  finished: boolean;
  _time: {
    start: undefined | Date;
    end: undefined | Date;
    convert: (total: number) => string;
  },
  STATUSES: {
    update: {
      true: 'true';
      false: 'false';
    },
    lesson: {
      success: 'passed';
      failed: 'failed';
      done: 'completed';
      active: 'incomplete';
      viewed: 'browsed';
      unseen: 'not attempted';
    },
    exit: {
      timeout: 'time-out';
      save: 'suspend';
      logout: 'logout';
    }
  },
  isAvailable: () => RUNTIME_SERVICE_API_RESULT;
  getError: (printError?: boolean) => RUNTIME_SERVICE_RESULT;
  _findAPI: (source: Window) => RUNTIME_SERVICE_API_RESULT;
  start: () => RUNTIME_SERVICE_RESULT;
  save: () => RUNTIME_SERVICE_RESULT;
  stop: () => RUNTIME_SERVICE_RESULT;
  setValue: (elem: CMIELement, val: string) => RUNTIME_SERVICE_RESULT;
  getValue: (elem: CMIELement) => RUNTIME_SERVICE_RESULT;
  updateStatus: (status: SCORM_STATUS_LESSON) => RUNTIME_SERVICE_RESULT;
  exit: () => RUNTIME_SERVICE_RESULT;
};
