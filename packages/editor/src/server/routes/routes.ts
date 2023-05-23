import path from 'path';
import express from 'express';

const StaticPath = path.join(process.cwd(), 'web');
const AppPathPageHome = path.join(StaticPath, 'app.html');

export const init = (app: express.Application) => {
  app.use('/public', express.static(StaticPath));

  app.get('/app', (req, res) => {
    res.sendFile(AppPathPageHome);
  });

  app.get('/app/*', (req, res) => {
    res.sendFile(AppPathPageHome);
  });
};

export default {
  init,
};