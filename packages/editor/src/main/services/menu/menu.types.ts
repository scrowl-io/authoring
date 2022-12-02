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
  create?: (isMac: boolean) => MenuItemConstructorOptions;
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

export interface MenuItemApiPreviewSlide extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/slide';
}

export interface MenuItemApiPreviewLesson extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/lesson';
}

export interface MenuItemApiPreviewModule extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/module';
}

export interface MenuItemApiPreviewProject extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/preview/project';
}

export type MenuItemApiPreview = {
  slide: MenuItemApiPreviewSlide;
  lesson: MenuItemApiPreviewLesson;
  module: MenuItemApiPreviewModule;
  project: MenuItemApiPreviewProject;
}

export type MenuItemEndpointPreview = {
  slide: MenuItemApiPreviewSlide['name'];
  lesson: MenuItemApiPreviewLesson['name'];
  module: MenuItemApiPreviewModule['name'];
  project: MenuItemApiPreviewProject['name'];
}
