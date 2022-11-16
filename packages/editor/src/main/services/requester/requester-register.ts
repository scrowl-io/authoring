import { ipcMain } from 'electron';
import {
  RegisterEndpoint,
  RegisterEndpoints,
} from './requester.types';
import { useTemplateMiddleware } from './';

const ENDPOINTS: Array<RegisterEndpoint> = [];

export const registerEndpoint = (endpoint: RegisterEndpoint) => {
  
  switch (endpoint.type) {
    case 'invoke':
      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.warn(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);
      ipcMain.handle(endpoint.name, endpoint.fn);
      break;
    case 'on':
      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.error(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);
      ipcMain.on(endpoint.name, endpoint.fn);
      break;
    case 'send':
      ENDPOINTS.push(endpoint);
      break;
  }
};

export const registerEndpointAll = (endpoints: RegisterEndpoints)  => {
  for (const key in endpoints) {
    registerEndpoint(endpoints[key]);
  }
};

export const removeListener = (endpoint) => {
  ipcMain.removeAllListeners(endpoint);
};

export const init = () => {
  registerEndpoint({
    name: '/endpoints',
    type: 'invoke',
    fn: () => {
      return {
        error: false,
        data: {
          endpoints: JSON.parse(JSON.stringify(ENDPOINTS)),
        },
      };
    },
  });
  useTemplateMiddleware();
};

export default {
  registerEndpoint,
  registerEndpointAll,
  removeListener,
  init,
};
