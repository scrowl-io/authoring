import { URL } from 'url';
import { app } from 'electron';
import { fs } from '../services';

const __rootDir = fs.joinPath(__dirname, '../../../', 'dist');

export const getAppPath = (filename: string) => {
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    const port = process.env.PORT || 1234;
    const url = new URL(`http://localhost:${port}`);

    url.pathname = filename;
    return url.href;
  } else {
    return `file://${getSourcePath(filename)}`;
  }
};

export const getAssetPath = (...paths) => {
  return app.isPackaged
  ? fs.joinPath(process.resourcesPath, 'assets', ...paths)
  : fs.joinPath(__dirname, '../../../assets', ...paths);
};

export const getSourcePath = (...paths) => {
  return fs.joinPath(__rootDir, ...paths);
};

export default {
  getAppPath,
  getSourcePath,
};
