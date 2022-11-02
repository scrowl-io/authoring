import { MenuItemConstructorOptions, BrowserWindow } from 'electron';

export const helpMenuItems = (isMac: boolean) => {
  const menuId = 'help-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    role: 'help',
    submenu: [
      {
        id: `${menuId}-reload`,
        label: 'Force Reload',
        accelerator: 'CmdorCtrl+Shift+R',
        click: () => {
          const mainWindow = BrowserWindow.getAllWindows()[0];
          mainWindow.webContents.reloadIgnoringCache();
        },
      },
      {
        id: `${menuId}-dev-tools`,
        label: 'Show Developer Tools',
        accelerator: 'CmdorCtrl+Shift+I',
        click: () => {
          const mainWindow = BrowserWindow.getAllWindows()[0];

          mainWindow.webContents.openDevTools();
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
  helpMenuItems,
};