import * as window from './window';
import { fs, log } from './services';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  window.updateDev();
}

fs.fileRemove(fs.APP_PATHS.temp).then((res) => {
  if (res.error) {
    log.error(res.message, res.data.trace);
  }

  window.init();
});
