import { MenuItemConstructorOptions } from 'electron';
import { rq } from '../';

export interface MenuApiContextMenu
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/context-menu';
}

export type MenuApi = Partial<{
  contextMenu: MenuApiContextMenu;
}>;

export type MenuEndpoints = {
  contextMenu: MenuApiContextMenu['name'];
};

export type ContextMenuItem = MenuItemConstructorOptions;

export type ContextMenuPosition = [number, number];
