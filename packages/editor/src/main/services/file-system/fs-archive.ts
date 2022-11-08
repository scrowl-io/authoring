import { gzip } from 'node:zlib';
import { Buffer } from 'node:buffer';
import AdmZip from 'adm-zip';
import { FileDataResult } from './fs.types';
import { rq } from '../';

export const compress = (data) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    gzip(dataBuffer, (e, zippedData) => {
      if (e) {
        resolve({
          error: true,
          message: 'Failed to compress',
          data: {
            trace: e, 
            data,
          },
        });
        return;
      }

      resolve({
        error: false,
        data: {
          data: zippedData,
        },
      });
    })
  });
};

export const zip = (source: string, dest: string): FileDataResult => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder(source);

    zip.writeZip(dest);

    return {
      error: false,
      data: {
        filename: dest,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to archive: ${source} to ${dest} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const unzip = (
  source: string,
  dest: string
): Promise<FileDataResult> => {
  return new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip(source);

      zip.extractAllTo(dest, true);

      resolve({
        error: false,
        data: {
          filename: source,
          projectDir: dest,
        },
      });
    } catch (err) {
      const message =
        err && typeof err === 'string'
          ? err
          : `Unable to extract the file project: ${source} to ${dest} - unknown reason`;

      reject({
        error: true,
        message: message,
      });
    }
  });
};

export default {
  compress,
  zip,
  unzip,
};
