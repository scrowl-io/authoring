import log from 'electron-log';
import { joinPath, APP_PATHS } from '../file-system';

const addLeadZero = (val: number | string) => {
  return `0${val}`.slice(-2);
};

const getTimestamp = () => {
  const now = new Date();
  const stampYear = now.getUTCFullYear();
  const stampMonth = addLeadZero(now.getUTCMonth() + 1);
  const stampDate = addLeadZero(now.getUTCDate());
  const stampHours = addLeadZero(now.getUTCHours());
  const stampMins = addLeadZero(now.getUTCMinutes());
  const stampSecs = addLeadZero(now.getUTCSeconds());

  return `${stampYear}-${stampMonth}-${stampDate}_${stampHours}_${stampMins}_${stampSecs}`;
};

log.transports.file.resolvePath = () => {
  // dev: 
  return joinPath(APP_PATHS.save, 'logs', `main.${getTimestamp()}.log`);
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
