import express from 'express';
import { rq } from '../services';
import * as endpoints from './endpoints';
import * as projects from './projects';
import * as templates from './templates';

export const Route = '/api';

export const init = (app: express.Application) => {
  const router = express.Router();
  
  rq.register.addAll(router, endpoints.API);
  rq.register.addAll(router, projects.API);
  rq.register.addAll(router, templates.API);
  app.use(Route, router);
};

export default {
  Route,
  init,
};