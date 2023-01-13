import { dialog, MessageBoxOptions, SaveDialogOptions, OpenDialogOptions, FileFilter, BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { FSApi, AssetType, ASSET_TYPES } from './';
import { rq } from '../';

export const getAllowedAssets = (types: Array<AssetType>) => {
  let filters: FileFilter = {
    name: 'mixed',
    extensions: []
  };

  types.forEach((type: AssetType) => {
    if (ASSET_TYPES[type] && ASSET_TYPES[type]) {
      filters.extensions = filters.extensions.concat(ASSET_TYPES[type].extensions);
    }
  });

  return [filters];
};

export const getAllAssets = () => {
  let filters: FileFilter = {
    name: 'all',
    extensions: []
  };

  for (const [type, filter] of Object.entries(ASSET_TYPES)) {
    filters.extensions = filters.extensions.concat(filter.extensions);;
  }

  return [filters];
};

export const message = (ev: rq.RequestEvent, options: MessageBoxOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!options) {
      resolve({
        error: true,
        message: 'Unable to open dialog: options missing',
      });
      return;
    }

    const type = options.type || 'warning';
    const buttons = options.buttons || ['Ok'];
    const defaultId = options.defaultId || 0;
    let openWin: BrowserWindow | null = null;
    const openEvent = ev as IpcMainInvokeEvent;

    if (openEvent.sender) {
      openWin = BrowserWindow.fromWebContents(openEvent.sender);
    }

    if (openWin) {
      dialog
        .showMessageBox(openWin, {
          ...options,
          type,
          buttons,
          defaultId,
        })
        .then((res) => {
          resolve({
            error: false,
            data: res,
          });
        })
        .catch((e) => {
          resolve({
            error: true,
            message: 'Message Dialog Failed',
            data: {
              trace: e,
            },
          });
        });
    }
  });
};

export const save = (ev: rq.RequestEvent, options: SaveDialogOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    dialog
      .showSaveDialog(options)
      .then(({ canceled, filePath }) => {
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
      });
  });
};

export const open = (ev: rq.RequestEvent, options: OpenDialogOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    let dialogResult;
    let openWin: BrowserWindow | null = null;
    const openEvent = ev as IpcMainInvokeEvent;
    const openData = {
      canceled: false,
      filePath: '',
    };

    if (openEvent.sender) {
      openWin = BrowserWindow.fromWebContents(openEvent.sender);
    }

    if (openWin) {
      dialogResult = dialog.showOpenDialogSync(openWin, options);
    } else {
      dialogResult = dialog.showOpenDialogSync(options);
    }

    if (dialogResult === undefined) {
      openData.canceled = true;
    } else {
      openData.filePath = dialogResult[0];
    }

    resolve({
      error: false,
      data: openData,
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
  getAllowedAssets,
  getAllAssets,
  message,
  save,
  open,
  register,
};