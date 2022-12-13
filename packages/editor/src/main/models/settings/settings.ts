import settingsHandler from 'electron-settings';
import { SettingsApi } from './settings.types';
import { rq, log } from '../../services';
import { obj } from '../../utils';

export const get = (ev: rq.RequestEvent, key?: string, defaultValue?: any) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!key) {
      settingsHandler
        .get()
        .then((settings) => {
          resolve({
            error: false,
            data: {
              settings
            }
          });
        })
        .catch((e) => {
          resolve({
            error: true,
            message: 'Failed to get settings',
            data: {
              trace: e,
            },
          });
        });
    } else {
      settingsHandler
        .get(key)
        .then((setting) => {
          if (setting === null || setting === undefined) {
            setting = defaultValue;
          }

          resolve({
            error: false,
            data: {
              setting,
              key,
              defaultValue,
            },
          });
        })
        .catch((e) => {
          resolve({
            error: true,
            message: 'Failed to get settings',
            data: {
              trace: e,
              key,
              defaultValue,
            },
          });
        });
    }
  });
};

export const set = (ev: rq.RequestEvent, key, value) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (key === null || key === undefined) {
      resolve({
        error: true,
        message: 'Unable to set setting: key is required',
      });
      return;
    }

    settingsHandler
      .set(key, value)
      .then(() => {
        resolve({
          error: false,
          data: {
            key,
            value,
          },
        })
      })
      .catch((e) => {
        resolve({
          error: true,
          message: 'Failed to set setting',
          data: {
            trace: e,
            key,
            value,
          }
        })
      });
  });
};

export const setAll = (ev: rq.RequestEvent, settings: obj.JSON_DATA) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const setPromises: Array<Promise<rq.ApiResult>> = [];
    const setLookups: Array<obj.JSON_DATA> = [];

    for (const [key, value] of Object.entries(settings)) {
      setPromises.push(set(ev, key, value));
      setLookups.push({ setting: key, value: value });
    }

    Promise.allSettled(setPromises).then((setPromiseRes) => {
      let isError = false;
      let errorRes;

      setPromiseRes.forEach((setRes, idx) => {
        if (setRes.status === 'rejected') {
          log.error(`failed to set ${setLookups[idx]}`);
          isError = true;
          return;
        }

        if (setRes.value.error) {
          isError = true;
          errorRes = setRes.value;
          log.error(`failed to set ${setLookups[idx]}`);
          return;
        }
      });

      if (isError) {
        resolve(errorRes);
        return;
      }

      resolve({
        error: false,
        data: {
          settings,
        },
      });
    });
  });
};

export const has = (ev: rq.RequestEvent, key) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (key === null || key === undefined) {
      resolve({
        error: true,
        message: 'Unable to check setting: key is required',
      });
      return;
    }

    settingsHandler
      .has(key)
      .then((result) => {
        resolve({
          error: false,
          data: {
            has: result,
            key,
          },
        })
      })
      .catch((e) => {
        resolve({
          error: true,
          message: 'Failed to check setting',
          data: {
            trace: e,
            has: false,
            key,
          }
        })
      });
  });
};

export const remove = (ev: rq.RequestEvent, key) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (key === null || key === undefined) {
      resolve({
        error: true,
        message: 'Unable to remove setting: key is required',
      });
      return;
    }

    settingsHandler
      .unset(key)
      .then(() => {
        resolve({
          error: false,
          data: {
            removed: true,
            key,
          },
        })
      })
      .catch((e) => {
        resolve({
          error: true,
          message: 'Failed to remove setting',
          data: {
            trace: e,
            removed: false,
            key,
          }
        })
      });
  });
};

export const save = (ev: rq.RequestEvent, data) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const keys = Object.keys(data);

    keys.forEach((key) => {
      settingsHandler.setSync(key, data[key])
    });

    resolve({
      error: false,
      data,
    })
  });
};

export const API: SettingsApi = {
  get: {
    name: '/settings/get',
    type: 'invoke',
    fn: get,
  },
  set: {
    name: '/settings/set',
    type: 'invoke',
    fn: set,
  },
  has: {
    name: '/settings/has',
    type: 'invoke',
    fn: has,
  },
  remove: {
    name: '/settings/remove',
    type: 'invoke',
    fn: remove,
  },
  save: {
    name: '/settings/save',
    type: 'invoke',
    fn: save,
  }
};

export const init = () => {
  rq.registerEndpointAll(API);
};

export default {
  get,
  set,
  setAll,
  has,
  remove,
  save,
  init,
};

