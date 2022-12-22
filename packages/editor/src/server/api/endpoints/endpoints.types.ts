import { rq } from '../../services';

export interface EndpointsApiGet extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/endpoints';
};

export type EndpointsApi = {
  get: EndpointsApiGet;
};