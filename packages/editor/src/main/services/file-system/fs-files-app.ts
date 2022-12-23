import path from 'path';
import { URL } from 'url';
import { app } from 'electron';
import fs from 'fs-extra';
import { joinPath, fileExistsSync } from './fs-files';
import { rq, log } from '../';
import { lt } from '../../utils';

export const APP_PATHS = {
  root: path.join(__dirname, '../../../../'),
  save: path.join(app.getPath('documents'), 'scrowl'),
  downloads: app.getPath('downloads'),
  temp: path.join(app.getPath('temp'), 'scrowl'),
  publish: path.join(app.getPath('temp'), 'scrowl', 'publish'),
  uploads: path.join(app.getPath('temp'), 'scrowl', 'uploads'),
  preview: path.join(app.getPath('temp'), 'scrowl', 'preview'),
};

export const getAppPath = (filename: string) => {
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    const port = process.env.PORT || 1234;
    const url = new URL(`http://localhost:${port}`);

    url.pathname = filename;
    log.info(`getting app path: ${url.href}`);
    return url.href;
  } else {
    const appPath = `file://${getDistPath(filename)}`;

    log.info(`getting app path: ${appPath}`);
    return appPath;
  }
};

export const getAssetPath = (...paths) => {
  const assetPath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets', ...paths)
  : path.join(APP_PATHS.root, 'assets', ...paths);

  log.info(`getting asset path: ${assetPath}`);
  return assetPath;
};

export const getSourcePath = (...paths) => {
  const srcPath = app.isPackaged
    ? path.join(process.resourcesPath, '../', 'src', 'main', ...paths)
    : path.join(APP_PATHS.root, 'src', 'main', ...paths);

  log.info(`getting source path: ${srcPath}`);
  return srcPath;
}

export const getDistPath = (...paths) => {
  const distPath = path.join(APP_PATHS.root, 'dist', ...paths);

  log.info(`getting dist path: ${distPath}`);
  return distPath;
};

export const drainProjectFiles = (limit?: number) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.readdir(APP_PATHS.save).then((res) => {
      let projects: Array<{
        updatedAt: Date,
        pathname: string,
      }> = [];

      res.forEach((dir: string, idx: number) => {
        const pathname = joinPath(APP_PATHS.save, dir);
        const stats = fs.lstatSync(pathname);
        const isValid = stats.isDirectory() && pathname.indexOf('logs') === -1;

        if (isValid) {
          projects.push({
            updatedAt: stats.mtime,
            pathname,
          });
        }
      });

      lt.sortBy(projects, ['updatedAt'], true);

      const files: Array<string> = [];
      let fileCnt = 0;

      for (let i = 0, ii = projects.length; i < ii; i++) {
        if (limit && fileCnt >= limit) {
          break;
        }

        const filepath = joinPath(projects[i].pathname, 'project.json');
        const exists = fileExistsSync(filepath);

        if (exists.error) {
          continue;
        }

        if (!exists.data.exists) {
          continue;
        }

        fileCnt++;
        files.push(filepath);
      }

      resolve({
        error: false,
        data: {
          filepaths: files,
        },
      });
    }).catch((e) => {
      resolve({
        error: true,
        message: 'Unexpected error occurred when getting project files',
        data: {
          trace: e,
        },
      });
    });
  });
}

export default {
  APP_PATHS,
  getAssetPath,
  drainProjectFiles,
};