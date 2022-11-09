import { dialog, MessageBoxOptions } from 'electron';
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

export const API: FSApi = {
  message: {
    name: '/system/message',
    type: 'invoke',
    fn: message,
  }
};

export const register = () => {
  rq.registerEndpointAll(API);
}

export default {
  message,
  register,
};