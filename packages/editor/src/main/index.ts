import * as window from './window';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  window.updateDev();
}

window.init();
