import { MenuItemConstructorOptions } from 'electron';

export const outlineMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    label: 'Outline',
    enabled: false,
    submenu: [
      {
        label: "Add New Slide",
        enabled: false,
        accelerator:  "CmdorAlt+Shift+S",
        click: () => {},
      },
      {
        label: "Add New Lesson",
        enabled: false,
        accelerator: "CmdorAlt+Shift+L",
        click: () => {},
      },
      {
        label: "Add New Module",
        accelerator: "CmdorAlt+Shift+M",
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Duplicate Slide",
        enabled: false,
        accelerator: "CmdorAlt+D",
        click: () => {},
      },
      {
        label: "Rename Slide",
        enabled: false,
        accelerator: "CmdorAlt+R",
        click: () => {},
      },
      { type: "separator" },
      {
        label: "Delete Slide",
        enabled: false,
        accelerator: "CmdorAlt+Shift+D",
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  outlineMenuItems,
};