import axios from 'axios';
import { rq } from './services';
import { EndpointsApiGet } from './api/endpoints/endpoints.types';
import { MenuEndpoints } from '../app/services/menu/menu.types';

type Listener = (...args: unknown[]) => void;
type UpdateResolver = (value: rq.ApiResult | PromiseLike<rq.ApiResult>) => void;
type RequestQueue = Array<{
  endpoint: string;
  method: 'invoke' | 'send' | 'on' | 'removeListener' | 'removeListenerAll';
  params?: rq.JSON_DATA;
  type: 'GET' | 'POST';
  resolve: UpdateResolver;
}>;
type ScrowlProxy = {
  timeout: number;
  inProgress: boolean;
  ENDPOINTS: Array<rq.RegisterEndpoint>;
  invoke: (endpoint: string, params?: rq.JSON_DATA, type?: 'GET' | 'POST') => Promise<rq.ApiResult>;
  on: (endpoint: string, listener: Listener) => void;
  send: (endpoint: string, listener: Listener) => void;
  removeListener: (endpoint: string, listener: Listener) => void;
  removeListenerAll: (endpoint: string) => void;
};
interface RequestInterceptorsError extends Omit<rq.ApiResultError, 'data'> {
  message: string;
  data: {
    action: string;
  };
};
type RequestInterceptors = {
  [key in MenuEndpoints['contextMenu']]: RequestInterceptorsError;
};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const requestInterceptors:RequestInterceptors = {
  '/context-menu': {
    error: true,
    message: 'Unable to call endpoint: desktop only api',
    data: {
      action: 'use-component',
    },
  },
};

const GET = (endpoint, params?: rq.JSON_DATA) => {
  return new Promise<rq.ApiResult>(async (resolve, reject) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const { data } = await axios({
        url: `http://localhost:8000/api${endpoint}`,
        method: 'GET',
        params,
        timeout: (scrowlProxy.timeout * 10),
        cancelToken: source.token,
      });
      
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const POST = (endpoint, payload?: rq.JSON_DATA) => {
  return new Promise<rq.ApiResult>(async (resolve, reject) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const { data } = await axios({
        url: `http://localhost:8000/api${endpoint}`,
        method: 'POST',
        data: payload,
        timeout: (scrowlProxy.timeout * 10),
        cancelToken: source.token,
      });
      
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const requestQueue: RequestQueue = [];

const checkEndpoint = (endpoint: string, type?: rq.RegisterEndpointType) => {
  const endpoints = scrowlProxy.ENDPOINTS
    .filter((config) => {
      return !type || type === config.type;
    })
    .map((config) => {
      return config.name;
    });

  return endpoints.indexOf(endpoint) !== -1;
};

const scrowlProxy: ScrowlProxy = {
  timeout: 1000,
  inProgress: true,
  ENDPOINTS: [],
  invoke: (endpoint: string, params?: rq.JSON_DATA, type = 'GET') => {
    return new Promise<rq.ApiResult>((resolve) => {
      const method = 'invoke';

      if (scrowlProxy.inProgress) {
        console.log('queueing request', endpoint, params);
        requestQueue.push({
          endpoint,
          method,
          params,
          type,
          resolve,
        });
        return;
      }

      if (requestInterceptors.hasOwnProperty(endpoint)) {
        resolve(requestInterceptors[endpoint]);
        return;
      }

      const isValid = checkEndpoint(endpoint, method);
      
      if (!isValid) {
        const inValidMessage = `Unable to complete request: not a valid endpoint - ${endpoint}`;
        console.warn(inValidMessage);
        resolve({
          error: true,
          message: inValidMessage,
          data: {
            endpoint,
            params,
          },
        });
        return;
      }

      const handleRejection = (e) => {
        console.error(e);
          resolve({
            error: true,
            message: `Failed to invoke: ${endpoint}`,
            data: {
              trace: e,
            },
          });
      };

      switch (type) {
        case 'POST':
          POST(endpoint, params).then(resolve).catch(handleRejection);
          break;
        case 'GET':
        default:
          GET(endpoint, params).then(resolve).catch(handleRejection);
          break;
      }
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

scrowlProxy.inProgress = true;

const getEndpoints: EndpointsApiGet = {
  name: '/endpoints',
  type: 'invoke',
};

GET(getEndpoints.name)
  .then((res) => {
    scrowlProxy.inProgress = false;

    if (res.error) {
      console.error(res);
      return;
    }

    scrowlProxy.ENDPOINTS = res.data.endpoints;

    if (!requestQueue.length) {
      return;
    }

    requestQueue.forEach((req) => {
      console.log('draining queue', req.endpoint);

      switch (req.method) {
        case 'invoke':
          scrowlProxy.invoke(req.endpoint, req.params, req.type).then(req.resolve);
          break;
      }
    });
  })
  .catch((e) => {
    console.error('Getting endpoints failed', e);
  });

window.scrowlProxy = scrowlProxy;