import { ProjectsApi, ProjectData } from './projects.types';
import { createProject } from './project.data';
import { rq, fs } from '../../services';
import * as utils from '../../utils';

const getProjectPath = (name) => {
  return fs.joinPath(fs.APP_PATHS.save, name);
};

export const create = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        project: createProject(),
      },
    });
  });
};

export const importAsset = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        imported: true,
      },
    });
  });
};

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

    const projectPath = getProjectPath(utils.str.toKebabCase(data.meta.name));

    // check if folder exists

    fs.archive.compress(data).then((compressedRes) => {
      console.log('saving', projectPath);
      console.log('data', compressedRes);

      if (compressedRes.error) {
        resolve(compressedRes);
        return;
      }

      // get/create project
      /*
        versions: {
          date: datestamp (now),
          data: compresseddata
        }
      */

      // write project

      resolve({
        error: false,
        data: {
          saved: true,
        },
      });
    });
  });
};

export const publish = (ev: rq.RequestEvent) => {
  return new Promise<rq.ApiResult>((resolve) => {

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
  importAsset: {
    name: '/projects/import',
    type: 'invoke',
    fn: importAsset,
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
  importAsset,
  save,
  publish,
  list,
  open,
};
