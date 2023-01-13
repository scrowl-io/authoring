import { AppConfig } from './config.types';

export const app: AppConfig = window.Scrowl ?
  window.Scrowl.config :
  {
    desktop: true,
  };

export default {
  app,
};