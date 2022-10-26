import * as http from 'http';
import { ApiResult } from './requester.types';
import { fs, log } from '../';
import { AddressInfo } from 'net';

const CONTENT_TYPES = {
  css: 'text/css',
  json: 'application/json',
  js: 'text/javascript',
  html: 'text/html',
  text: 'text/plain',
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
    default:
      return CONTENT_TYPES.text;
  }
};

const responseOk = (
  content: string,
  contentType: string,
  res: http.ServerResponse
) => {
  res.setHeader('Content-Type', contentType);
  res.writeHead(200);
  res.end(content, 'utf-8');
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
      const templateWorkingPath = fs.joinPath(
        fs.pathTempFolder,
        'templates',
        'src'
      );
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

              fs.fileRead(filename)
                .then(readRes => {
                  if (readRes.error) {
                    responseInternalError(readRes, res);
                    return;
                  }

                  responseOk(readRes.data.contents, contentType, res);
                })
                .catch(e => {
                  responseInternalError(e, res);
                });
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

export const useTemplateMiddleware = () => {
  createTemplateServer().then(serverRes => {
    if (serverRes.error) {
      log.error('failed to create template server', serverRes);
      return;
    }

    templateServerUrl = serverRes.data.url;
  });
};

export default {
  useTemplateMiddleware,
};