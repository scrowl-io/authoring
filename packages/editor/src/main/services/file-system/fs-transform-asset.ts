import sharp from 'sharp';
import { rq } from '../';

export const toWebp = (src: string, dest: string, options?: sharp.WebpOptions) => {
  return new Promise<rq.ApiResult>((resolve) => {
    sharp(src)
      .webp(options)
      .toFile(dest)
      .then((info) => {
        resolve({
          error: false,
          data: {
            ...info,
          },
        });
      })
      .catch((e) => {
        resolve({
          error: true,
          message: 'Failed to convert image: unexpected error',
          data: {
            trace: e,
          },
        });
      });
  });
};

export default {
  toWebp,
};
