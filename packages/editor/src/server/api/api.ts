import express from 'express';

export const Route = '/api';

export const init = (app: express.Application) => {
  const router = express.Router();

  app.use(Route, router);
};

export default {
  Route,
  init,
};