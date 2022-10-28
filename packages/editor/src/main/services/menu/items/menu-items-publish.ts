import { MenuItemConstructorOptions } from 'electron';

export const publishMenuItems = (isMac: boolean) => {
  const menuId = 'publish-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Publish",
    submenu: [
      {
        id: `${menuId}-advanced`,
        label: "Publish Project",
        enabled: false,
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-quick`,
        label: "Quick Publish",
        accelerator: "CmdorCtrl+Alt+P",
        enabled: false,
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  publishMenuItems,
};