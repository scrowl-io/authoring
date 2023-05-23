import {
  MenuEndpoints,
  ContextMenuItem,
  MenuItemEndpointFile,
  MenuItemEndpointPreview,
  PreviewTypes,
  MenuItemEndpointOutline,
  MenuItemEndpointPublish,
  ContextMenuPayload
} from './menu.types';
import { rq } from '../../services';
import { Elem, ELEM_ALIGNMENT } from '../../utils';
import { ContextMenu } from '../../components';

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
  open: '/preview/open',
  update: '/preview/update',
};

const ENDPOINTS_OUTLINE: MenuItemEndpointOutline = {
  addSlide: '/outline/slide/add',
  addLesson: '/outline/lesson/add',
  addModule: '/outline/module/add',
  duplicateSlide: '/outline/slide/duplicate',
  renameSlide: '/outline/slide/rename',
  removeSlide: '/outline/slide/remove',
};

const ENDPOINTS_PUBLISH: MenuItemEndpointPublish = {
  publish: '/publish',
  publishQuick: '/publish/quick',
};

export const contextMenu = (
  ev: React.MouseEvent,
  items: Array<ContextMenuItem>,
  payload?: {
    [key: string]: any;
  },
  options?: {
    alignment?: ELEM_ALIGNMENT,
    offset?: [number, number],
  }
) => {
  Elem.stopEvent(ev);

  const target = ev.target as HTMLElement;
  const position = !options || !options.alignment ? [ev.clientX, ev.clientY] : Elem.getPosition(target, options);

  return new Promise<rq.ApiResult>((resolve) => {
    const menuItemMap = {};
    const menuItems = items.map((item, idx) => {
      const { click, ...data } = item;
      const id = item.id || idx.toString();

      menuItemMap[id] = click;
      data.id = id;
      return data;
    });
    const contextMenuPayload = { menuItems, position, payload } as unknown as rq.JSON_DATA;

    rq.invoke(ENDPOINTS.contextMenu, contextMenuPayload)
      .then((result) => {
        if (!result.error) {
          const id = result.data.item.id;

          menuItemMap[id](result.data);
          resolve(result);
          return;
        }

        
        switch (result.data.action) {
          case 'use-component':
            const menuConfig = contextMenuPayload as unknown as ContextMenuPayload;

            ContextMenu.create(target, menuConfig).then((componentResult) => {
              if (componentResult.error) {
                console.error(componentResult);
                resolve(componentResult);
                return;
              }

              if (componentResult.data.canceled) {
                resolve(componentResult);
                return;
              }

              if (!componentResult.data.item) {
                console.warn('context menu did not return a selected item and was not canceled');
                resolve(componentResult);
                return;
              }

              const id = componentResult.data.item.id;

              menuItemMap[id](componentResult.data.item);
              resolve(componentResult);
            });
            break;
          default:
            console.error(result);
            resolve(result);
            break
        }
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
    rq.invoke(ENDPOINTS.toggleMenu, { id, isEnabled }).then((result) => {
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
  'preview-menu-open',
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

export const onProjectCreate = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_FILE.create, listener);
};

export const offProjectCreate = () => {
  rq.offAll(ENDPOINTS_FILE.create);
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

export const onPreviewOpen = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PREVIEW.open, listener);
}

export const offPreviewOpen = () => {
  rq.offAll(ENDPOINTS_PREVIEW.open);
};

export const updatePreviewMenu = (type: PreviewTypes) => {
  return rq.invoke(ENDPOINTS_PREVIEW.update, { type });
};

export const onOutlineAddSlide = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.addSlide, listener);
};

export const offOutlineAddSlide = () => {
  rq.offAll(ENDPOINTS_OUTLINE.addSlide);
};

export const onOutlineAddLesson = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.addLesson, listener);
};

export const offOutlineAddLesson = () => {
  rq.offAll(ENDPOINTS_OUTLINE.addLesson);
};

export const onOutlineAddModule = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.addModule, listener);
};

export const offOutlineAddModule = () => {
  rq.offAll(ENDPOINTS_OUTLINE.addModule);
};

export const onOutlineDuplicateSlide = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.duplicateSlide, listener);
};

export const offOutlineDuplicateSlide = () => {
  rq.offAll(ENDPOINTS_OUTLINE.duplicateSlide);
};

export const onOutlineRenameSlide = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.renameSlide, listener);
};

export const offOutlineRenameSlide = () => {
  rq.offAll(ENDPOINTS_OUTLINE.renameSlide);
};

export const onOutlineRemoveSlide = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_OUTLINE.removeSlide, listener);
};

export const offOutlineRemoveSlide = () => {
  rq.offAll(ENDPOINTS_OUTLINE.removeSlide);
};

export const onPublish = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PUBLISH.publish, listener);
};

export const offPublish = () => {
  rq.offAll(ENDPOINTS_PUBLISH.publish);
};

export const onPublishQuick = (listener: rq.Listener) => {
  rq.on(ENDPOINTS_PUBLISH.publishQuick, listener);
};

export const offPublishQuick = () => {
  rq.offAll(ENDPOINTS_PUBLISH.publishQuick);
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
  onPreviewOpen,
  offPreviewOpen,
  updatePreviewMenu,
  onOutlineAddSlide,
  offOutlineAddSlide,
  onOutlineAddLesson,
  offOutlineAddLesson,
  onOutlineAddModule,
  offOutlineAddModule,
  onOutlineDuplicateSlide,
  offOutlineDuplicateSlide,
  onOutlineRenameSlide,
  offOutlineRenameSlide,
  onOutlineRemoveSlide,
  offOutlineRemoveSlide,
  onPublish,
  offPublish,
  onPublishQuick,
  offPublishQuick
};
