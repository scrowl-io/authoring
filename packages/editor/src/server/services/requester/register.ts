import express from 'express';
import {
  RegisterEndpoint,
  RegisterEndpoints,
} from './requester.types';

export const ENDPOINTS: Array<RegisterEndpoint> = [];

export const add = (router: express.Router, endpoint: RegisterEndpoint) => {
  switch (endpoint.type) {
    case 'invoke':
      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.warn(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);

      switch (endpoint.method) {
        case 'POST':
          router.post(endpoint.name, endpoint.fn);
          break;
        case 'GET':
        default:
          router.get(endpoint.name, endpoint.fn);
          break;
      }
      break;
    case 'on':

      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.warn(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);
      // this will be a socket event
      break;
    case 'send':
      ENDPOINTS.push(endpoint);
      // this will be a socket event
      break;
  }
};

export const addAll = (router: express.Router, endpoints: RegisterEndpoints) => {
  for (const key in endpoints) {
    add(router, endpoints[key]);
  }
};

export default {
  ENDPOINTS,
  add,
  addAll,
};