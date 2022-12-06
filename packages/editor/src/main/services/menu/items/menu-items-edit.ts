import { MenuItemConstructorOptions } from 'electron';

export const create = (isMac: boolean, isRebuild?: boolean) => {
  const menuId = 'edit-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Edit",
    submenu: [
      {
        id: `${menuId}-undo`,
        role: 'undo',
        accelerator: 'CmdorCtrl+Z',
        enabled: isRebuild ? true : false,
      },
      {
        id: `${menuId}-redo`,
        role: 'redo',
        accelerator: 'CmdorCtrl+Shift+Z',
        enabled: isRebuild ? true : false,
      },
      {
        type: 'separator',
      },
      {
        id: `${menuId}-cut`,
        role: 'cut',
        accelerator: 'CmdorCtrl+X',
        enabled: isRebuild ? true : false,
      },
      {
        id: `${menuId}-copy`,
        role: 'copy',
        accelerator: 'CmdorCtrl+C',
        enabled: isRebuild ? true : false,
      },
      {
        id: `${menuId}-paste`,
        role: 'paste',
        accelerator: 'CmdorCtrl+V',
        enabled: isRebuild ? true : false,
      },
      {
        id: `${menuId}-delete`,
        role: 'delete',
        enabled: isRebuild ? true : false,
      },
      {
        id: `${menuId}-select-all`,
        role: 'selectAll',
        accelerator: 'CmdorCtrl+A',
        enabled: isRebuild ? true : false,
      },
    ],
  };

  return template;
};

export default {
  create,
};