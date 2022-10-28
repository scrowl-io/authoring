import { MenuItemConstructorOptions } from 'electron';

export const publishMenuItems = (isMac: boolean) => {
  const menuId = 'publish-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Publish",
    enabled: false,
    submenu: [
      {
        id: `${menuId}-advanced`,
        label: "Publish Project",
        click: () => {},
      },
      { type: "separator" },
      {
        id: `${menuId}-quick`,
        label: "Quick Publish",
        enabled: false,
        accelerator: "CmdorAlt+P",
        click: () => {},
      },
    ],
  };

  return template;
};

export default {
  publishMenuItems,
};