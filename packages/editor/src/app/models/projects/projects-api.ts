import { ProjectsEndpoints } from './projects.types';
import { rq } from '../../services';

const ENDPOINTS:ProjectsEndpoints = {
  create: '/projects/create',
  upload: '/projects/upload',
  save: '/projects/save',
  publish: '/projects/publish',
  list: '/projects/list',
  open: '/projects/open',
};

export const create = (data?: any): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, data);
};

export const upload = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.upload, data);
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
  upload,
  save,
  publish,
  list,
  open,
};