import { OpenDialogOptions } from 'electron';
import { v4 as uuid } from 'uuid';
import { ProjectsApi, ProjectData, ProjectFile, ProjectMeta, UploadReq } from './projects.types';
import { createProject } from './project.data';
import { rq, fs, log } from '../../services';
import * as utils from '../../utils';
import { scorm } from './project-publisher';

const projectMetaFilename = 'project.json';

const getProjectPath = (name) => {
  return fs.joinPath(fs.APP_PATHS.save, name);
};

const getProjectInfo = (meta: ProjectMeta): rq.ApiResult => {
  const noId = !meta.id;
  const noName = !meta.name;
    
  let folder;
  let info: ProjectFile;

  try {
    if (!noId && !noName) {
      folder = fs.getDirname(meta.filename || '');
    } else if (!noId) {
      folder = getProjectPath(utils.str.toKebabCase(meta.name));
    } else {
      return {
        error: false,
        data: {
          isNew: true,
          uncommitted: true,
        }
      }
    }
  
    const fileName = fs.joinPath(folder, projectMetaFilename);
    const exists = fs.fileExistsSync(fileName);
  
    if (!exists) {
      return {
        error: false,
        data: {
          isNew: !noId,
          uncommitted: noName,
          fileName,
          exists,
          folder,
        }
      }
    }
  
    const read = fs.fileReadSync(fileName) as rq.ApiResult;
  
    if (read.error) {
      return read;
    }
  
    info = read.data as ProjectFile;

    return {
      error: false,
      data: {
        isNew: !noId,
        uncommitted: noName,
        fileName,
        exists,
        folder,
        info,
      }
    };
  } catch (e) {
    return {
      error: true,
      message: 'Failed to get project source: unexpected error',
      data: {
        trace: e,
      },
    };
  }
};

export const create = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        project: createProject(),
        assets: [],
      },
    });
  });
};

export const upload = (ev: rq.RequestEvent, req: UploadReq) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!req.meta) {
      resolve({
        error: true,
        message: 'Unable to select asset to import: project data missing',
        data: {
          req,
        },
      });
    }

    if (!req.options.assetTypes || !req.options.assetTypes.length) {
      resolve({
        error: true,
        message: 'Unable to select asset to import: asset types not defined.',
        data: {
          req,
        },
      });
      return;
    }

    const config: OpenDialogOptions = {
      title: 'Import File',
    };

    if (req.options.assetTypes) {
      config.filters = fs.dialog.getAllowedAssets(req.options.assetTypes);

      if (!config.filters.length) {
        resolve({
          error: true,
          message: 'Unabled to select asset to import: asset type not supported.',
          data: {
            req,
          },
        });
        return;
      }
    }

    fs.dialog.open(ev, config).then((res) => {
      if (res.error) {
        resolve(res);
        return;
      }

      if (res.data.canceled) {
        resolve(res);
        return;
      }

      const ext = fs.getExt(res.data.filePath).replace('.', '');
      const name = fs.getBasename(res.data.filePath, ext);
      const type = fs.assetTypeByExt(ext);
      const infoRes = getProjectInfo(req.meta);

      if (infoRes.error) {
        log.error('getting project info failed', infoRes);
        resolve(infoRes);
        return;
      }

      switch (type) {
        case 'image':
          const dest = (infoRes.data.isNew || infoRes.data.uncommitted) ? fs.joinPath(fs.APP_PATHS.uploads, `${name}webp`) : fs.joinPath(infoRes.data.folder, 'assets', `${name}webp`);
          const destWorking = fs.joinPath(fs.APP_PATHS.temp, 'templates', 'assets', `${name}webp`);
          
          fs.asset.toWebp(res.data.filePath, dest).then((transformRes) => {
            if (transformRes.error) {
              log.error('asset conversion failed', transformRes);
              resolve(transformRes);
              return;
            }

            // copy file so it can be served to the canvas
            fs.copy(dest, destWorking).then((copyRes) => {
              if (copyRes.error) {
                log.error('asset copied failed', copyRes);
                resolve(copyRes);
                return;
              }

              resolve({
                error: false,
                data: {
                  filename: `${name}webp`,
                  type,
                  ext: 'webp',
                  size: transformRes.data.size,
                },
              });
            });
          });
          break;
      }

    }).catch((e) => {
      resolve({
        error: true,
        message: 'Failed to import file: unexpected error',
        data: {
          trace: e,
        },
      });
    });
  });
};

const writeProjectData = (projectData: ProjectData) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!projectData.meta.filename) {
      resolve({
        error: true,
        message: 'Unable to save project: malformed filename',
      });
      return;
    }

    const filename = projectData.meta.filename;

    fs.archive.compress(projectData)
      .then((compressedRes) => {
  
        if (compressedRes.error) {
          resolve(compressedRes);
          return;
        }
  
        const data = compressedRes.data.data;

        log.info('writing project data', filename);
        fs.fileWrite(filename, data).then((writeRes) => {
          if (writeRes.error) {
            resolve(writeRes);
            return;
          }

          resolve({
            error: false,
            data: {
              project: projectData,
            },
          });
        });
      })
      .catch((e) => {
        resolve({
          error: true,
          message: `Failed to create archive`,
          data: {
            trace: e,
          },
        })
      })
  });
}

export const save = (ev: rq.RequestEvent, data: ProjectData) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!data.meta.name) {
      resolve({
        error: true,
        message: 'Unable to save project: name required',
        data: {
          action: 'prompt-project-name',
        }
      });
      return;
    }

    const now = new Date().toISOString();
    const isNew = !data.meta.id;
    
    let projectFolder;
    let projectFile: ProjectFile;

    if (!isNew) {
      projectFolder = fs.getDirname(data.meta.filename || '');
    } else {
      projectFolder = getProjectPath(utils.str.toKebabCase(data.meta.name));
    }

    const projectFileName = fs.joinPath(projectFolder, projectMetaFilename);

    data.meta.updatedAt = now;
    data.meta.id = uuid();
    data.meta.filename = `${fs.joinPath(projectFolder, data.meta.id)}.gzip`;

    const projectExistsRes = fs.fileExistsSync(projectFileName);

    if (projectExistsRes.error) {
      resolve(projectExistsRes);
      return;
    }

    const hasProject = projectExistsRes.data.exists;

    if (isNew) {
      if (hasProject) {
        resolve({
          error: true,
          message: 'Unable to save project: project with that name already exits',
          data: {
            path: projectFileName,
          },
        });
        return;
      }

      projectFile = {
        createdAt: now,
        openedAt: now,
        updatedAt: now,
        assets: [],
        versions: [],
      };
    } else {
      if (!hasProject) {
        resolve({
          error: true,
          message: 'Unable to save project: project not found',
          data: {
            path: projectFileName,
          },
        });
        return;
      }

      const projectFileRead = fs.fileReadSync(projectFileName) as rq.ApiResult;

      if (projectFileRead.error) {
        resolve(projectFileRead);
        return;
      }

      projectFile = projectFileRead.data as ProjectFile;
      projectFile.updatedAt = now;
    }

    const meta = data.meta as ProjectMeta;

    projectFile.versions.unshift(meta);

    writeProjectData(data).then((writeDataRes) => {
      if (writeDataRes.error) {
        resolve(writeDataRes);
        return;
      }

      log.info('writing project file', projectFileName);
      fs.fileWrite(projectFileName, projectFile).then((writeFileRes) => {
        if (writeFileRes.error) {
          resolve(writeFileRes);
          return;
        }

        resolve({
          error: false,
          data: {
            project: data,
          },
        });
      });
    });
  });
};

export const publish = (ev: rq.RequestEvent, data: ProjectData) => {
  return new Promise<rq.ApiResult>((resolve) => {
    log.info('publishing project');

    fs.dialog.save(ev, {
      defaultPath: fs.joinPath(fs.APP_PATHS.downloads, utils.str.toScormCase(data.meta.name)),
      properties: ['showOverwriteConfirmation', 'createDirectory'],
      buttonLabel: 'Publish',
      message: 'Publish SCORM package',
    }).then((saveRes) => {

      if (saveRes.error) {
        resolve(saveRes);
        return;
      }

      if (saveRes.data.canceled) {
        resolve(saveRes);
        return;
      }

      if (!saveRes.data.filePath) {
        const missingPathError = {
          error: true,
          message: 'File path required',
          data: saveRes.data,
        };
        log.error(missingPathError);
        resolve(missingPathError);
        return;
      }

      fs.fileRemove(fs.APP_PATHS.publish).then((removeRes) => {
        if (removeRes.error) {
          resolve(removeRes);
          return;
        }

        const filepath = `${saveRes.data.filePath}.zip`;
        const projectFileName = fs.joinPath(fs.getDirname(data.meta.filename || ''), projectMetaFilename);
        
        fs.fileRead(projectFileName).then((readRes) => {
          if (readRes.error) {
            log.error(`Failed to get project meta file: ${projectFileName}`);
            resolve(readRes);
            return;
          }

          scorm(data, readRes.data.contents, filepath, fs.APP_PATHS.publish).then(resolve);
        });
      }).catch((e) => {
        const unexpectedError = {
          error: true,
          message: 'Failed to publish: unexpected error',
          data: {
            trace: e,
          },
        };

        log.error(unexpectedError)
        resolve(unexpectedError);
      });
    });
  });
};

export const list = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        listed: true,
      },
    });
  });
};

export const open = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        opened: true,
      },
    });
  });
};

export const API: ProjectsApi = {
  create: {
    name: '/projects/create',
    type: 'invoke',
    fn: create,
  },
  upload: {
    name: '/projects/upload',
    type: 'invoke',
    fn: upload,
  },
  save: {
    name: '/projects/save',
    type: 'invoke',
    fn: save,
  },
  publish: {
    name: '/projects/publish',
    type: 'invoke',
    fn: publish,
  },
  list: {
    name: '/projects/list',
    type: 'invoke',
    fn: list,
  },
  open: {
    name: '/projects/open',
    type: 'invoke',
    fn: open,
  },
};

export const init = () => {
  rq.registerEndpointAll(API);
};

export default {
  create,
  upload,
  save,
  publish,
  list,
  open,
};
