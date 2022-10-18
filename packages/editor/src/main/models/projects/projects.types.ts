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

export type ProjectMeta = {
  id: string;
  name: string;
  blueprint: string;
  version: number;
  createdBy: string;
  folder: string;
  tags: Array<string>;
  scrowlVer: string;
  dateCreated: string;
  lastSaved: string;
};

export type ProjectScorm = {
  name: string;
  description: string;
  authors: string;
  organization: string;
  reportStatus: string;
  lmsIdentifier: string;
  outputFormat: "SCORM 2004";
  optomizeMedia: "Recommended";
};

export type ProjectAsset = {
  name: string;
  location: string;
};

export type ProjectModule = {
  name: string;
};

export type ProjectLesson = {
  name: string;
  moduleIdx: number;
};

export type ProjectSlide = {
  name: string;
  moduleIdx: number;
  lessonIdx: number;
};

export type ProjectGlossaryItem = {
  term: string;
  description: string;
};

export type ProjectResource = {
  name: string;
  location: string;
};

export type ProjectData = {
  meta: Partial<ProjectMeta>,
  scorm: Partial<ProjectScorm>;
  assets?: Array<ProjectAsset>;
  modules?: Array<ProjectModule>;
  lessons?: Array<ProjectLesson>;
  slides?: Array<ProjectSlide>;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResource>;
};
