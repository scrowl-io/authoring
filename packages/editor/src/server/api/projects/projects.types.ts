import express from 'express';
import {
  ProjectsApiCreate as MainProjectsApiCreate,
  ProjectsApiUpload as MainProjectsApiUpload,
  ProjectsApiUploadProgress as MainProjectsApiUploadProgress,
  ProjectsApiSave as MainProjectsApiSave,
  ProjectsApiPublish as MainProjectsApiPublish,
  ProjectsApiList as MainProjectsApiList,
  ProjectsApiOpen as MainProjectsApiOpen,
  ProjectsApiPreviewAsset as MainProjectsApiPreviewAsset,
  ProjectsApiPreview as MainProjectsApiPreview
} from '../../../main/models/projects/projects.types';

export type {
  ProjectsEndpoints
} from '../../../main/models/projects/projects.types';

export interface ProjectsApiCreate extends Omit<MainProjectsApiCreate, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiUpload extends Omit<MainProjectsApiUpload, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiUploadProgress extends Omit<MainProjectsApiUploadProgress, 'fn'> {};

export interface ProjectsApiSave extends Omit<MainProjectsApiSave, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiPublish extends Omit<MainProjectsApiPublish, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiList extends Omit<MainProjectsApiList, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiOpen extends Omit<MainProjectsApiOpen, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiPreviewAsset extends Omit<MainProjectsApiPreviewAsset, 'fn'> {
  fn: express.Handler;
};

export interface ProjectsApiPreview extends Omit<MainProjectsApiPreview, 'fn'> {
  fn: express.Handler;
};

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
