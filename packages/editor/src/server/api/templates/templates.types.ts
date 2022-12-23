import express from 'express';
import {
  TemplatesApiGet as MainTemplatesApiGet,
  TemplatesApiLoad as MainTemplatesApiLoad,
} from '../../../main/models/templates/templates.types';
import { rq } from '../../services';

export type {
  TemplatesEndpoints,
  TemplateReqLoad
} from '../../../main/models/templates/templates.types';

export interface TemplatesApiGet extends Omit<MainTemplatesApiGet, 'fn'> {
  fn: express.Handler;
};

export interface TemplatesApiLoad extends Omit<MainTemplatesApiLoad, 'fn'> {
  fn: express.Handler;
  method: 'POST';
};

export interface TemplatesApiViewer extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/templates/viewer/*'
}

export type TemplatesApi = {
  get: TemplatesApiGet;
  load: TemplatesApiLoad;
  viewer: TemplatesApiViewer;
};
