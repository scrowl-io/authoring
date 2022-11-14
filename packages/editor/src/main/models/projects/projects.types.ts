import { rq, fs } from '../../services';
import { TemplateSchema } from '../templates';
import { AssetType } from '../../services/file-system';

export interface ProjectsApiCreate
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/create';
}

export interface ProjectsApiUpload
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/upload';
}

export interface ProjectsApiSave
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/save';
}

export interface ProjectsApiPublish
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/publish';
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
  upload: ProjectsApiUpload;
  save: ProjectsApiSave;
  publish: ProjectsApiPublish;
  list: ProjectsApiList;
  open: ProjectsApiOpen;
}>;

export type ProjectsEndpoints = {
  create: ProjectsApiCreate['name'];
  upload: ProjectsApiUpload['name'];
  save: ProjectsApiSave['name'];
  publish: ProjectsApiPublish['name'];
  list: ProjectsApiList['name'];
  open: ProjectsApiOpen['name'];
};

export type ProjectMeta = {
  id: string;
  name: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
  tags: Array<string>;
  blueprint?: string;
  createdBy?: string;
};

export type ProjectScorm = {
  name: string;
  outputFormat: '1.2' | '2004.3' | '2004.4';
  optimizeMedia: 'low' | 'recommended' | 'high' | 'original';
  version?: string;
  description?: string;
  authors?: string;
  organization?: string;
  reportStatus?: string;
  identifier?: string;
  masteryScore?: number;
  language?: 'en-US';
};

export type ProjectAsset = {
  filename: string;
  ext: string;
  type: fs.AssetType;
  size: number;
  isDeleted?: boolean;
};

export type ProjectModule = {
  id: number;
  name: string;
};

export type ProjectLesson = {
  name: string;
  moduleId: number;
  id: number;
};

export type ProjectSlide = {
  name: string;
  moduleId: number;
  lessonId: number;
  id: number;
  template: TemplateSchema;
};

export type ProjectGlossaryItem = {
  id: number;
  word: string;
  definition: string;
};

export type ProjectResource = {
  id: number;
  filename: string;
  title: string;
  description?: string;
};

export type ProjectData = {
  meta: Partial<ProjectMeta>,
  scorm: Partial<ProjectScorm>;
  modules?: Array<ProjectModule>;
  lessons?: Array<ProjectLesson>;
  slides?: Array<ProjectSlide>;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResource>;
};

export type ProjectFile = {
  createdAt: string;
  openedAt: string;
  updatedAt: string;
  assets: Array<ProjectAsset>;
  versions: Array<ProjectMeta>;
};

export type TemplateInfo = {
  component: string;
  js: string;
  css: string;
}

export type TemplateList = Array<TemplateInfo>;

export type TemplateMap = {
  [key: string]: TemplateInfo;
};

export type UploadReq = {
  meta: ProjectMeta,
  options: {
    assetTypes: Array<AssetType>
  }
}
