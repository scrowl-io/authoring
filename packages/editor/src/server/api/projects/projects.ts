import express from 'express';
import {
  ProjectsApi,
} from './projects.types';
import { blueprints } from '../../../main/models/projects/blueprints'

export const create: express.Handler = (req, res) => {
  const project = blueprints.get('default');

  res.send({
    error: false,
    data: {
      project,
    },
  });
};

export const upload: express.Handler = (req, res) => {};

export const save: express.Handler = (req, res) => {};

export const publish: express.Handler = (req, res) => {};

export const list: express.Handler = (req, res) => {};

export const open: express.Handler = (req, res) => {};

export const previewAsset: express.Handler = (req, res) => {};

export const preview: express.Handler = (req, res) => {};

export const API: ProjectsApi = {
  create: {
    name: '/projects/create',
    type: 'invoke',
    fn: create,
  },
  upload: {
    name: '/projects/upload',
    type: 'invoke',
    fn: upload,
  },
  uploadProgress: {
    name: '/projects/upload/progress',
    type: 'send',
  },
  save: {
    name: '/projects/save',
    type: 'invoke',
    fn: save,
  },
  publish: {
    name: '/projects/publish',
    type: 'invoke',
    fn: publish,
  },
  list: {
    name: '/projects/list',
    type: 'invoke',
    fn: list,
  },
  open: {
    name: '/projects/open',
    type: 'invoke',
    fn: open,
  },
  previewAsset: {
    name: '/projects/preview-asset',
    type: 'invoke',
    fn: previewAsset,
  },
  preview: {
    name: '/projects/preview',
    type: 'invoke',
    fn: preview,
  },
};

export default {
  API,
};