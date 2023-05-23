import { TemplatesApi, TemplateReqLoad } from './templates.types';
import { rq, fs, tmpr, log } from '../../services';
import { list as templateList } from './default-templates';

export const TEMPLATE_PATHS = {
  working: fs.joinPath(fs.APP_PATHS.temp, 'templates'),
  workingAssets: fs.joinPath(fs.APP_PATHS.temp, 'templates', 'assets'),
  project: fs.getSourcePath('assets', 'project'),
  templates: fs.getSourcePath('assets', 'templates'),
};

export const load = (ev: rq.RequestEvent, req: TemplateReqLoad) => {

  const compileFile = (
    filename: string,
    data: rq.JsonResult,
    dest: string
  ) => {
    return new Promise<rq.ApiResult>(resolve => {
      try {
        fs.fileRead(filename).then(readRes => {
          if (readRes.error) {
            log.error(readRes);
            resolve(readRes);
            return;
          }

          const compileRes = tmpr.compile(readRes.data.contents, data);

          if (compileRes.error) {
            log.error(compileRes);
            resolve(compileRes);
            return;
          }

          fs.fileWrite(dest, compileRes.data.contents).then(resolve);
        });
      } catch (e) {
        const compileError = {
          error: true,
          message: 'Failed to compile canvas',
          data: {
            trace: e,
          },
        };
        log.error(compileError);
        resolve(compileError);
      }
    });
  };

  return new Promise<rq.ApiResult>((resolve) => {
    if (!req.template || !req.template.meta) {
      const missingDataError: rq.ApiResultError = {
        error: true,
        message: 'Unable to load template - template required',
        data: {
          template: req.template,
        }
      };
      log.error(missingDataError);
      resolve(missingDataError);
      return;
    }

    try {
      const cacheBreaker = new Date().valueOf();
      const projectCopyOpts = {
        overwrite: false,
        filter: (src: string) => {
          return src.indexOf('.hbs') === -1;
        },
      };
      const templatePath = fs.joinPath(
        TEMPLATE_PATHS.templates,
        req.template.meta.filename
      );
      const canvasJsSrc = fs.joinPath(TEMPLATE_PATHS.project, 'canvas.js.hbs');
      const canvasJsDest = fs.joinPath(TEMPLATE_PATHS.working, 'index.js');
      const canvasHtmlSrc = fs.joinPath(
        TEMPLATE_PATHS.project,
        'canvas.html.hbs'
      );
      const canvasHtmlDest = fs.joinPath(TEMPLATE_PATHS.working, 'index.html');
      const renderData = {
        canvasJs: `./index.js?ver=${cacheBreaker}`,
        templateJs: `./scrowl.template-${req.template.meta.filename}.js?ver=${cacheBreaker}`,
        templateCss: `./scrowl.template-${req.template.meta.filename}.css?ver=${cacheBreaker}`,
        templateComponent: req.template.meta.component,
        templateContent: JSON.stringify(req.template.content),
        templateControls: JSON.stringify(req.template.controlOptions),
      };

      fs.copy(TEMPLATE_PATHS.project, TEMPLATE_PATHS.working, projectCopyOpts).then((copyProjectFilesRes) => {
        if (copyProjectFilesRes.error) {
          resolve(copyProjectFilesRes);
          return;
        }

        const canvasFrameRenders = [
          compileFile(canvasJsSrc, renderData, canvasJsDest),
          compileFile(canvasHtmlSrc, renderData, canvasHtmlDest),
        ];

        Promise.allSettled(canvasFrameRenders).then((renderRes) => {
          let isRendered = true;
  
          for (let i = 0, ii = renderRes.length; i < ii; i++) {
            if (renderRes[i].status === 'rejected') {
              isRendered = false;
              log.error('Failed to render canvas');
              break;
            }
          }
  
          if (!isRendered) {
            const renderError: rq.ApiResultError = {
              error: true,
              message: 'Failed to render template',
              data: {
                template: req.template,
              },
            };
            log.error(renderError);
            resolve(renderError);
            return;
          }

          const loadDone = () => {
            resolve({
              error: false,
              data: {
                url: `${rq.templateServerUrl}/index.html?ver=${cacheBreaker}`
              }
            });
          };

          const copyUploads = () => {
            fs.copy(fs.APP_PATHS.uploads, TEMPLATE_PATHS.workingAssets, {
              overwrite: false,
            }).then((assetCopyRes) => {
              if (assetCopyRes.error) {
                log.error(assetCopyRes);
                resolve(assetCopyRes);
                return;
              }

              loadDone();
            });
          };

          fs.copy(templatePath, TEMPLATE_PATHS.working, {
            overwrite: false,
          }).then((tempCopyRes) => {
            if (tempCopyRes.error) {
              log.error(tempCopyRes);
              resolve(tempCopyRes);
              return;
            }

            const existRes = fs.fileExistsSync(fs.APP_PATHS.uploads);

            if (existRes.error) {
              log.error(existRes);
              loadDone();
              return;
            }

            if (existRes.data.exists) {
              copyUploads();
            } else {
              loadDone();
            }
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message :'Failed to load template',
        data: {
          trace: e,
          template: req.template,
        }
      })
    }
  });
};

export const get = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        templates: templateList,
      }
    });
  })
};

export const API: TemplatesApi = {
  load: {
    name: '/templates/load',
    type: 'invoke',
    fn: load,
  },
  get: {
    name: '/templates/get',
    type: 'invoke',
    fn: get,
  },
};

export const init = () => {
  rq.registerEndpointAll(API);
};

export default {
  TEMPLATE_PATHS,
  load,
  init,
};
