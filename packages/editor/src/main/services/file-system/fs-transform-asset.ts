import sharp from 'sharp';
import { rq, log, fs } from '../';

export const toWebp = (src: string, dest: string, options?: sharp.WebpOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    log.info('transforming to webp');
    sharp(src)
      .webp(options)
      .toBuffer((e, data, info) => {
        if (e) {
          resolve({
            error: true,
            message: 'Failed to convert image: unexpected error',
            data: {
              trace: e,
              src,
              dest,
              options,
            }
          });
          return;
        }

        fs.fileWrite(dest, data).then((writeRes) => {
          if (writeRes.error) {
            resolve(writeRes);
          }
          log.info('transform to webp complete', dest);
          resolve({
            error: false,
            data: {
              ...info,
              src,
              dest,
              options,
            },
          });
        })
      });
  });
};

export default {
  toWebp,
};
