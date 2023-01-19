import packager from 'simple-scorm-packager';
import { ProjectData, ProjectFile, TemplateList, TemplateMap } from './projects.types';
import { Templates } from '../';
import { rq, fs, tmpr, log } from '../../services';
import { dt, lt, str } from '../../utils';
import { TEMPLATE_PATHS } from '../templates';

export const getProjectTemplates = (project: ProjectData): [false | Set<string>, TemplateList] => {
  let templatePath;
  const templatePaths = new Set<string>();
  const templateList: TemplateList = [];
  const templateMap: TemplateMap = {};

  if (!project.slides) {
    return [false, templateList];
  }

  project.slides.forEach((slide) => {
    templatePath = fs.joinPath(TEMPLATE_PATHS.templates, slide.template.meta.filename);

    if (fs.fileExistsSync(templatePath)) {
      templatePaths.add(templatePath);

      if (!templateMap[slide.template.meta.component]) {
        templateMap[slide.template.meta.component] = {
          component: slide.template.meta.component,
          js: `./scrowl.template-${slide.template.meta.filename}.js`,
          css: `./scrowl.template-${slide.template.meta.filename}.css`
        };
      }
    }
  });

  for (const [key, template] of Object.entries(templateMap)) {
    templateList.push(template);
  }

  return [templatePaths, templateList];
};

export const getProjectUploads = (project: ProjectData, meta: ProjectFile, src: string) => {
  const assets = new Set<string>();

  if (!project.slides) {
    return assets;
  }

  const getAssetPath = (asset) => {
    const idx = lt.indexOf(meta.assets, 'filename', asset);

    if (idx === -1) {
      return false;
    }

    let assetPath = fs.joinPath(src, asset);
    let assetExists = fs.fileExistsSync(assetPath);

    if (assetExists.error || !assetExists.data.exists) {
      assetPath = fs.joinPath(src, fs.getBasename(asset));
      assetExists = fs.fileExistsSync(assetPath);
    }
    
    if (assetExists.error || !assetExists.data.exists) {
      return false;
    }
    
    return assetPath;
  };

  const scanContent = (content, list: Set<string>) => {
    let assetPath;

    for (const [key, item] of Object.entries(content)) {
      const input = item as Templates.InputProps;

      switch (input.type) {
        case 'Asset':
          if (input.value) {
            assetPath = getAssetPath(input.value);

            if (assetPath) {
              list.add(assetPath);
            }
          }
          break;
        case 'Fieldset':
          scanContent(input.content, list);
          break;
      }
    }

    return list;
  }

  const scanResources = () => {
    if (!project.resources || !project.resources.length) {
      return;
    }

    let assetPath;

    project.resources.forEach((resource) => {
      assetPath = getAssetPath(resource.filename);

      if (assetPath) {
        assets.add(assetPath);
      }
    });
  };

  project.slides.forEach((slide) => {
    scanContent(slide.template.content, assets);
  });

  scanResources();
  return assets;
};

export const createScormSource = (project: ProjectData, meta: ProjectFile, source: string, dest: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const appSource = Templates.TEMPLATE_PATHS.project;
    const appCopyOpts = {
      overwrite: false,
      filter: (src: string) => {
        return src.indexOf('.hbs') === -1;
      },
    };
    const uploadSource = source;
    const uploadDest = fs.joinPath(dest, 'assets');

    fs.copy(appSource, dest, appCopyOpts).then((appRes) => {
      log.info('copied app files to publish folder');
      if (appRes.error) {
        resolve(appRes);
        return;
      }

      const copyPromises: Array<Promise<rq.ApiResult>> = [];
      const copyPaths: Array<string> = [];
      const [templatePaths, templates] = getProjectTemplates(project);
      const uploadPaths = getProjectUploads(project, meta, uploadSource);

      if (templatePaths) {
        templatePaths.forEach((templatePath) => {
          copyPaths.push(templatePath);
          copyPromises.push(fs.copy(templatePath, dest));
        });
      }

      uploadPaths.forEach((uploadPath) => {
        const assetFilename = fs.getBasename(uploadPath);
        const assetDest = fs.joinPath(uploadDest, assetFilename);

        copyPaths.push(uploadPath);
        copyPromises.push(fs.copy(uploadPath, assetDest));
      });

      Promise.allSettled(copyPromises).then((copyPromiseRes) => {
        let isError = false;
        let errorRes;

        copyPromiseRes.forEach((copyRes, idx) => {
          if (copyRes.status === 'rejected') {
            log.error(`failed to copy ${copyPaths[idx]}`);
            isError = true;
            return;
          }

          if (copyRes.value.error) {
            isError = true;
            errorRes = copyRes.value;
            log.error(`failed to copy ${copyPaths[idx]}`);
            return;
          }
        });

        if (isError) {
          resolve(errorRes);
          return;
        }

        log.info(`Added files to publish folder: ${dest}`);
        resolve({
          error: false,
          data: {
            project,
            source,
            dest,
            templates,
          },
        });
      });
    });
  });
};

export const createScormEntry = ({ scorm, meta, ...project}: ProjectData, source: string, dest: string, templates: TemplateList) => {
  // create project files [html, js] and add them to publish folder
  return new Promise<rq.ApiResult>((resolve) => {
    const entryHtmlSrc = fs.joinPath(Templates.TEMPLATE_PATHS.project, 'scorm.html.hbs');
    const entryHtmlDest = fs.joinPath(dest, 'index.html');
    const entryJsSrc = fs.joinPath(Templates.TEMPLATE_PATHS.project, 'scorm.js.hbs');
    const entryJsDest = fs.joinPath(dest, 'index.js');
    const renderData = {
      // stringify the scorm data to make available to handlebar
      project: JSON.stringify(project),
      templates,
    };

    const renderEntryFile = (src, dest) => {
      return new Promise<rq.ApiResult>((resolve) => {
        fs.fileRead(src).then((readRes) => {
          if (readRes.error) {
            resolve(readRes);
            return;
          }

          const renderRes = tmpr.compile(readRes.data.contents, renderData);

          if (renderRes.error) {
            resolve(renderRes);
            return;
          }

          fs.fileWrite(dest, renderRes.data.contents).then(resolve);
        })
      })
    };

    const renderPromises = [
      renderEntryFile(entryHtmlSrc, entryHtmlDest),
      renderEntryFile(entryJsSrc, entryJsDest),
    ];

    Promise.allSettled(renderPromises).then((renderPromiseRes) => {
      let isRendered = true;
      let errorRes;

      renderPromiseRes.forEach((renderRes) => {
        if (!isRendered) {
          return;
        }

        if (renderRes.status === 'rejected') {
          isRendered = false;
          errorRes = renderRes;
          return;
        }

        if (renderRes.value.error) {
          isRendered = false;
          errorRes = renderRes.value;
          return;
        }
      });

      if (!isRendered) {
        resolve({
          error: true,
          message: `Failed to write scorm project files`,
          data: {
            trace: errorRes,
          },
        });
        return;
      }

      resolve({
        error: false,
        data: {
          project,
          source,
          dest,
        },
      });
    });
  });
};

export const createScormPackage = (src: string, dest: string, project: ProjectData, meta: ProjectFile) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const config = project.scorm;
    const today = dt.getDateStampLocal();
    const projectVersion = `0.0.${meta.versions.length}`;
    const destFolder = fs.getDirname(dest);
    const packagerOpts = {
      source: src,
      title: project.meta.name,
      version: config.outputFormat,
      language: config.language,
      startingPage: 'content/index.html',
      organization: config.organization,
      identifier: config.identifier,
      package: {
        outputFolder: destFolder,
        zip: true,
        date: today,
        version: projectVersion,
        name: config.name,
        description: config.description,
        author: config.authors,
        rights: '©Copyright ' + new Date().getFullYear(),
      },
    };
    const packageFilename = packagerOpts.package.name
      ? fs.joinPath(
          destFolder,
          `${str.toScormCase(packagerOpts.package.name)}_v${
            packagerOpts.package.version
          }_${today}.zip`
        )
      : fs.joinPath(
          destFolder,
          `${str.toScormCase(packagerOpts.title)}_v${
            packagerOpts.package.version
          }_${today}.zip`
        );

    packager(packagerOpts, (message: string) => {
      fs.fileRename(packageFilename, dest).then((res) => {
        if (res.error) {
          resolve(res);
          return;
        }

        resolve({
          error: false,
          data: {
            message,
            dest,
          },
        });
      });
    });
  });
};

export const scorm = (project: ProjectData, meta: ProjectFile, pubDest: string, tempDest: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const projectSource =  fs.getDirname(project.meta.filename || '');
    const projectDest = fs.joinPath(tempDest, 'content');

    createScormSource(project, meta, projectSource, projectDest).then((sourceRes) => {
      if (sourceRes.error) {
        resolve(sourceRes);
        return;
      }

      const templates = sourceRes.data.templates;

      createScormEntry(project, projectSource, projectDest, templates).then((entryRes) => {
        if (entryRes.error) {
          resolve(entryRes);
          return;
        }

        createScormPackage(tempDest, pubDest, project, meta).then((packRes) => {
          if (packRes.error) {
            resolve(packRes);
            return;
          }

          log.info(`Published project: ${pubDest}`);
          resolve({
            error: false,
            data: {
              project,
              dest: pubDest,
            },
          });
        });
      });
    });
  });
};

export default {
  getProjectTemplates,
  getProjectUploads,
  createScormSource,
  createScormEntry,
  createScormPackage,
  scorm,
};
