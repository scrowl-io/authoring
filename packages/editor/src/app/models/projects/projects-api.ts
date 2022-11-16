import { ProjectsEndpoints, PreviewAssetReq } from './projects.types';
import { rq } from '../../services';

const ENDPOINTS:ProjectsEndpoints = {
  create: '/projects/create',
  upload: '/projects/upload',
  uploadProgress: '/projects/upload/progress',
  save: '/projects/save',
  publish: '/projects/publish',
  list: '/projects/list',
  open: '/projects/open',
  previewAsset: '/projects/preview-asset',
};

export const create = (data?: any): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, data);
};

export const upload = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.upload, data);
};

export const onUploadProgress = (listener: rq.Listener) => {
  rq.on(ENDPOINTS.uploadProgress, listener);
};

export const offUploadProgress = () => {
  rq.offAll(ENDPOINTS.uploadProgress);
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

export const previewAsset = (data: PreviewAssetReq) => {
  return rq.invoke(ENDPOINTS.previewAsset, data);
};

export default {
  create,
  upload,
  onUploadProgress,
  offUploadProgress,
  save,
  publish,
  list,
  open,
  previewAsset,
};