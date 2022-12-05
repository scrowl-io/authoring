import { rq } from '../services';

export type PageModule = {
  Path: string;
  Page: () => JSX.Element;
  useProcessor?: () => void;
};

export type Pages = {
  [key: string]: PageModule;
};

export type ModelModule = {
  init?: () => Promise<rq.ApiResult>;
};

export type Models = {
  [key: string]: ModelModule;
};
