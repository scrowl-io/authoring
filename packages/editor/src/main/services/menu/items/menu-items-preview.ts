import { MenuItemConstructorOptions } from 'electron';

export const previewMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    label: "Preview",
    enabled: false,
    accelerator: "CmdorCtrl+A",
    submenu: [
      {
        type: "checkbox",
        label: "Current Slide",
        checked: false,
        click: () => {},
      },
      {
        type: "checkbox",
        label: "Current Lesson",
        checked: false,
        click: () => {},
      },
      {
        type: "checkbox",
        label: "Current Module",
        checked: false,
        click: () => {},
      },

      { type: "separator" },
      {
        type: "checkbox",
        label: "Entire Course",
        checked: false,
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  previewMenuItems,
};