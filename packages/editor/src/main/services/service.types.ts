import { rq } from '../services';

export interface Service {
  API?: rq.RegisterEndpoints;
  init?: () => void;
  [key: string]: any;
};