import { MenuItemConstructorOptions } from 'electron';

export const create = (isMac: boolean) => {
  const menuId = 'edit-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Edit",
    submenu: [
      {
        id: `${menuId}-undo`,
        role: 'undo',
        accelerator: 'CmdorCtrl+Z',
        enabled: false,
      },
      {
        id: `${menuId}-redo`,
        role: 'redo',
        accelerator: 'CmdorCtrl+Shift+Z',
        enabled: false,
      },
      {
        type: 'separator',
      },
      {
        id: `${menuId}-cut`,
        role: 'cut',
        accelerator: 'CmdorCtrl+X',
        enabled: false,
      },
      {
        id: `${menuId}-copy`,
        role: 'copy',
        accelerator: 'CmdorCtrl+C',
        enabled: false,
      },
      {
        id: `${menuId}-paste`,
        role: 'paste',
        accelerator: 'CmdorCtrl+V',
        enabled: false,
      },
      {
        id: `${menuId}-delete`,
        role: 'delete',
        enabled: false,
      },
      {
        id: `${menuId}-select-all`,
        role: 'selectAll',
        accelerator: 'CmdorCtrl+A',
        enabled: false,
      },
    ],
  };

  return template;
};

export default {
  create,
};