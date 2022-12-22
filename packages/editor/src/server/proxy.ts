import axios from 'axios';
import { rq } from './services';
import { API as EndpointsApi } from './api/endpoints';

type Listener = (...args: unknown[]) => void;
type UpdateResolver = (value: rq.ApiResult | PromiseLike<rq.ApiResult>) => void;
type RequestQueue = Array<{
  endpoint: string;
  method: 'invoke' | 'send' | 'on' | 'removeListener' | 'removeListenerAll';
  params: unknown[];
  resolve: UpdateResolver;
}>;
type ScrowlProxy = {
  timeout: number;
  inProgress: boolean;
  ENDPOINTS: Array<rq.RegisterEndpoint>;
  invoke: (endpoint: string, params: unknown[]) => Promise<rq.ApiResult>;
  on: (endpoint: string, listener: Listener) => void;
  send: (endpoint: string, listener: Listener) => void;
  removeListener: (endpoint: string, listener: Listener) => void;
  removeListenerAll: (endpoint: string) => void;
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

const GET = (endpoint, params?: any) => {
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
  invoke: (endpoint: string, params: unknown[]) => {
    return new Promise<rq.ApiResult>((resolve) => {
      const method = 'invoke';

      if (scrowlProxy.inProgress) {
        console.log('queueing request', endpoint, params);
        requestQueue.push({
          endpoint,
          method,
          params,
          resolve,
        });
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

      GET(endpoint, params).
        then(resolve)
        .catch((e) => {
          console.error(e);
          resolve({
            error: true,
            message: `Failed to invoke: ${endpoint}`,
            data: {
              trace: e,
            },
          });
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

scrowlProxy.inProgress = true;
GET(EndpointsApi.get.name)
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
          scrowlProxy.invoke(req.endpoint, req.params).then(req.resolve);
          break;
      }
    });
  })
  .catch((e) => {
    console.error('Getting endpoints failed', e);
  });

window.scrowlProxy = scrowlProxy;