import { SettingsEndpoints } from './settings.types';
import { rq } from '../../services';

const ENDPOINTS: SettingsEndpoints = {
  get: '/settings/get',
  set: '/settings/set',
  has: '/settings/has',
  remove: '/settings/remove',
  save: '/settings/save',
};

export const get = (key?: string, defaultValue?: any) => {
  return rq.invoke(ENDPOINTS.get, { key, defaultValue });
};

export const set = (key: string, value: any) => {
  return rq.invoke(ENDPOINTS.set, { key, value });
};

export const has = (key: string) => {
  return rq.invoke(ENDPOINTS.has, { key });
};

export const remove = (key: string) => {
  return rq.invoke(ENDPOINTS.remove, { key });
};

export const save = (data) => {
  return rq.invoke(ENDPOINTS.save, data);
};

export default {
  get,
  set,
  has,
  remove,
  save,
};
