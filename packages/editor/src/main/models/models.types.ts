import { rq } from '../services';

export interface Model {
  API?: rq.RegisterEndpoints;
  init?: () => void;
  [key: string]: any;
};
