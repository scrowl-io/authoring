import { rq } from '../services';

export interface Model {
  EVENTS?: rq.RegisterEndpoints;
  init?: () => void;
  [key: string]: any;
};
