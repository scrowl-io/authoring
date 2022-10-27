import { MenuItemConstructorOptions } from 'electron';

export const fileMenuItems = (isMac: boolean) => {
  const template = {
    label: 'File',
    submenu: [
      {
        label: "New Course",
        accelerator: "CmdorCtrl+N",
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Open...",
        accelerator: "CmdorCtrl+O",
        click: () => {},
      },
      {
        label: "Open Recent",
        submenu: [],
      },
  
      { type: "separator" },
      {
        label: "Save",
        accelerator: "CmdorCtrl+S",
        enabled: false,
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Close Course",
        accelerator: "CmdorCtrl+W",
        enabled: false,
        click: () => {},
      }
    ] as Array<MenuItemConstructorOptions>
  };

  if (isMac) {
    template.submenu.push({ type: 'separator' }, { role: 'quit' });
  }

  return template;
};

export default {
  fileMenuItems,
};
