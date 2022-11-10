import packager from 'simple-scorm-packager';
import { ProjectData, ProjectFile } from './projects.types';
import { Templates } from '../';
import { rq, fs, tmpr, log } from '../../services';
import { dt, lt } from '../../utils';
import { TEMPLATE_PATHS } from '../templates';

export const getProjectTemplates = (project: ProjectData) => {
  let templatePath;
  const templatePaths = new Set<string>();

  if (!project.slides) {
    return templatePaths;
  }

  project.slides.forEach((slide) => {
    templatePath = fs.joinPath(TEMPLATE_PATHS.templates, slide.template.meta.filename);

    if (fs.fileExistsSync(templatePath)) {
      templatePaths.add(templatePath);
    }
  });

  return templatePaths;
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

    const assetPath = fs.joinPath(src, asset);
    const assetExists = fs.fileExistsSync(assetPath);

    if (!assetExists) {
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
              list.add(input.value);
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

  project.slides.forEach((slide) => {
    scanContent(slide, assets);
  });

  return assets;
};

const createScormSource = (project: ProjectData, meta: ProjectFile, source: string, dest: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const appSource = Templates.TEMPLATE_PATHS.project;
    const appCopyOpts = {
      overwrite: false,
      filter: (src: string) => {
        return src.indexOf('.hbs') === -1;
      },
    };
    const uploadSource = fs.joinPath(source, 'assets');
    const uploadDest = fs.joinPath(dest, 'assets');

    fs.copy(appSource, dest, appCopyOpts).then((appRes) => {
      log.info('copied app files to publish folder');
      if (appRes.error) {
        resolve(appRes);
        return;
      }

      const copyPromises: Array<Promise<rq.ApiResult>> = [];
      const copyPaths: Array<string> = [];
      const templatePaths = getProjectTemplates(project);
      const uploadPaths = getProjectUploads(project, meta, uploadSource);

      templatePaths.forEach((templatePath) => {
        copyPaths.push(templatePath);
        copyPromises.push(fs.copy(templatePath, dest));
      });

      uploadPaths.forEach((uploadPath) => {
        copyPaths.push(uploadPath);
        copyPromises.push(fs.copy(uploadPath, uploadDest));
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
          },
        });
      });
    });
  });
};

const createScormEntry = (project, source, dest) => {
  // create project files [html, js] and add them to publish folder
  return new Promise<rq.ApiResult>((resolve) => {
    const entryHtmlSrc = fs.joinPath(Templates.TEMPLATE_PATHS.project, 'scorm.html.hbs');
    const entryHtmlDest = fs.joinPath(dest, 'index.html');
    const entryJsSrc = fs.joinPath(Templates.TEMPLATE_PATHS.project, 'scorm.js.hbs');
    const entryJsDest = fs.joinPath(dest, 'index.js');

    resolve({
      error: false,
      data: {
        project,
        source,
        dest,
      },
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

      createScormEntry(project, projectSource, projectDest).then((entryRes) => {
        if (entryRes.error) {
          resolve(entryRes);
          return;
        }

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
};

export default {
  scorm,
};
