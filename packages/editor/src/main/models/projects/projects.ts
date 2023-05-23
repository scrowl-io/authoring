import { OpenDialogOptions, IpcMainInvokeEvent } from 'electron';
const { BrowserWindow } = require('electron');

import { v4 as uuid } from 'uuid';
import {
  ProjectsApi,
  ProjectData,
  ProjectFile,
  ProjectMeta,
  ProjectsReqCreate,
  ProjectsReqUpload,
  ProjectsReqSave,
  ProjectsReqPreviewAsset,
  ProjectAsset,
  ProjectsReqPreviewProject,
  ProjectsReqList,
} from './projects.types';
import { Templates } from '../';
import { set as setSetting } from '../settings';
import { blueprints } from './blueprints';
import { rq, fs, log, mu } from '../../services';
import * as utils from '../../utils';
import { scorm } from './project-publisher';
import { preview as createPreview } from './project-preview';

const PROJECT_PATHS = {
  blueprints: fs.getSourcePath('assets', 'blueprints'),
};

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
    } else if (noId && !noName) {
      folder = getProjectPath(utils.str.toKebabCase(meta.name));
    } else if (noId && noName) {
      return {
        error: false,
        data: {
          isNew: true,
          uncommitted: true,
          exists: false,
        },
      };
    }

    const fileName = fs.joinPath(folder, projectMetaFilename);
    const existsRes = fs.fileExistsSync(fileName);

    if (existsRes.error) {
      return existsRes;
    }

    if (!existsRes.data.exists) {
      return {
        error: false,
        data: {
          isNew: true,
          uncommitted: true,
          fileName,
          exists: false,
          folder,
        },
      };
    }

    const read = fs.fileReadSync(fileName) as rq.ApiResult;

    if (read.error) {
      return read;
    }

    info = read.data.contents as ProjectFile;

    return {
      error: false,
      data: {
        isNew: noId,
        uncommitted: noName,
        fileName,
        exists: existsRes.data.exists,
        folder,
        info,
      },
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

export const create = (ev: rq.RequestEvent, req: ProjectsReqCreate) => {
  const copyAsset = (assetFilename: string) => {
    return new Promise<rq.ApiResult>((resolve) => {
      try {
        const sourcePath = fs.joinPath(PROJECT_PATHS.blueprints, assetFilename);
        const ext = fs.getExt(assetFilename).replace('.', '');
        const name = fs.getBasename(assetFilename, ext).replace('.', '');
        const type = fs.assetTypeByExt(ext);
        let dest = fs.joinPath(fs.APP_PATHS.uploads, `${name}.`);

        switch (type) {
          case 'image':
            dest += 'webp';

            fs.asset.toWebp(sourcePath, dest).then((transformRes) => {
              if (transformRes.error) {
                log.error('asset conversion failed', transformRes);
                resolve(transformRes);
                return;
              }

              resolve({
                error: false,
                data: {
                  title: name,
                  filename: `./assets/${name}.webp`,
                  type,
                  ext: 'webp',
                  size: transformRes.data.size,
                  sourceExt: ext,
                  sourceFilename: assetFilename,
                },
              });
            });
            break;
          default:
            dest += ext;

            fs.copy(sourcePath, dest).then((copyRes) => {
              if (copyRes.error) {
                log.error('blueprint asset copy failed', copyRes);
                resolve(copyRes);
                return;
              }

              const statsRes = fs.fileStatsSync(sourcePath);

              if (statsRes.error) {
                resolve(statsRes);
                return;
              }

              resolve({
                error: false,
                data: {
                  title: name,
                  filename: `./assets/${name}.${ext}`,
                  type,
                  ext,
                  size: statsRes.data.stats.size,
                  sourceExt: ext,
                  sourceFilename: assetFilename,
                },
              });
            });
            break;
        }
      } catch (e) {
        log.error('Failed to copy asset during create: Unexpected error', e);
        resolve({
          error: true,
          message: 'Failed to copy asset during create: Unexpected error',
          data: {
            trace: e,
          },
        });
        return;
      }
    });
  };

  return new Promise<rq.ApiResult>((resolve) => {
    const project = blueprints.get(req.blueprint);

    // convert asset list
    // put assets into temp folder
    const uniqueAssets = new Set<string>();

    const scanContent = (content) => {
      try {
        for (const [key, item] of Object.entries(content)) {
          const input = item as Templates.InputProps;

          switch (input.type) {
            case 'Asset':
              if (input.value) {
                uniqueAssets.add(input.value);
              }
              break;
            case 'Fieldset':
              scanContent(input.content);
              break;
          }
        }
      } catch (e) {
        log.error('Failed to scan blueprint for assets: unexpected error', e);
      }
    };

    project.slides?.forEach((slide) => {
      scanContent(slide.template.content);
    });

    const assetCopyPromises: Array<Promise<rq.ApiResult>> = [];
    const assets: Array<ProjectAsset> = [];
    const assetsMap = new Map();

    const updateContent = (content) => {
      try {
        for (const [key, item] of Object.entries(content)) {
          const input = item as Templates.InputProps;

          switch (input.type) {
            case 'Asset':
              if (input.value) {
                input.value = assetsMap.get(input.value);
              }
              break;
            case 'Fieldset':
              updateContent(input.content);
              break;
          }
        }
      } catch (e) {
        log.error(
          'Failed to update content during create: unexpected error',
          e
        );
      }
    };

    uniqueAssets.forEach((asset) => {
      assetCopyPromises.push(copyAsset(asset));
    });
    const assetList = Array.from(uniqueAssets);

    Promise.allSettled(assetCopyPromises).then((copiesRes) => {
      copiesRes.forEach((copyRes, idx) => {
        if (copyRes.status === 'rejected') {
          log.error(`failed to copy asset ${assetList[idx]}`);
          return;
        }

        if (copyRes.value.error) {
          log.error(`failed to copy asset ${assetList[idx]}`, copyRes.value);
          return;
        }

        const asset = copyRes.value.data as ProjectAsset;

        assets.push(asset);
        assetsMap.set(assetList[idx], asset.filename);
      });

      project.slides?.forEach((slide) => {
        updateContent(slide.template.content);
      });

      resolve({
        error: false,
        data: {
          project,
          assets,
        },
      });
    });
  });
};

export const upload = (ev: rq.RequestEvent, req: ProjectsReqUpload) => {
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

    const uploadComplete = (result) => {
      if (result.error) {
        resolve(result);
        return;
      }

      const infoRes = getProjectInfo(req.meta);

      if (infoRes.error) {
        resolve(infoRes);
        return;
      }

      let info: ProjectFile;

      info = infoRes.data.info;

      if (info && info.assets) {
        info.assets = info.assets.concat(result.data);
      }

      resolve(result);
      fs.fileWrite(infoRes.data.fileName, info).then((writeFileRes) => {
        if (writeFileRes.error) {
          log.error(writeFileRes);
          resolve(writeFileRes);
          return;
        }
        resolve(result);
      });
    };

    const config: OpenDialogOptions = {
      title: 'Import File',
      properties: ['openFile'],
    };

    if (req.options.assetTypes) {
      config.filters = fs.dialog.getAllowedAssets(req.options.assetTypes);

      if (!config.filters.length) {
        uploadComplete({
          error: true,
          message:
            'Unabled to select asset to import: asset type not supported.',
          data: {
            req,
          },
        });
        return;
      }
    } else {
      config.filters = fs.dialog.getAllowedAssets(['image', 'document']);
    }

    fs.dialog
      .open(ev, config)
      .then((res) => {
        if (res.error) {
          uploadComplete(res);
          return;
        }

        if (res.data.canceled) {
          uploadComplete(res);
          return;
        }

        let dest: string;
        let destWorking: string;
        const ext = fs.getExt(res.data.filePath).replace('.', '').toLowerCase();

        const name = fs
          .getBasename(res.data.filePath, ext)
          .replace('.', '')
          .replace(/ /g, '_');

        const type = fs.assetTypeByExt(ext);
        const infoRes = getProjectInfo(req.meta);

        if (infoRes.error) {
          log.error('getting project info failed', infoRes);
          uploadComplete(infoRes);
          return;
        }

        switch (type) {
          case 'image':
            dest =
              infoRes.data.isNew || infoRes.data.uncommitted
                ? fs.joinPath(fs.APP_PATHS.uploads, `${name}.webp`)
                : fs.joinPath(infoRes.data.folder, 'assets', `${name}.webp`);
            destWorking = fs.joinPath(
              fs.APP_PATHS.temp,
              'templates',
              'assets',
              `${name}.webp`
            );

            rq.send(API.uploadProgress.name, {
              type: 'start',
              filename: name,
              message: 'Optimizing image...',
              steps: 2,
              step: 1,
              stats: {
                completed: 50,
                progress: 50,
                total: 100,
              },
            });

            fs.asset.toWebp(res.data.filePath, dest).then((transformRes) => {
              if (transformRes.error) {
                log.error('asset conversion failed', transformRes);
                uploadComplete(transformRes);
                return;
              }

              rq.send(API.uploadProgress.name, {
                type: 'start',
                filename: name,
                message: 'Adding image...',
                steps: 2,
                step: 2,
                stats: {
                  completed: 0,
                  progress: 0,
                  total: 0,
                },
              });

              const sendProgressUpdateImage = (completed, progress, total) => {
                rq.send(API.uploadProgress.name, {
                  type: 'update',
                  filename: name,
                  message: 'Adding image...',
                  steps: 2,
                  step: 2,
                  stats: {
                    completed,
                    progress,
                    total,
                  },
                });
              };

              fs.progressWrite(dest, destWorking, sendProgressUpdateImage).then(
                (copyRes) => {
                  if (copyRes.error) {
                    log.error('asset copied failed', copyRes);
                    uploadComplete(copyRes);
                    return;
                  }

                  uploadComplete({
                    error: false,
                    data: {
                      title: name,
                      filename: `./assets/${name}.webp`,
                      type,
                      ext: 'webp',
                      size: transformRes.data.size,
                      sourceExt: ext,
                      sourceFilename: `${name}.${ext}`,
                    },
                  });
                }
              );
            });
            break;
          case undefined:
            const undefinedError = {
              error: true,
              message: 'Unable to upload file: malformed extension',
            };
            uploadComplete(undefinedError);
            break;
          default:
            dest =
              infoRes.data.isNew || infoRes.data.uncommitted
                ? fs.joinPath(fs.APP_PATHS.uploads, `${name}.${ext}`)
                : fs.joinPath(infoRes.data.folder, 'assets', `${name}.${ext}`);
            destWorking = fs.joinPath(
              fs.APP_PATHS.temp,
              'templates',
              'assets',
              `${name}.${ext}`
            );

            rq.send(API.uploadProgress.name, {
              type: 'start',
              filename: name,
              message: `Adding ${type}...`,
              steps: 1,
              step: 1,
              stats: {
                completed: 0,
                progress: 0,
                total: 0,
              },
            });

            const sendProgressUpdate = (completed, progress, total) => {
              rq.send(API.uploadProgress.name, {
                type: 'update',
                filename: name,
                message: `Adding ${type}...`,
                steps: 1,
                step: 1,
                stats: {
                  completed,
                  progress,
                  total,
                },
              });
            };
            const copyPaths = [
              `${res.data.filePath} to ${dest}`,
              `${res.data.filePath} to ${destWorking}`,
            ];
            const copyPromises = [
              fs.copy(res.data.filePath, dest),
              fs.progressWrite(
                res.data.filePath,
                destWorking,
                sendProgressUpdate
              ),
            ];

            Promise.allSettled(copyPromises).then((copyAllRes) => {
              let isError = false;
              let errorRes;

              copyAllRes.forEach((copyRes, idx) => {
                if (copyRes.status === 'rejected') {
                  log.error(`failed to copy: ${copyPaths[idx]}`);
                  isError = true;
                  return;
                }

                if (copyRes.value.error) {
                  isError = true;
                  errorRes = copyRes.value;
                  log.error(`failed to copy: ${copyPaths[idx]}`);
                  return;
                }
              });

              if (isError) {
                uploadComplete(errorRes);
                return;
              }

              const statsRes = fs.fileStatsSync(res.data.filePath);

              if (statsRes.error) {
                uploadComplete(statsRes);
                return;
              }

              uploadComplete({
                error: false,
                data: {
                  title: name,
                  filename: `./assets/${name}.${ext}`,
                  type,
                  ext,
                  size: statsRes.data.stats.size,
                  sourceExt: ext,
                  sourceFilename: `${name}.${ext}`,
                },
              });
            });
            break;
        }
      })
      .catch((e) => {
        uploadComplete({
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

    fs.archive
      .compress(projectData)
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
        });
      });
  });
};

export const save = (ev: rq.RequestEvent, { data, assets }: ProjectsReqSave) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!data.meta.name) {
      resolve({
        error: true,
        message: 'Unable to save project: name required',
        data: {
          action: 'prompt-project-name',
        },
      });
      return;
    }

    try {
      const isNew = !data.meta.id;
      const now = new Date().toISOString();
      const meta = data.meta as ProjectMeta;
      const infoRes = getProjectInfo(meta);

      if (infoRes.error) {
        resolve(infoRes);
        return;
      }

      if (isNew && infoRes.data.exists) {
        resolve({
          error: true,
          message: 'Unable to save.\nA project with that name already exists',
          data: {
            data,
            assets,
          },
        });
      }

      let info: ProjectFile;

      if (!infoRes.data.isNew) {
        info = infoRes.data.info;
      } else {
        info = {
          createdAt: now,
          openedAt: now,
          updatedAt: now,
          assets: [],
          versions: [],
        };
      }

      meta.updatedAt = now;
      meta.id = uuid();
      meta.filename = `${fs.joinPath(infoRes.data.folder, meta.id)}.json.gz`;
      info.versions.unshift(meta);
      info.assets = assets || [];

      const updateSettings = () => {
        return new Promise<rq.ApiResult>((resolveSettings) => {
          const settingsPayload = {
            key: 'lastUsedAt',
            value: data.meta.updatedAt,
          };

          setSetting(ev, settingsPayload).then(
            (settingRes) => {
              if (settingRes.error) {
                log.error(settingRes);
              }

              resolveSettings({
                error: false,
                data: {
                  updated: true,
                },
              });
            }
          );
        });
      };

      const handleRecentProjectsUpdate = () => {
        mu.rebuildMenu().then((updateRes) => {
          if (updateRes.error) {
            resolve(updateRes);
            return;
          }

          resolve({
            error: false,
            data: {
              project: data,
              assets,
            },
          });
        });
      };

      writeProjectData(data).then((writeDataRes) => {
        if (writeDataRes.error) {
          resolve(writeDataRes);
          return;
        }

        log.info('writing project file', infoRes.data.fileName);
        fs.fileWrite(infoRes.data.fileName, info).then((writeFileRes) => {
          if (writeFileRes.error) {
            log.error(writeFileRes);
            resolve(writeFileRes);
            return;
          }

          if (infoRes.data.exists || !assets || !assets.length) {
            updateSettings().then(handleRecentProjectsUpdate);
            return;
          }

          fs.copy(
            fs.APP_PATHS.uploads,
            fs.joinPath(infoRes.data.folder, 'assets')
          ).then((copyRes) => {
            if (copyRes.error) {
              resolve(copyRes);
              return;
            }

            updateSettings().then(handleRecentProjectsUpdate);
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to save proejct: unexpected error',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const publish = (ev: rq.RequestEvent, data: ProjectData) => {
  const updateSettings = () => {
    return new Promise<rq.ApiResult>((resolveUpdate) => {
      const now = new Date().toISOString();
      const settingsPayload = {
        key: 'lastPublishedAt',
        value: now,
      };

      setSetting(ev, settingsPayload).then((settingRes) => {
        if (settingRes.error) {
          log.error(settingRes);
        }

        resolveUpdate({
          error: false,
          data: {
            updated: true,
            lastPublishedAt: now,
          },
        });
      });
    });
  };

  const updateProjectInfo = (
    info: ProjectFile,
    infoSource: string,
    publishedFilename: string
  ) => {
    return new Promise<rq.ApiResult>((resolveUpdate) => {
      info.lastPublishedFilename = publishedFilename;

      fs.fileWrite(infoSource, info).then((writeFileRes) => {
        if (writeFileRes.error) {
          log.error(writeFileRes);
          resolveUpdate(writeFileRes);
          return;
        }

        resolveUpdate({
          error: false,
          data: {
            info,
          },
        });
      });
    });
  };

  return new Promise<rq.ApiResult>((resolve) => {
    log.info('publishing project');

    const meta = data.meta as ProjectMeta;
    const infoRes = getProjectInfo(meta);

    if (infoRes.error) {
      log.error('getting project info failed', infoRes);
      resolve(infoRes);
      return;
    }

    const info = infoRes.data.info as ProjectFile;

    const defaultPath = data.scorm.name
      ? fs.joinPath(
          fs.APP_PATHS.downloads,
          utils.str.toSnakeCase(data.scorm.name)
        )
      : fs.joinPath(
          fs.APP_PATHS.downloads,
          utils.str.toSnakeCase(data.meta.name)
        );

    fs.dialog
      .save(ev, {
        defaultPath,
        properties: ['showOverwriteConfirmation', 'createDirectory'],
        buttonLabel: 'Publish',
        message: 'Publish SCORM package',
      })
      .then((saveRes) => {
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

        fs.fileRemove(fs.APP_PATHS.publish)
          .then((removeRes) => {
            if (removeRes.error) {
              resolve(removeRes);
              return;
            }

            const extName = fs.getExt(saveRes.data.filePath);
            const savePath = saveRes.data.filePath.replace(extName, '');
            const filepath = `${savePath}.zip`;
            const projectFileName = fs.joinPath(
              fs.getDirname(data.meta.filename || ''),
              projectMetaFilename
            );

            fs.fileRead(projectFileName).then((readRes) => {
              if (readRes.error) {
                log.error(
                  `Failed to get project meta file: ${projectFileName}`
                );
                resolve(readRes);
                return;
              }

              const scormFilePath = utils.str.toScormCase(
                fs.getBasename(saveRes.data.filePath, `.${extName}`)
              );

              scorm(
                data,
                readRes.data.contents,
                filepath,
                fs.APP_PATHS.publish,
                scormFilePath
              ).then((scormRes) => {
                if (scormRes.error) {
                  resolve(scormRes);
                  return;
                }

                updateSettings().then((updateRes) => {
                  if (updateRes.error) {
                    resolve(updateRes);
                    return;
                  }

                  scormRes.data.lastPublishedAt =
                    updateRes.data.lastPublishedAt;

                  updateProjectInfo(info, infoRes.data.fileName, filepath).then(
                    (infoUpdateRes) => {
                      if (infoUpdateRes.error) {
                        resolve(infoUpdateRes);
                        return;
                      }

                      resolve(scormRes);
                    }
                  );
                });
              });
            });
          })
          .catch((e) => {
            const unexpectedError = {
              error: true,
              message: 'Failed to publish: unexpected error',
              data: {
                trace: e,
              },
            };

            log.error(unexpectedError);
            resolve(unexpectedError);
          });
      });
  });
};

export const list = (ev: rq.RequestEvent, req: ProjectsReqList) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.drainProjectFiles(req.limit).then((drainRes) => {
      if (drainRes.error) {
        resolve(drainRes);
        return;
      }

      const filePromises: Array<Promise<rq.ApiResult>> = [];

      drainRes.data.filepaths.forEach((filepath) => {
        filePromises.push(fs.fileRead(filepath));
      });

      Promise.allSettled(filePromises).then((filePromiseRes) => {
        let projects: Array<ProjectFile> = [];

        filePromiseRes.forEach((fileRes, idx) => {
          if (fileRes.status === 'rejected') {
            log.error(`failed to open: ${drainRes.data.filepaths[idx]}`);
            return;
          }

          if (fileRes.value.error) {
            log.error(
              'failed to open: ${drainRes.data.filepaths[idx]}',
              fileRes.value
            );
            return;
          }

          projects.push(fileRes.value.data.contents);
        });

        resolve({
          error: false,
          data: {
            projects,
          },
        });
      });
    });
  });
};

export const open = (ev: rq.RequestEvent, project: ProjectMeta) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.archive.uncompress(project.filename).then((res) => {
      if (res.error) {
        resolve(res);
        return;
      }

      const infoRes = getProjectInfo(project);

      if (infoRes.error || !infoRes.data.info) {
        resolve(infoRes);
        return;
      }

      const pathName = fs.joinPath(fs.getDirname(project.filename), 'assets');

      fs.fileExists(pathName).then((existsRes) => {
        if (existsRes.error) {
          resolve(existsRes);
          return;
        }

        if (!existsRes.data.exists) {
          resolve({
            error: false,
            data: {
              project: JSON.parse(res.data.contents),
            },
          });
          return;
        } else {
          fs.copy(pathName, fs.APP_PATHS.uploads).then((copyRes) => {
            if (copyRes.error) {
              resolve(copyRes);
              return;
            }

            resolve({
              error: false,
              data: {
                project: JSON.parse(res.data.contents),
                file: infoRes.data.info,
              },
            });
          });
        }
      });
    });
  });
};

export const previewAsset = (ev: rq.RequestEvent, req: ProjectsReqPreviewAsset) => {
  return new Promise<rq.ApiResult>((resolve) => {
    let errorMsg = '';
    const event = ev as IpcMainInvokeEvent;
    const win = BrowserWindow.fromWebContents(event.sender);

    if (!win) {
      errorMsg = 'Unable to preview asset: window not found';
      log.error(errorMsg);
      resolve({
        error: true,
        message: errorMsg,
        data: {
          req,
        },
      });
      return;
    }

    try {
      const infoRes = getProjectInfo(req.meta);
      const src =
        infoRes.data.isNew || infoRes.data.uncommitted
          ? fs.joinPath(fs.APP_PATHS.uploads, req.asset.filename)
          : fs.joinPath(infoRes.data.folder, 'assets', req.asset.filename);

      win.previewFile(src);

      resolve({
        error: false,
        data: {
          req,
        },
      });
    } catch (e) {
      errorMsg = 'Unable to preview asset: unexpected error';
      log.error(errorMsg);
      resolve({
        error: true,
        message: errorMsg,
        data: {
          trace: e,
          req,
        },
      });
    }
  });
};

export const previewProject = (ev: rq.RequestEvent, req: ProjectsReqPreviewProject) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const event = ev as IpcMainInvokeEvent;
    const win = BrowserWindow.fromWebContents(event.sender);

    if (!win) {
      const errorMsg = 'Unable to preview: window not found';
      log.error(errorMsg);
      resolve({
        error: true,
        message: errorMsg,
        data: {
          req,
        },
      });
      return;
    }

    const projectMeta = req.project.meta as ProjectMeta;
    const infoRes = getProjectInfo(projectMeta);

    if (infoRes.error) {
      resolve(infoRes);
      return;
    }

    let assetSrc = '';
    let meta: ProjectFile = {
      createdAt: '',
      openedAt: '',
      updatedAt: '',
      versions: [],
      assets: [],
    };

    if (infoRes.data.isNew || infoRes.data.uncommitted) {
      assetSrc = fs.APP_PATHS.uploads;
      meta.assets = req.assets;
    } else {
      assetSrc = fs.joinPath(infoRes.data.folder, 'assets');
      meta = {
        ...infoRes.data.info,
        assets: req.assets,
      };
    }

    createPreview(req.project, meta, assetSrc, req.type, req.id).then((res) => {
      if (res.error) {
        resolve(res);
        return;
      }

      const url = res.data.url;
      const [winWidth, winHeight] = win.getSize();
      const padding = 100;
      const previewWin = new BrowserWindow({
        center: true,
        width: Math.min(winWidth - padding, 1200),
        height: winHeight - padding,
        minWidth: 1024,
        minHeight: 600,
        parent: win,
        closable: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          spellcheck: false,
          sandbox: true,
          disableDialogs: true,
        },
      });

      previewWin.on('enter-html-full-screen', async () => {
        // We cannot require the screen module until the app is ready.
        const { screen } = require('electron');
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;
        const winBounds = win.getContentBounds();
        const previewWinBounds = previewWin.getContentBounds();

        // Speeds up the process
        win.setOpacity(0);
        win.setContentBounds({ x: 0, y: 0, width, height }, false);
        win.setSimpleFullScreen(true);

        previewWin.once('leave-html-full-screen', async () => {
          win.setSimpleFullScreen(false);

          win.setContentBounds(winBounds, false);

          // Seems to take a little while to get it focused
          for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            win.focus();
            previewWin.setContentBounds(previewWinBounds, false);
            win.setOpacity(1);
          }
        });
      });

      previewWin.webContents.session.clearCache();
      previewWin.loadURL(url);

      previewWin.once('closed', () => {
        resolve(res);
      });
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
  uploadProgress: {
    name: '/projects/upload/progress',
    type: 'send',
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
  previewAsset: {
    name: '/projects/preview-asset',
    type: 'invoke',
    fn: previewAsset,
  },
  preview: {
    name: '/projects/preview',
    type: 'invoke',
    fn: previewProject,
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
