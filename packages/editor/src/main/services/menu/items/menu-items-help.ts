import { MenuItemConstructorOptions, BrowserWindow } from 'electron';

export const helpMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    role: "help",
    submenu: [
      {
        label: "Force Reload",
        accelerator: "CmdorCtrl+Shift+R",
        click: () => {},
      },
      {
        label: "Show Developer Tools",
        accelerator: "CmdorCtrl+Shift+I",
        click: () => {
          const mainWindow = BrowserWindow.getAllWindows()[0];

          mainWindow.webContents.openDevTools();
        },
      },
      { type: "separator" },
      {
        label: "Scrowl Website",
        click: () => {
          const { shell } = require("electron");

          shell.openExternal("https://scrowl.io");
        },
      },
    ],
  };

  return template;
};

export default {
  helpMenuItems,
};