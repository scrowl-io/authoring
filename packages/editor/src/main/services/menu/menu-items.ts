import { Menu, MenuItemConstructorOptions } from 'electron';
import {
  editMenuItems,
  fileMenuItems,
  helpMenuItems,
  outlineMenuItems,
  previewMenuItems,
  publishMenuItems,
  windowMenuItems
} from './items';

export const createMenu = () => {
  const isMac = process.platform === 'darwin';
  const appMenu: MenuItemConstructorOptions = { role: 'appMenu' };
  const template = [
    appMenu,
    fileMenuItems(isMac),
    editMenuItems(isMac),
    outlineMenuItems(isMac),
    previewMenuItems(isMac),
    publishMenuItems(isMac),
    windowMenuItems(isMac),
    helpMenuItems(isMac),
  ]

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};

export default {
  createMenu,
};
