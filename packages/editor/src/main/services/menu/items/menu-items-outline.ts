import { MenuItemConstructorOptions } from 'electron';

export const outlineMenuItems = (isMac: boolean) => {
  const menuId = 'outline-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: 'Outline',
    submenu: [
      {
        id: `${menuId}-add-slide`,
        label: "Add New Slide",
        accelerator:  "CmdorCtrl+Alt+S",
        enabled: false,
        click: () => {},
      },
      {
        id: `${menuId}-add-lesson`,
        label: "Add New Lesson",
        accelerator: "CmdorCtrl+Alt+L",
        enabled: false,
        click: () => {},
      },
      {
        id: `${menuId}-add-module`,
        label: "Add New Module",
        accelerator: "CmdorCtrl+Alt+M",
        enabled: false,
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-dup-slide`,
        label: "Duplicate Slide",
        accelerator: "CmdorCtrl+Alt+D",
        enabled: false,
        click: () => {},
      },
      {
        id: `${menuId}-rename-slide`,
        label: "Rename Slide",
        accelerator: "CmdorCtrl+Alt+R",
        enabled: false,
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-delete-slide`,
        label: "Delete Slide",
        accelerator: "CmdorCtrl+D",
        enabled: false,
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  outlineMenuItems,
};