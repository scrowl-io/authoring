import { ProjectsApi } from './projects.types';
import { createProject } from './project.data';
import { rq } from '../../services';

export const create = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        project: createProject(),
      },
    });
  });
};

export const importAsset = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        imported: true,
      },
    });
  });
};

export const save = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        saved: true,
      },
    });
  });
};

export const publish = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {

  });
};

export const list = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        listed: true,
      },
    });
  });
};

export const open = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        opened: true,
      },
    });
  });
};

export const API: ProjectsApi = {
  create: {
    name: '/projects/create',
    type: 'invoke',
    fn: create,
  },
  importAsset: {
    name: '/projects/import',
    type: 'invoke',
    fn: create,
  },
  save: {
    name: '/projects/save',
    type: 'invoke',
    fn: create,
  },
  publish: {
    name: '/projects/pubish',
    type: 'invoke',
    fn: create,
  },
  list: {
    name: '/projects/list',
    type: 'invoke',
    fn: create,
  },
  open: {
    name: '/projects/open',
    type: 'invoke',
    fn: create,
  },
};

export const init = () => {
  rq.registerEndpointAll(API);
};

export default {
  create,
  importAsset,
  save,
  publish,
  list,
  open,
};
