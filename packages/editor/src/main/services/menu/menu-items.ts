import { Menu, MenuItemConstructorOptions } from 'electron';
import { MenuItemProps } from './menu.types';
import * as menus from './items';

export const createMenu = () => {
  const isMac = process.platform === 'darwin';
  const appMenu: MenuItemConstructorOptions = { role: 'appMenu' };
  const menuItems = menus as {[key: string]: MenuItemProps};
  const template = [appMenu];

  for (const [menuKey, menuItem] of Object.entries(menuItems)) {
    if (menuItem.create) {
      template.push(menuItem.create(isMac));
    }

    if (menuItem.register) {
      menuItem.register();
    }
  }
  
  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};

export default {
  createMenu,
};
