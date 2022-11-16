import * as window from './window';
import { fs, log } from './services';

const isDev = process.env.NODE_ENV === 'development';
log.info(`starting application: ${process.env.NODE_ENV}`);

if (isDev) {
  window.updateDev();
}

const cleanUpPromises = [
  fs.fileRemove(fs.APP_PATHS.temp),
  fs.fileRemove(fs.APP_PATHS.publish),
];
const cleanUpPaths = [
  fs.APP_PATHS.temp,
  fs.APP_PATHS.publish,
];

Promise.allSettled(cleanUpPromises).then((cleanUpRes) => {
  log.info('temporary folders cleaned');
  cleanUpRes.forEach((cleanUp, idx) => {
    if (cleanUp.status === 'rejected') {
      log.error(`Failed to clean up temporary directory: ${cleanUpPaths[idx]}`);
      return;
    }

    if (cleanUp.value.error) {
      log.error(`Unable to clean temporary director: ${cleanUp.value.message}`);
      return;
    }
  });

  log.info('initializing window');
  window.init();
});
