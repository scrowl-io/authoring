import express from 'express';
import { rq } from '../services';
import * as endpoints from './endpoints';
import * as projects from './projects';

export const Route = '/api';

export const init = (app: express.Application) => {
  const router = express.Router();

  rq.register.addAll(router, endpoints.API);
  rq.register.addAll(router, projects.API);
  app.use(Route, router);
};

export default {
  Route,
  init,
};