import { MenuItemConstructorOptions } from 'electron';

export const create = (isMac: boolean) => {
  const menuId = 'window-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "close" }
    ],
  };

  return template;
};

export default {
  create,
};