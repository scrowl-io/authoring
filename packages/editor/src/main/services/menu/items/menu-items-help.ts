import { MenuItemConstructorOptions } from 'electron';
import { log } from '../../';
const { BrowserWindow } = require('electron');

const isDevEnv = process.env.NODE_ENV === 'development';

export const create = (isMac: boolean) => {
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

          if (isDevEnv) {
            const mainWindow = BrowserWindow.getAllWindows()[0];
            mainWindow.webContents.reloadIgnoringCache();
          } else {
            const mainWindow = BrowserWindow.getAllWindows()[0];
            mainWindow.webContents.reloadIgnoringCache();
            // browserWindow?.reload();
          }
        },
      },
      {
        id: `${menuId}-dev-tools`,
        label: 'Show Developer Tools',
        accelerator: 'CmdorCtrl+Shift+I',
        click: (menuItem, browserWindow, ev) => {
          log.info('menu event: show dev tools', ev);
          // browserWindow?.webContents.toggleDevTools();
          const mainWindow = BrowserWindow.getAllWindows()[0];
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
