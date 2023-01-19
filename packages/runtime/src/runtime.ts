/*
  SCORM API REF
  https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*/
import { RUNTIME_SERVICE_WRAPPER } from './runtime.types';
import { service as service2004 } from '../src/versions/runtimeScorm2004';
import { service as service12 } from '../src/versions/runtimeScorm12';

export const service: RUNTIME_SERVICE_WRAPPER = {
  API: null,
  version: '1.2',
  _scanApi: (win, v) => {
    let retries = 0;
    // Check to see if the window (win) contains the API
    // if the window (win) does not contain the API and
    // the window (win) has a parent window and the parent window
    // is not the same as the window (win)

    while (win[v] == null && win.parent != null && win.parent != win) {
      // increment the number of findAPITries
      retries++;

      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (retries > 7) {
        alert('Error finding API -- too deeply nested.');
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
  start: (apiPreference) => {
    let API;

    switch (apiPreference) {
      case service2004.version:
        API = service._scanApi(window, 'API_1484_11');
        service.version = apiPreference;
        Object.assign(service, service2004);
        break;
      case service12.version:
      default:
        API = service._scanApi(window, 'API');
        service.version = apiPreference;
        Object.assign(service, service12);
        break;
    }

    if (!API) {
      console.error('Unable to start scorm runtime service');
      return [false];
    }

    service.API = API;

    // @ts-ignore
    service.start(API);

    return [true];
  },
};

export default {
  service,
}
