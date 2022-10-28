import { MenuItemConstructorOptions } from 'electron';

export const outlineMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    label: 'Outline',
    enabled: false,
    submenu: [
      {
        label: "Add New Slide",
        accelerator:  "CmdorCtrl+Alt+S",
        click: () => {},
      },
      {
        label: "Add New Lesson",
        accelerator: "CmdorCtrl+Alt+L",
        click: () => {},
      },
      {
        label: "Add New Module",
        accelerator: "CmdorCtrl+Alt+M",
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Duplicate Slide",
        accelerator: "CmdorCtrl+Alt+D",
        click: () => {},
      },
      {
        label: "Rename Slide",
        accelerator: "CmdorCtrl+Alt+R",
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Delete Slide",
        accelerator: "CmdorCtrl+D",
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  outlineMenuItems,
};