import { contextBridge, ipcRenderer } from "electron";
import { rq } from './services/'

export type Listener = (...args: unknown[]) => void;

const checkEndpoint = (endpoint: string, type?: rq.RegisterEventType) => {
  const configs: Array<rq.RegisterEvent> = [];
  const endpoints = configs
    .filter((config) => {
      return !type || type === config.type;
    })
    .map((config) => {
      return config.name;
    });

  return endpoints.indexOf(endpoint) !== -1;
};

contextBridge.exposeInMainWorld('scrowlApi', {
  actions: {
    invoke (endpoint: string, ...args: unknown[]) {
      // sends an 'invoke' event to the backend
      const isValid = checkEndpoint(endpoint, 'invoke');

      if (isValid) {
        return ipcRenderer.invoke(endpoint, ...args);
      }
    },
    on (endpoint: string, listener: Listener) {
      // listens to a 'send' event from the backend
      const isValid = checkEndpoint(endpoint, 'send');

      if (isValid) {
        return ipcRenderer.on(endpoint, listener);
      }
    },
    send (endpoint: string, ...args: unknown[]) {
      // sends an 'on' event to the backend
      const isValid = checkEndpoint(endpoint, 'on');

      if (isValid) {
        return ipcRenderer.send(endpoint, ...args);
      }
    },
    removeListener (endpoint: string, listener: Listener) {
      // removes the listener from the endpoint
      const isValid = checkEndpoint(endpoint);

      if (isValid) {
        return ipcRenderer.removeListener(endpoint, listener);
      }
    },
    removeListenerAll (endpoint: string) {
      // removes all callbacks from an endpoint
      const isValid = checkEndpoint(endpoint);

      if (isValid) {
        return ipcRenderer.removeAllListeners(endpoint);
      }
    },
  }
});
