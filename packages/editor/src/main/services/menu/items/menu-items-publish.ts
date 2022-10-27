import { MenuItemConstructorOptions } from 'electron';

export const publishMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    label: "Publish",
    enabled: false,
    submenu: [
      {
        label: "Publish Course",
        click: () => {},
      },
      { type: "separator" },
      {
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