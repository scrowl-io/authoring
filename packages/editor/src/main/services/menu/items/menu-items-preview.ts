import { MenuItemConstructorOptions, MenuItem } from 'electron';
import { MenuItemApiPreview } from '../menu.types';
import { rq } from '../..';

export const API: MenuItemApiPreview = {
  open: {
    name: '/preview/open',
    type: 'send',
  },
};

export const create = (isMac: boolean) => {
  const menuId = 'preview-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Preview",
    submenu: [
      {
        id: `${menuId}-open`,
        label: 'Preview...',
        accelerator: 'CmdorCtrl+Shift+P',
        click: (ev) => {
          let selectedItem: MenuItem | undefined = undefined;

          for (var i = 0,  ii = ev.menu.items.length; i < ii; i++) {
            if (ev.menu.items[i].type === 'radio' && ev.menu.items[i].checked) {
              selectedItem = ev.menu.items[i];
              break;
            }
          }

          if (!selectedItem) {
            return;
          }

          rq.send(API.open.name, selectedItem.id.replace(`${menuId}-`, ''));
        },
      },
      { type: "separator" },
      {
        id: `${menuId}-slide`,
        type: "radio",
        label: "Current Slide",
        checked: true,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'slide');
        },
      },
      {
        id: `${menuId}-lesson`,
        type: "radio",
        label: "Current Lesson",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'lesson');
        },
      },
      {
        id: `${menuId}-module`,
        type: "radio",
        label: "Current Module",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'module');
        },
      },
      {
        id: `${menuId}-project`,
        type: "radio",
        label: "Entire Project",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'project');
        },
      },
    ],
  };

  return template;
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export default {
  register,
  create,
};