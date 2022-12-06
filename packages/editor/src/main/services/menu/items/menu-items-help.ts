import { MenuItemConstructorOptions } from 'electron';
import { log } from '../../';
const { BrowserWindow } = require('electron');

export const create = (isMac: boolean, isRebuild?: boolean) => {
  const menuId = 'help-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    role: 'help',
    submenu: [
      {
        id: `${menuId}-reload`,
        label: 'Force Reload',
        accelerator: 'CmdorCtrl+Shift+R',
        click: (menuItem, browserWindow, ev) => {
          log.info('menu event: reload window', ev);

          if (!browserWindow) {
            return;
          }

          const mainWindow = BrowserWindow.fromId(browserWindow.id);

          if (!mainWindow) {
            return;
          }

          mainWindow.webContents.reloadIgnoringCache();
        },
      },
      {
        id: `${menuId}-dev-tools`,
        label: 'Show Developer Tools',
        accelerator: 'CmdorCtrl+Shift+I',
        click: (menuItem, browserWindow, ev) => {
          log.info('menu event: show dev tools', ev);

          if (!browserWindow) {
            return;
          }

          const mainWindow = BrowserWindow.fromId(browserWindow.id);

          if (!mainWindow) {
            return;
          }

          mainWindow.webContents.toggleDevTools();
        },
      },
      { type: 'separator' },
      {
        id: `${menuId}-support`,
        label: 'Scrowl Website',
        click: () => {
          const { shell } = require('electron');

          shell.openExternal('https://scrowl.io');
        },
      },
    ],
  };

  return template;
};

export default {
  create,
};
