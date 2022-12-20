import { contextBridge, ipcRenderer } from "electron";
import { rq } from './services/'

export type Listener = (...args: unknown[]) => void;

let ENDPOINTS: Array<rq.RegisterEndpoint> = [];

const updateEndpoints = async () => {
  const result = await ipcRenderer.invoke('/endpoints'); 

  ENDPOINTS = result.data.endpoints;
  return ENDPOINTS;
};

const checkEndpoint = async (endpoint: string, type?: rq.RegisterEndpointType) => {
  const configs = await updateEndpoints();
  const endpoints = configs
    .filter((config) => {
      return !type || type === config.type;
    })
    .map((config) => {
      return config.name;
    });

  return endpoints.indexOf(endpoint) !== -1;
};

contextBridge.exposeInMainWorld('scrowlProxy', {
  async invoke (endpoint: string, ...args: unknown[]) {
    // sends an 'invoke' event to the backend
    const isValid = await checkEndpoint(endpoint, 'invoke');

    if (isValid) {
      return ipcRenderer.invoke(endpoint, ...args);
    }
  },
  async on (endpoint: string, listener: Listener) {
    // listens to a 'send' event from the backend
    const isValid = await checkEndpoint(endpoint, 'send');

    if (isValid) {
      ipcRenderer.on(endpoint, listener);
    }
  },
  async send (endpoint: string, ...args: unknown[]) {
    // sends an 'on' event to the backend
    const isValid = await checkEndpoint(endpoint, 'on');

    if (isValid) {
      ipcRenderer.send(endpoint, ...args);
    }
  },
  async removeListener (endpoint: string, listener: Listener) {
    // removes the listener from the endpoint
    const isValid = await checkEndpoint(endpoint);

    if (isValid) {
      ipcRenderer.removeListener(endpoint, listener);
    }
  },
  async removeListenerAll (endpoint: string) {
    // removes all callbacks from an endpoint
    const isValid = await checkEndpoint(endpoint);

    if (isValid) {
      ipcRenderer.removeAllListeners(endpoint);
    }
  },
});
