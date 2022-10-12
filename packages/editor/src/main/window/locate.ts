import { URL } from 'url';
import { app } from 'electron';
import { fs } from '../services';

export const getAppPath = (filename: string) => {
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    const port = process.env.PORT || 1234;
    const url = new URL(`http://localhost:${port}`);

    url.pathname = filename;
    return url.href;
  } else {
    return fs.joinPath(fs.getAssetPath('dist'), filename);
  }
};

export const getAssetPath = (...paths: string[]) => {
  const RESOURCES_PATH = app.isPackaged
  ? fs.joinPath(process.resourcesPath, 'assets')
  : fs.joinPath(__dirname, '../../../assets');

  return fs.joinPath(RESOURCES_PATH, ...paths);
};

export default {
  getAppPath,
  getAssetPath,
};
