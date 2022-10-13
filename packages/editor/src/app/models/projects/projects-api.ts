import { ProjectsEndpoints } from './projects.types';
import { rq } from '../../services';

const ENDPOINTS:ProjectsEndpoints = {
  create: '/projects/create',
  importAsset: '/projects/import',
  save: '/projects/save',
  publish: '/projects/pubish',
  list: '/projects/list',
  open: '/projects/open',
};

export const create = (data?: any): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, data);
};

export const importAsset = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.importAsset, data);
};

export const save = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.save, data);
};

export const publish = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.publish, data);
};

export const list = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.list, data);
};

export const open = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.open, data);
};

export default {
  create,
  importAsset,
  save,
  publish,
  list,
  open,
};