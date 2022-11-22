import { TemplatesApi, TemplateSchema } from './templates.types';
import { rq, fs, tmpr, log } from '../../services';
import { list as templateList } from './default-templates';

export const TEMPLATE_PATHS = {
  working: fs.joinPath(fs.APP_PATHS.temp, 'templates'),
  project: fs.getSourcePath('assets', 'project'),
  templates: fs.getSourcePath('assets', 'templates'),
};

export const load = (ev: rq.RequestEvent, template: TemplateSchema) => {

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
    if (!template || !template.meta) {
      const missingDataError: rq.ApiResultError = {
        error: true,
        message: 'Unable to load template - template required',
        data: {
          template,
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
      const templatePath = fs.joinPath(TEMPLATE_PATHS.templates, template.meta.filename);
      const canvasJsSrc = fs.joinPath(TEMPLATE_PATHS.project, 'canvas.js.hbs');
      const canvasJsDest = fs.joinPath(TEMPLATE_PATHS.working, 'index.js');
      const canvasHtmlSrc = fs.joinPath(TEMPLATE_PATHS.project, 'canvas.html.hbs');;
      const canvasHtmlDest = fs.joinPath(TEMPLATE_PATHS.working, 'index.html');
      const renderData = {
        canvasJs: `./index.js?ver=${cacheBreaker}`,
        templateJs: `./scrowl.template-${template.meta.filename}.js?ver=${cacheBreaker}`,
        templateCss: `./scrowl.template-${template.meta.filename}.css?ver=${cacheBreaker}`,
        templateComponent: template.meta.component,
        templateContent: JSON.stringify(template.content),
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
                template,
              },
            };
            log.error(renderError);
            resolve(renderError);
            return;
          }
  
          fs.copy(templatePath, TEMPLATE_PATHS.working, { overwrite: false }).then((tempCopyRes) => {
            if (tempCopyRes.error) {
              log.error(tempCopyRes);
              resolve(tempCopyRes);
              return;
            }
  
            resolve({
              error: false,
              data: {
                url: `${rq.templateServerUrl}/index.html?ver=${cacheBreaker}`
              }
            });
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message :'Failed to load template',
        data: {
          trace: e,
          template,
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
