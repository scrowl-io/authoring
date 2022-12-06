import * as http from 'http';
import { createReadStream } from 'fs';
import { ApiResult } from './requester.types';
import { fs, log } from '../';
import { AddressInfo } from 'net';

const CONTENT_TYPES = {
  css: 'text/css',
  json: 'application/json',
  js: 'text/javascript',
  html: 'text/html',
  text: 'text/plain',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
};

const getContentType = (filename: string) => {
  const ext = fs.getExt(filename);

  switch (ext) {
    case '.json':
      return CONTENT_TYPES.json;
    case '.js':
    case '.mjs':
      return CONTENT_TYPES.js;
    case '.html':
      return CONTENT_TYPES.html;
    case '.css':
      return CONTENT_TYPES.css;
    case '.webp':
      return CONTENT_TYPES.webp;
    case '.svg':
      return CONTENT_TYPES.svg;
    case '.mp4':
      return CONTENT_TYPES.mp4;
    case '.mp3':
      return CONTENT_TYPES.mp3;
    default:
      return CONTENT_TYPES.text;
  }
};

const responseOk = (
  src: string,
  contentType: string,
  res: http.ServerResponse
) => {
  const read = createReadStream(src);

  res.setHeader('Content-Type', contentType);
  res.writeHead(200);

  read.pipe(res);
};

const responseNotFound = (url: string, res: http.ServerResponse) => {
  res.setHeader('Content-Type', CONTENT_TYPES.text);
  res.writeHead(404);
  res.end(`Unable to find resource: ${url}`, 'utf-8');
};

const responseInternalError = (e: unknown, res: http.ServerResponse) => {
  res.setHeader('Content-Type', CONTENT_TYPES.text);
  res.writeHead(500);
  res.end(`${e}`, 'utf-8');
};

const createTemplateServer = () => {
  log.info('creating template server');
  return new Promise<ApiResult>(resolve => {
    try {
      const address = '127.0.0.1';
      const templateWorkingPath = fs.joinPath(fs.APP_PATHS.temp, 'templates');
      const server = http.createServer((req, res) => {
        try {
          const pathname = new URL(`http://${req.headers.host}${req.url}`)
            .pathname;

          const contentType = getContentType(pathname);
          const filename = fs.joinPath(templateWorkingPath, pathname);

          fs.fileExists(filename)
            .then(existRes => {
              if (existRes.error) {
                responseInternalError(existRes, res);
                return;
              }

              if (!existRes.data.exists) {
                responseNotFound(req.url || filename, res);
                return;
              }

              responseOk(filename, contentType, res);
            })
            .catch(e => {
              responseInternalError(e, res);
            });
        } catch (e) {
          log.error('Failed to parse template request', e);
          responseInternalError(e, res);
        }
      });

      log.info('template server created');
      server.listen(0, address, () => {
        const port = (server.address() as AddressInfo).port;
        log.info('template server ready');
        resolve({
          error: false,
          data: {
            url: `http://${address}:${port}`,
            server,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'failed to create template server',
        data: {
          trace: e,
        },
      });
    }
  });
};

const createPreviewServer = () => {
  log.info('creating preview server');
  return new Promise<ApiResult>(resolve => {
    try {
      const address = '127.0.0.1';
      const previewWorkingPath = fs.joinPath(fs.APP_PATHS.preview);
      const server = http.createServer((req, res) => {
        try {
          const pathname = new URL(`http://${req.headers.host}${req.url}`)
            .pathname;

          const contentType = getContentType(pathname);
          const filename = fs.joinPath(previewWorkingPath, pathname);

          fs.fileExists(filename)
            .then(existRes => {
              if (existRes.error) {
                responseInternalError(existRes, res);
                return;
              }

              if (!existRes.data.exists) {
                responseNotFound(req.url || filename, res);
                return;
              }

              responseOk(filename, contentType, res);
            })
            .catch(e => {
              responseInternalError(e, res);
            });
        } catch (e) {
          log.error('Failed to parse template request', e);
          responseInternalError(e, res);
        }
      });

      log.info('preview server created');
      server.listen(0, address, () => {
        const port = (server.address() as AddressInfo).port;
        log.info('preview server ready');
        resolve({
          error: false,
          data: {
            url: `http://${address}:${port}`,
            server,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'failed to create template server',
        data: {
          trace: e,
        },
      });
    }
  });
};

export let templateServerUrl = '';
export let templateServer: http.Server;
export let previewServerUrl = '';
export let previewServer: http.Server;

export const useTemplateMiddleware = () => {
  const serverPromises = [
    createTemplateServer(),
    createPreviewServer(),
  ];

  Promise.allSettled(serverPromises).then((serverRes) => {
    const templateServerRes = serverRes[0];
    const previewServerRes = serverRes[1];

    if (templateServerRes.status === 'rejected') {
      log.error('failed to create template server');
    } else {

      if (templateServerRes.value.error) {
        log.error('failed to create template server', templateServerRes.value);
      } else {
        templateServerUrl = templateServerRes.value.data.url;
        templateServer = templateServerRes.value.data.server;
      }
    }

    if (previewServerRes.status === 'rejected') {
      log.error('failed to create preview server');
    } else {

      if (previewServerRes.value.error) {
        log.error('failed to create preview server', previewServerRes.value);
      } else {
        previewServerUrl = previewServerRes.value.data.url;
        previewServer = previewServerRes.value.data.server;
      }
    }
  });
};

export default {
  useTemplateMiddleware,
};
