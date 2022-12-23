import path from 'path';
import fs from 'fs-extra';
import { FileDataResult, FileExistsResult } from '../../../main/services/file-system/fs.types';
import { rq } from '../';

// below causing an error, as parcel tries to load electron apis
// TODO: clean this up so we don't have to duplicate code
// export {
//   fileReadSync,
// } from '../../../main/services/file-system/fs-files';

const basePath = process.env.PWD;

export const rootPath = path.join(basePath || '', 'src', 'server');

export const normalizePath = (pathname: string) => {
  return path.normalize(pathname);
};

export const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const fileExistsSync = (pathname: string): rq.ApiResult => {
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

export default {
  rootPath,
  normalizePath,
  isJSON,
  fileExistsSync,
  fileReadSync,
};
