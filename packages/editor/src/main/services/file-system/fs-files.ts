
import path from 'path';
import { app } from 'electron';
import fs from 'fs-extra';
import { FileDataResult, FileExistsResult, FSResult } from './service-fs.types';

export const pathSaveFolder = app.getPath('userData');
export const pathTempFolder = path.join(app.getPath('temp'), 'scrowl');
export const pathDownloadsFolder = app.getPath('downloads');

export const normalizePath = (pathname: string) => {
  return path.normalize(pathname);
};

export const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const joinPath = (...paths: Array<string>) => {
  return path.join.apply(null, paths);
};

export const getExt = (pathname: string) => {
  return path.extname(pathname);
};

export const getDirname = (pathname: string) => {
  return path.dirname(pathname);
};

export const getBasename = (pathname: string, ext?: string) => {
  return path.basename(pathname, ext);
};

export const getAssetPath = (sourceDir: string) => {
  const assetPath = __dirname.replace(
    joinPath('services', 'file-system'),
    sourceDir
  );

  if (process.env.NODE_ENV === 'development') {
    return assetPath;
  }

  return assetPath.replace('Resources/app.asar/', '');
};

export const fileExistsSync = (pathname: string): FSResult => {
  try {
    return {
      error: false,
      data: {
        exists: fs.pathExistsSync(pathname),
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to check file existance: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileReadSync = (
  pathname: string,
  media: BufferEncoding = 'utf8'
): FileDataResult | FileExistsResult => {
  const exists = fileExistsSync(pathname);

  if (exists.error) {
    return {
      error: true,
      message: exists.message,
    };
  }

  if (media === undefined) {
    media = 'utf8';
  }

  const filename = normalizePath(pathname);

  try {
    let contents;
    const file = fs.readFileSync(filename, { encoding: media, flag: 'r' });

    if (isJSON(filename)) {
      contents = JSON.parse(file);
    } else {
      contents = file;
    }

    return {
      error: false,
      data: {
        filename,
        contents,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to read file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileWriteSync = (
  pathname: string,
  contents: unknown
): FileDataResult => {
  const filename = normalizePath(pathname);

  if (!contents) {
    return {
      error: true,
      message: `Unable to write file: ${pathname} - contents required`,
    };
  }

  try {
    if (isJSON(pathname)) {
      if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, 2);
      } else {
        contents = JSON.stringify(JSON.parse(contents), null, 2);
      }
    }

    fs.outputFileSync(filename, contents);
    return {
      error: false,
      data: {
        filename,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to write file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export default {
  normalizePath,
  isJSON,
  joinPath,
  getExt,
  getDirname,
  getBasename,
  getAssetPath,
  fileExistsSync,
  fileReadSync,
  fileWriteSync
};
