import { MenuItemConstructorOptions } from 'electron';
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
