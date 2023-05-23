
import path from 'path';
import fs from 'fs-extra';
import { rq, log } from '../';
import { FileDataResult, FileExistsResult, AssetFilters, AssetType } from './fs.types';

export const ASSET_TYPES: AssetFilters = {
  image: {
    name: 'image',
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
  },
  document: {
    name: 'document',
    extensions: ['txt', 'doc', 'docx', 'pdf', 'zip'],
  },
  video: {
    name: 'video',
    extensions: ['mp4', 'mkv', 'avi'],
  },
  audio: {
    name: 'audio',
    extensions: ['mp3', 'mp4'],
  },
  json: {
    name: 'json',
    extensions: ['json'],
  },
};

export const assetTypeByExt = (ext: string): AssetType => {
  let type;

  for (const [key, value] of Object.entries(ASSET_TYPES)) {
    if (type) {
      break;
    }

    const lookup = value.extensions as Array<string>;

    if (lookup.indexOf(ext) !== -1) {
      type = value.name;
      break;
    }
  }

  return type;
};

const createResultError = (message: string, error?: unknown): rq.ApiResult => {
  if (error === undefined) {
    return {
      error: true,
      message,
    };
  } else {
    return {
      error: true,
      message,
      data: {
        trace: error,
      },
    };
  }
};

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

export const fileExists = (pathname: string) => {
  return new Promise<rq.ApiResult>(resolve => {
    try {
      fs.pathExists(pathname)
        .then(exists => {
          resolve({
            error: false,
            data: {
              exists,
              pathname,
            },
          });
        })
        .catch(e => {
          resolve(
            createResultError(`Unable to check existence: ${pathname}`, e)
          );
        });
    } catch (e) {
      resolve(createResultError(`Failed to check existence: ${pathname}`, e));
    }
  });
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

export const fileRead = (pathname: string) => {
  return new Promise<rq.ApiResult>(resolve => {
    if (!pathname) {
      resolve(createResultError('Unable to read file: path required'));
      return;
    }

    const existsRes = fileExistsSync(pathname);

    if (existsRes.error) {
      resolve(existsRes);
      return;
    }

    if (!existsRes.data.exists) {
      resolve(
        createResultError(
          `Unable to read file: file does not exist ${pathname}`
        )
      );
      return;
    }

    try {
      fs.readFile(pathname, { encoding: 'utf-8', flag: 'r' }).then(file => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: isJSON(pathname) ? JSON.parse(file) : file,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
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

export const fileWrite = (pathname: string, contents: unknown) => {
  return new Promise<rq.ApiResult>((resolve, reject) => {
    if (!pathname) {
      resolve(createResultError('Unable to write file: path required'));
      return;
    }

    if (!contents) {
      resolve(createResultError('Unable to write file: contents required'));
      return;
    }

    try {
      let fileData = contents;

      if (isJSON(pathname)) {
        if (typeof contents !== 'string') {
          fileData = JSON.stringify(contents, null, 2);
        } else {
          fileData = JSON.stringify(JSON.parse(contents), null, 2);
        }
      }

      fs.outputFile(pathname, fileData).then(() => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: fileData,
          },
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const copy = (source: string, dest: string, opts?: fs.CopyOptions) => {
  return new Promise<rq.ApiResult>(resolve => {
    if (!source) {
      log.error(`failed to copy: missing source`);
      resolve(
        createResultError('Unable to copy temp to source: source required')
      );
      return;
    }

    if (!dest) {
      log.error(`failed to copy: missing dest`);
      resolve(
        createResultError('Unable to copy temp to source: destination required')
      );
      return;
    }

    try {
      if (!fs.pathExistsSync(source)) {
        log.error(`failed to copy: source doesn't exist`);
        resolve({
          error: true,
          message: `Unable to copy ${source}: path does not exist`,
          data: {
            source,
            dest,
          },
        });
        return;
      }

      fs.copy(source, dest, opts)
        .then(() => {
          resolve({
            error: false,
            data: {
              source,
              dest,
            },
          });
        })
        .catch((e) => {
          log.error(`failed to copy: unexpected error`, e);
          resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
        });
    } catch (e) {
      log.error(`failed to copy: crash`, e);
      resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
    }
  });
};

export const fileRemove = (pathname) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.remove(pathname)
      .then(() => {
        resolve({
          error: false,
          data: {
            pathname,
          },
        });
      })
      .catch((e) => {
        resolve({
          error: true,
          message: `Failed to remove contents: ${pathname}`,
          data: {
            trace: e,
            pathname,
          },
        });
      });
  });
}

export const fileRename = (src, filename) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.rename(src, filename, (e) => {
      if (e) {
        resolve({
          error: true,
          message: `Failed to rename file: ${src} -> ${filename}`,
          data: {
            src,
            filename,
          },
        });
        return;
      }

      resolve({
        error: false,
        data: {
          src,
          filename,
        },
      });
    });
  });
};

export const fileStatsSync = (pathname): rq.ApiResult => {
  try {
    const stats = fs.statSync(pathname);

    return {
      error: false,
      data: {
        stats,
      }
    }
  } catch (e) {
    return {
      error: true,
      message: 'failed to get stats: unexpected error',
      data: {
        trace: e,
      },
    };
  }
};

export const progressWrite = (src: string, dest: string, onUpdate?: (completed: number, progress: number, total: number) => void) => {
  return new Promise<rq.ApiResult>((resolve) => {
    try {
      const stats = fs.statSync(src);
      let progress = 0;
      let completed = 0;
      const fileSize = stats.size;
      
      fs.ensureDirSync(getDirname(dest));

      if (onUpdate) {
        onUpdate(completed, progress, fileSize);
      }

      fs.createReadStream(src)
        .on('data', (chunk) => {
          const chunkLn = chunk.length;

          progress += chunkLn;
          completed = parseFloat((progress / fileSize).toFixed(4));

          if (onUpdate) {
            onUpdate(completed, progress, fileSize);
          }
        })
        .on('end', () => {
          resolve({
            error: false,
            data: {
              src,
              dest,
            },
          });
        })
        .pipe(fs.createWriteStream(dest));
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to copy file: unexpected error',
        data: {
          trace: e,
          src,
          dest,
        },
      });
    }
  });
};

export default {
  ASSET_TYPES,
  assetTypeByExt,
  normalizePath,
  isJSON,
  joinPath,
  getExt,
  getDirname,
  getBasename,
  fileExistsSync,
  fileExists,
  fileReadSync,
  fileRead,
  fileWriteSync,
  fileWrite,
  copy,
  fileRemove,
  fileRename,
  fileStatsSync,
  progressWrite,
};
