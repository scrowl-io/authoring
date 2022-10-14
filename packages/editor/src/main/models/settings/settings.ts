import settingsHandler from 'electron-settings';
import { SettingsApi } from './settings.types';
import { rq } from '../../services';

export const get = (ev: rq.RequestEvent, key, defaultValue) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!key) {
      settingsHandler
        .get()
        .then((settings) => {
          console.log('settings', settings);
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
  has,
  remove,
  save,
  init,
};

