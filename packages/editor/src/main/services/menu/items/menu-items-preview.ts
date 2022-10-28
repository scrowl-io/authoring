import { MenuItemConstructorOptions } from 'electron';

export const previewMenuItems = (isMac: boolean) => {
  const menuId = 'preview-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Preview",
    accelerator: "CmdorCtrl+A",
    submenu: [
      {
        id: `${menuId}-slide`,
        type: "checkbox",
        label: "Current Slide",
        checked: false,
        enabled: false,
        click: () => {},
      },
      {
        id: `${menuId}-lesson`,
        type: "checkbox",
        label: "Current Lesson",
        checked: false,
        enabled: false,
        click: () => {},
      },
      {
        id: `${menuId}-module`,
        type: "checkbox",
        label: "Current Module",
        checked: false,
        enabled: false,
        click: () => {},
      },

      { type: "separator" },
      {
        id: `${menuId}-project`,
        type: "checkbox",
        label: "Entire Project",
        checked: false,
        enabled: false,
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  previewMenuItems,
};