import { MenuItemConstructorOptions } from 'electron';

export const windowMenuItems = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "close" }
    ],
  };

  return template;
};

export default {
  windowMenuItems,
};