import { rq, fs, mu } from '../../services';
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

export interface ProjectsApiUploadProgress
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/upload/progress';
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

export interface ProjectsApiPreviewAsset
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/preview-asset';
}

export interface ProjectsApiPreview
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/projects/preview';
}

export type ProjectsApi = {
  create: ProjectsApiCreate;
  upload: ProjectsApiUpload;
  uploadProgress: ProjectsApiUploadProgress;
  save: ProjectsApiSave;
  publish: ProjectsApiPublish;
  list: ProjectsApiList;
  open: ProjectsApiOpen;
  previewAsset: ProjectsApiPreviewAsset;
  preview: ProjectsApiPreview;
};

export type ProjectsEndpoints = {
  create: ProjectsApiCreate['name'];
  upload: ProjectsApiUpload['name'];
  uploadProgress: ProjectsApiUploadProgress['name'];
  save: ProjectsApiSave['name'];
  publish: ProjectsApiPublish['name'];
  list: ProjectsApiList['name'];
  open: ProjectsApiOpen['name'];
  previewAsset: ProjectsApiPreviewAsset['name'];
  preview: ProjectsApiPreview['name'];
};

export type ProjectMeta = {
  id: string;
  name: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: Array<string>;
  blueprint?: string;
  createdBy?: string;
};

export type ProjectScorm = {
  name: string;
  outputFormat: '1.2' | '2004 3rd Edition' | '2004.4';
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
  title: string;
  filename: string;
  ext: string;
  type: fs.AssetType;
  size: number;
  isDeleted?: boolean;
  sourceExt: string;
  sourceFilename: string;
};

export interface ProjectResource extends ProjectAsset {
  description?: string;
}

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

export type ProjectData = {
  meta: Partial<ProjectMeta>;
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
  lastPublishedFilename?: string;
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

export type ProjectsReqCreate = {
  blueprint: string
};

export type ProjectsReqUpload = {
  meta: ProjectMeta;
  options: {
    assetTypes: Array<AssetType>;
  };
};

export type ProjectsReqSave = {
  data: ProjectData;
  assets: Array<ProjectAsset>;
};

export type ProjectsReqList = {
  limit?: number;
};

export type ProjectsReqPreviewAsset = {
  asset: ProjectAsset | ProjectResource;
  meta: ProjectMeta;
};

export type ProjectsReqPreviewProject = {
  project: ProjectData;
  assets: Array<ProjectAsset>;
  type: mu.PreviewTypes;
  id?: number;
};
