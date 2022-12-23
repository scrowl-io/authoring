import { MenuItemConstructorOptions, Menu } from 'electron';
import { rq } from '../';

export interface MenuApiContextMenu
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/context-menu';
}

export interface MenuApiToggleMenu extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/toggle-menu';
}

export type MenuApi = Partial<{
  contextMenu: MenuApiContextMenu;
  toggleMenu: MenuApiToggleMenu;
}>;

export type MenuEndpoints = {
  contextMenu: MenuApiContextMenu['name'];
  toggleMenu: MenuApiToggleMenu['name'];
};

export type ContextMenuItem = MenuItemConstructorOptions;

export type ContextMenuPosition = [number, number];

export type MenuItemProps = {
  API?: rq.RegisterEndpoints;
  register?: () => void;
  create?: (isMac: boolean, isRebuild: boolean) => MenuItemConstructorOptions;
  asyncInit?: (menu: Menu) => Promise<rq.ApiResult>;
  [key: string]: any;
};

export interface MenuItemApiFileCreate extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/file/create';
}

export interface MenuItemApiFileSave extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/file/save';
}

export interface MenuItemApiFileOpen extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/file/open';
}

export interface MenuItemApiFileClose extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/file/close';
}

export type MenuItemApiFile = {
  create: MenuItemApiFileCreate;
  save: MenuItemApiFileSave;
  open: MenuItemApiFileOpen;
  close: MenuItemApiFileClose;
}

export type MenuItemEndpointFile = {
  create: MenuItemApiFileCreate['name'];
  save: MenuItemApiFileSave['name'];
  open: MenuItemApiFileOpen['name'];
  close: MenuItemApiFileClose['name'];
}

export interface MenuItemApiPreviewOpen extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/open';
}

export interface MenuItemApiPreviewUpdate extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/update';
}

export type MenuItemApiPreview = {
  open: MenuItemApiPreviewOpen;
  update: MenuItemApiPreviewUpdate;
}

export type MenuItemEndpointPreview = {
  open: MenuItemApiPreviewOpen['name'];
  update: MenuItemApiPreviewUpdate['name'];
}

export type PreviewTypes = 'slide' | 'lesson' | 'module' | 'project';

export interface MenuItemApiOutlineAddSlide extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/slide/add';
}

export interface MenuItemApiOutlineDuplicateSlide extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/slide/duplicate';
}

export interface MenuItemApiOutlineRenameSlide extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/slide/rename';
}

export interface MenuItemApiOutlineRemoveSlide extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/slide/remove';
}

export interface MenuItemApiOutlineAddLesson extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/lesson/add';
}

export interface MenuItemApiOutlineAddModule extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/outline/module/add';
}

export type MenuItemApiOutline = {
  addSlide: MenuItemApiOutlineAddSlide;
  duplicateSlide: MenuItemApiOutlineDuplicateSlide;
  renameSlide: MenuItemApiOutlineRenameSlide;
  removeSlide: MenuItemApiOutlineRemoveSlide;
  addLesson: MenuItemApiOutlineAddLesson;
  addModule: MenuItemApiOutlineAddModule;
};

export type MenuItemEndpointOutline = {
  addSlide: MenuItemApiOutlineAddSlide['name'];
  duplicateSlide: MenuItemApiOutlineDuplicateSlide['name'];
  renameSlide: MenuItemApiOutlineRenameSlide['name'];
  removeSlide: MenuItemApiOutlineRemoveSlide['name'];
  addLesson: MenuItemApiOutlineAddLesson['name'];
  addModule: MenuItemApiOutlineAddModule['name'];
};

export interface MenuItemApiPublishExport extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/publish';
}

export interface MenuItemApiPublishExportQuick extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/publish/quick';
}

export type MenuItemApiPublish = {
  publish: MenuItemApiPublishExport;
  publishQuick: MenuItemApiPublishExportQuick;
};

export type MenuItemEndpointPublish = {
  publish: MenuItemApiPublishExport['name'];
  publishQuick: MenuItemApiPublishExportQuick['name'];
};

export type MenuReqContextMenu = {
  menuItems: Array<ContextMenuItem>;
  position: ContextMenuPosition;
  payload: any;
};

export type MenuReqToggleMenu = {
  id?: Array<string> | string;
  isEnabled?: boolean;
};

export type MenuReqUpdatePreviewMenu = {
  type: PreviewTypes;
};