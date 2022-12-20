import { ApiResult } from '../main/services/requester/requester.types';

type Listener = (...args: unknown[]) => void;

window.scrowlProxy = {
  invoke: (endpoint: string, ...args: unknown[]) => {
    return new Promise<ApiResult>((resolve) => {
      const message = `Unable to invoke ${endpoint}: method not ready`;

      console.warn(message);
      resolve({
        error: true,
        message: message,
        data: {},
      });
    });
  },
  on: (endpoint: string, listener: Listener) => {
    console.warn(`Unable to set on listener for ${endpoint}: method not ready`);
  },
  send: (endpoint: string, ...args: unknown[]) => {
    console.warn(`Unable to send ${endpoint}: method not ready`);
  },
  removeListener: (endpoint: string, listener: Listener) => {
    console.warn(`Unable to remove listener for ${endpoint}: method not ready`);
  },
  removeListenerAll: (endpoint: string) => {
    console.warn(`Unable to remove listeners: method not ready`);
  },
};