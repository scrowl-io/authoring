import { Menu, MenuItemConstructorOptions } from 'electron';
import { MenuItemProps } from './menu.types';
import * as menus from './items';
import { rq } from '../';

export const menuItems = menus;

export const rebuildMenu = () => {
  return new Promise<rq.ApiResult>((resolve) => {
    const isMac = process.platform === 'darwin';
    const isRebuild = true;
    const appMenu: MenuItemConstructorOptions = { role: 'appMenu' };
    const _menuItems = menus as {[key: string]: MenuItemProps};
    const template = [appMenu];
    const menuItemInits: Array<MenuItemProps['asyncInit']> = [];
    const menuItemPromises: Array<Promise<rq.ApiResult>> = [];

    for (const [menuKey, menuItem] of Object.entries(_menuItems)) {
      if (menuItem.create) {
        template.push(menuItem.create(isMac, isRebuild));
      }
  
      if (menuItem.asyncInit) {
        menuItemInits.push(menuItem.asyncInit);
      }
    }

    const menu = Menu.buildFromTemplate(template);

    menuItemInits.forEach((init: MenuItemProps['asyncInit']) => {
      if (!init) {
        return;
      }
  
      menuItemPromises.push(init(menu));
    });
  
    Promise.allSettled(menuItemPromises).then(() => {
      Menu.setApplicationMenu(menu);
      resolve({
        error: false,
        data: {
          init: true,
        },
      });
    });
  });
};

export const createMenu = () => {
  const isMac = process.platform === 'darwin';
  const appMenu: MenuItemConstructorOptions = { role: 'appMenu' };
  const _menuItems = menus as {[key: string]: MenuItemProps};
  const template = [appMenu];
  const menuItemInits: Array<MenuItemProps['asyncInit']> = [];
  const menuItemPromises: Array<Promise<rq.ApiResult>> = [];

  for (const [menuKey, menuItem] of Object.entries(_menuItems)) {
    if (menuItem.create) {
      template.push(menuItem.create(isMac, false));
    }

    if (menuItem.register) {
      menuItem.register();
    }

    if (menuItem.asyncInit) {
      menuItemInits.push(menuItem.asyncInit);
    }
  }
  
  const menu = Menu.buildFromTemplate(template);

  menuItemInits.forEach((init: MenuItemProps['asyncInit']) => {
    if (!init) {
      return;
    }

    menuItemPromises.push(init(menu));
  });

  Promise.allSettled(menuItemPromises).then(() => {
    Menu.setApplicationMenu(menu);
  });
};

export default {
  menuItems,
  createMenu,
  rebuildMenu,
};
