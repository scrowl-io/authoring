import { rq } from '../../services';

export interface SettingsApiGet
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/settings/get';
}

export interface SettingsApiSet
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/settings/set';
}

export interface SettingsApiHas
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/settings/has';
}

export interface SettingsApiRemove
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/settings/remove';
}

export interface SettingsApiSave
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/settings/save';
}

export type SettingsApi = Partial<{
  get: SettingsApiGet;
  set: SettingsApiSet;
  has: SettingsApiHas;
  remove: SettingsApiRemove;
  save: SettingsApiSave;
}>;

export type SettingsEndpoints = {
  get: SettingsApiGet['name'];
  set: SettingsApiSet['name'];
  has: SettingsApiHas['name'];
  remove: SettingsApiRemove['name'];
  save: SettingsApiSave['name'];
};

export type SettingsReqGet = {
  key?: string;
  defaultValue?: any;
};

export type SettingsReqSet = {
  key: string;
  value: any;
};

export type SettingsReqHas = {
  key: string;
};

export type SettingsReqRemove = {
  key: string;
};
