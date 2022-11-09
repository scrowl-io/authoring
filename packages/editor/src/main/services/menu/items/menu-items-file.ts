import { MenuItemConstructorOptions } from 'electron';
import { MenuItemApiFile } from '../menu.types';
import { rq } from '../..';

export const API: MenuItemApiFile = {
  create: {
    name: '/file/create',
    type: 'send',
  },
  save: {
    name: '/file/save',
    type: 'send'
  },
  open: {
    name: '/file/open',
    type: 'send',
  },
  close: {
    name: '/file/close',
    type: 'send',
  },
};

export const create = (isMac: boolean) => {
  const menuId = 'file-menu';
  const template = {
    id: menuId,
    label: 'File',
    submenu: [
      {
        id: `${menuId}-create`,
        label: "New Project",
        accelerator: "CmdorCtrl+N",
        click: () => {
          rq.send(API.create.name);
        },
      },
      { type: "separator" },
      {
        id: `${menuId}-open`,
        label: "Open...",
        accelerator: "CmdorCtrl+O",
        click: () => {
          rq.send(API.open.name);
        },
      },
      {
        id: `${menuId}-open-recent`,
        label: "Open Recent",
        submenu: [],
      },
  
      { type: "separator" },
      {
        id: `${menuId}-save`,
        label: "Save",
        accelerator: "CmdorCtrl+S",
        enabled: false,
        click: () => {
          rq.send(API.save.name);
        },
      },
      { type: "separator" },
      {
        id: `${menuId}-close`,
        label: "Close Project",
        accelerator: "CmdorCtrl+W",
        enabled: false,
        click: () => {
          rq.send(API.close.name);
        },
      }
    ] as Array<MenuItemConstructorOptions>
  };

  if (isMac) {
    template.submenu.push({ type: 'separator' }, { role: 'quit' });
  }

  return template;
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export default {
  register,
  create,
};
