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
      router.get(endpoint.name, endpoint.fn);
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