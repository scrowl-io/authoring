import express from 'express';
import { TemplatesApi, TemplateReqLoad } from './templates.types';
import { list as templateList } from '../../../main/models/templates/default-templates';
import { fs } from '../../services';

export const get: express.Handler = (req, res) => {
  res.send({
    error: false,
    data: {
      templates: templateList,
    },
  });
};

export const load: express.Handler = (req, res) => {
  const payload = req.body as unknown as TemplateReqLoad;

  console.log('loading', payload);
  console.log('root', fs.rootPath);

  res.send({
    error: true,
    message: 'endpoint unable to complete request',
    data: payload,
  });
};

export const API: TemplatesApi = {
  get: {
    name: '/templates/get',
    type: 'invoke',
    fn: get,
  },
  load: {
    name: '/templates/load',
    type: 'invoke',
    fn: load,
    method: 'POST',
  },
};

export default {
  API,
  get,
  load,
};
