import { rq } from '../../services';

export interface ProjectsApiCreate
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/create';
}

export interface ProjectsApiImportAsset
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/import';
}

export interface ProjectsApiSave
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/save';
}

export interface ProjectsApiPublish
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/pubish';
}

export interface ProjectsApiList
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/list';
}

export interface ProjectsApiOpen
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/open';
}

export type ProjectsApi = Partial<{
  create: ProjectsApiCreate;
  importAsset: ProjectsApiImportAsset;
  save: ProjectsApiSave;
  publish: ProjectsApiPublish;
  list: ProjectsApiList;
  open: ProjectsApiOpen;
}>;

export type ProjectsEndpoints = {
  create: ProjectsApiCreate['name'];
  importAsset: ProjectsApiImportAsset['name'];
  save: ProjectsApiSave['name'];
  publish: ProjectsApiPublish['name'];
  list: ProjectsApiList['name'];
  open: ProjectsApiOpen['name'];
};
