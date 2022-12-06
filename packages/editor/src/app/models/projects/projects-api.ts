import {
  ProjectsEndpoints,
  PreviewAssetReq,
  WindowEndpoints,
  ProjectMeta,
  PreviewProjectReq,
  UnsavedReq
} from './projects.types';
import { rq } from '../../services';

const ENDPOINTS: ProjectsEndpoints = {
  create: '/projects/create',
  upload: '/projects/upload',
  uploadProgress: '/projects/upload/progress',
  save: '/projects/save',
  publish: '/projects/publish',
  list: '/projects/list',
  open: '/projects/open',
  previewAsset: '/projects/preview-asset',
  preview: '/projects/preview',
};

const WINDOW_ENDPOINTS: WindowEndpoints = {
  unsaved: '/window/unsaved/send', // sent from main
  onUnsaved: '/window/unsaved/on', // send to main
};

export const create = (blueprint?: string): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, blueprint);
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

export const list = (limit?: number): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.list, limit);
};

export const open = (data: ProjectMeta): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.open, data);
};

export const previewAsset = (data: PreviewAssetReq) => {
  return rq.invoke(ENDPOINTS.previewAsset, data);
};

export const preview = (payload: PreviewProjectReq) => {
  return rq.invoke(ENDPOINTS.preview, payload);
};

export const onUnsavedCheck = (listener: rq.Listener) => {
  rq.on(WINDOW_ENDPOINTS.unsaved, listener);
};

export const offUnsavedCheck = () => {
  rq.offAll(WINDOW_ENDPOINTS.unsaved);
};

export const sendUnsavedStatus = (payload: UnsavedReq) => {
  rq.send(WINDOW_ENDPOINTS.onUnsaved, payload);
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
  preview,
  onUnsavedCheck,
  offUnsavedCheck,
  sendUnsavedStatus
};