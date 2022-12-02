import {
  MenuEndpoints,
  ContextMenuItem,
  ContextMenuPosition,
  MenuItemEndpointFile,
  MenuItemEndpointPreview
} from './menu.types';
import { rq } from '../../services';

const ENDPOINTS: MenuEndpoints = {
  contextMenu: '/context-menu',
  toggleMenu: '/toggle-menu',
};

const ENDPOINTS_FILE: MenuItemEndpointFile = {
  create: '/file/create',
  save: '/file/save',
  open: '/file/open',
  close: '/file/close',
};

const ENDPOINTS_PREVIEW: MenuItemEndpointPreview = {
  slide: '/preview/slide',
  lesson: '/preview/lesson',
  module: '/preview/module',
  project: '/preview/project',
};

export const contextMenu = (
  items: Array<ContextMenuItem>,
  position?: ContextMenuPosition | number[],
  ...args
) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const menuItemMap = {};
    const menuItems = items.map((item, idx) => {
      const { click, ...data } = item;
      const id = item.id || idx.toString();

      menuItemMap[id] = click;
      data.id = id;
      return data;
    });

    rq.invoke(ENDPOINTS.contextMenu, menuItems, position, ...args)
      .then((result) => {
        if (!result.error) {
          const id = result.data.item.id;

          menuItemMap[id](result.data);
        }

        resolve(result);
      })
      .catch((e) => {
        console.error('Context Menu Failed', e);
        resolve({
          error: true,
          message: 'Context Menu Failed',
          data: {
            trace: e,
          },
        });
      });
  });
};

export const toggleMenu = (id: Array<string> | string, isEnabled?: boolean) => {
  return new Promise<rq.ApiResult>((resolve) => {
    rq.invoke(ENDPOINTS.toggleMenu, id, isEnabled).then((result) => {
      resolve(result);
    }).
    catch((e) => {
      console.error('Toggling Menu Failed', e);
      resolve({
        error: true,
        message: 'Context Menu Failed',
        data: {
          trace: e,
        },
      });
    });
  });
};

const projectMenuIds = [
  'file-menu-save',
  'file-menu-close',
  'edit-menu-undo',
  'edit-menu-redo',
  'edit-menu-cut',
  'edit-menu-copy',
  'edit-menu-paste',
  'edit-menu-delete',
  'edit-menu-select-all',
  'outline-menu-add-slide',
  'outline-menu-add-lesson',
  'outline-menu-add-module',
  'outline-menu-dup-slide',
  'outline-menu-rename-slide',
  'outline-menu-delete-slide',
  'preview-menu-slide',
  'preview-menu-lesson',
  'preview-menu-module',
  'preview-menu-project',
  'publish-menu-advanced',
  'publish-menu-quick',
];

export const disableProjectActions = () => {
  return toggleMenu(projectMenuIds, false);
};

export const enableProjectActions = () => {
  return toggleMenu(projectMenuIds, true);
};

export const onProjectSave = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_FILE.save, listener);
};

export const offProjectSave = () => {
  rq.offAll(ENDPOINTS_FILE.save);
};

export const onProjectOpen = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_FILE.open, listener);
};

export const offProjectOpen = () => {
  rq.offAll(ENDPOINTS_FILE.open);
};

export const onProjectClose = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_FILE.close, listener);
};

export const offProjectClose = () => {
  rq.offAll(ENDPOINTS_FILE.close);
};

export const onPreviewSlide = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PREVIEW.slide, listener);
}

export const offPreviewSlide = () => {
  rq.offAll(ENDPOINTS_PREVIEW.slide);
};

export const onPreviewLesson = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PREVIEW.lesson, listener);
}

export const offPreviewLesson = () => {
  rq.offAll(ENDPOINTS_PREVIEW.lesson);
};

export const onPreviewModule = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PREVIEW.module, listener);
}

export const offPreviewModule = () => {
  rq.offAll(ENDPOINTS_PREVIEW.module);
};

export const onPreviewProject = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PREVIEW.project, listener);
}

export const offPreviewProject = () => {
  rq.offAll(ENDPOINTS_PREVIEW.project);
};

export default {
  contextMenu,
  toggleMenu,
  disableProjectActions,
  enableProjectActions,
  onProjectSave,
  offProjectSave,
  onProjectOpen,
  offProjectOpen,
  onProjectClose,
  offProjectClose,
  onPreviewSlide,
  offPreviewSlide,
  onPreviewLesson,
  offPreviewLesson,
  onPreviewModule,
  offPreviewModule,
  onPreviewProject,
  offPreviewProject
};
