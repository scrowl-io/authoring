import { dialog, MessageBoxOptions, SaveDialogOptions, OpenDialogOptions } from 'electron';
import { FSApi } from './fs.types';
import { rq } from '../';

export const message = (ev: rq.RequestEvent, options: MessageBoxOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!options) {
      resolve({
        error: true,
        message: 'Unable to open dialog: options missing'
      });
      return;
    }

    const type = options.type || 'warning';
    const buttons = options.buttons || ['Ok'];
    const defaultId = options.defaultId || 0;
    
    dialog.showMessageBox({
      ...options,
      type,
      buttons,
      defaultId,
    }).then((res) => {
      resolve({
        error: false,
        data: res,
      });
    }).catch((e) => {
      resolve({
        error: true,
        message: 'Message Dialog Failed',
        data: {
          trace: e,
        },
      });
    })
  });
};

export const save = (ev: rq.RequestEvent, options: SaveDialogOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    dialog.showSaveDialog(options).then(({ canceled, filePath }) => {
      resolve({
        error: false,
        data: {
          canceled,
          filePath,
        },
      });
    })
    .catch((e) => {
      resolve({
        error: true,
        message: 'Save dialog failed: unexpected',
        data: {
          trace: e,
          options,
        },
      });
    })
  });
};

export const open = (ev: rq.RequestEvent, options: OpenDialogOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    dialog
      .showOpenDialog(options)
      .then(({ canceled, filePaths }) => {
        resolve({
          error: false,
          data: {
            canceled,
            filePath: filePaths[0],
          },
        });
      })
      .catch((e) => {
        resolve({
          error: true,
          message: 'Unable to open dialog - unknown reason',
          data: {
            trace: e,
            options,
          },
        });
      });
  });
};

export const API: FSApi = {
  message: {
    name: '/system/message',
    type: 'invoke',
    fn: message,
  },
  save: {
    name: '/system/save',
    type: 'invoke',
    fn: save,
  },
  open: {
    name: '/system/open',
    type: 'invoke',
    fn: open,
  },
};

export const register = () => {
  rq.registerEndpointAll(API);
}

export default {
  message,
  save,
  open,
  register,
};