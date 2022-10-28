import { MenuItemConstructorOptions } from 'electron';

export const fileMenuItems = (isMac: boolean) => {
  const menuId = 'file-menu';
  const template = {
    id: menuId,
    label: 'File',
    submenu: [
      {
        id: `${menuId}-create`,
        label: "New Project",
        accelerator: "CmdorCtrl+N",
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-open`,
        label: "Open...",
        accelerator: "CmdorCtrl+O",
        click: () => {},
      },
      {
        id: `${menuId}-open-recent`,
        label: "Open Recent",
        submenu: [],
      },
  
      { type: "separator" },
      {
        id: `${menuId}-save`,
        label: "Save",
        accelerator: "CmdorCtrl+S",
        enabled: false,
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-close`,
        label: "Close Project",
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
