import log from 'electron-log';
import { joinPath, APP_PATHS } from '../file-system';
import { dt } from '../../utils';

log.transports.file.resolvePath = () => {
  // dev: 
  return joinPath(APP_PATHS.save, 'logs', `main.${dt.getTimestamp()}.log`);
};

export const info = (...args: unknown[]) => {
  log.info(...args);
};

export const warn = (...args: unknown[]) => {
  log.warn(...args);
};

export const error = (...args: unknown[]) => {
  log.error(...args);
};

export default {
  info,
  warn,
  error,
};
