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

export const create = (data?) => {
  return rq.invoke(ENDPOINTS.create, data);
};

export const importAsset = (data?) => {
  return rq.invoke(ENDPOINTS.importAsset, data);
};

export const save = (data?) => {
  return rq.invoke(ENDPOINTS.save, data);
};

export const publish = (data?) => {
  return rq.invoke(ENDPOINTS.publish, data);
};

export const list = (data?) => {
  return rq.invoke(ENDPOINTS.list, data);
};

export const open = (data?) => {
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