import { MenuItemConstructorOptions, MenuItem, Menu } from 'electron';
import { MenuItemApiPreview } from '../menu.types';
import { rq, log } from '../..';
import { get as getSettings } from '../../../models/settings';

export const API: MenuItemApiPreview = {
  open: {
    name: '/preview/open',
    type: 'send',
  },
};

const menuId = 'preview-menu';

export const create = (isMac: boolean) => {
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
        type: 'radio',
        label: "Current Slide",
        checked: true,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'slide');
        },
      },
      {
        id: `${menuId}-lesson`,
        type: 'radio',
        label: "Current Lesson",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'lesson');
        },
      },
      {
        id: `${menuId}-module`,
        type: 'radio',
        label: "Current Module",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.open.name, 'module');
        },
      },
      {
        id: `${menuId}-project`,
        type: 'radio',
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

export const loadSettings = () => {
  return new Promise<rq.ApiResult>((resolve) => {
    const internalEvent: rq.RequestEvent = {};

    getSettings(internalEvent, 'previewMode', 'slide').then(resolve);
  });
};

export const asyncInit = (menu: Menu) => {
  return new Promise<rq.ApiResult>((resolve) => {
    loadSettings().then((settingsRes) => {
      if (settingsRes.error) {
        log.error(settingsRes);
        resolve(settingsRes);
        return;
      }

      const previewMode = settingsRes.data.setting;
      const menuItem = menu.getMenuItemById(menuId);

      if (!menuItem || !menuItem.submenu) {
        resolve({
          error: true,
          message: 'Unable to find preview menu',
        });
        return;
      }

      const items = menuItem.submenu.items;
      let selectedItem: MenuItem | undefined = undefined;
      let currentItem: MenuItem | undefined = undefined;
      
      for (var i = 0,  ii = items.length; i < ii; i++) {
        if (items[i].type === 'radio') {
          if (items[i].checked) {
            currentItem = items[i];
          }

          if (items[i].id.replace(`${menuId}-`, '') === previewMode) {
            selectedItem = items[i];
          }
        }

        if (currentItem && selectedItem) {
          break;
        }
      }

      if (!currentItem || !selectedItem) {
        const itemsNotFound = {
          error: true,
          message: 'Unable to find preview mode items',
          data: {
            previewMode,
          },
        };
        log.error(itemsNotFound);
        resolve(itemsNotFound);
        return;
      }

      if (currentItem.id === selectedItem.id) {
        resolve({
          error: false,
          data: {
            previewMode,
          },
        });
        return;
      }

      currentItem.checked = false;
      selectedItem.checked = true;

      resolve({
        error: false,
        data: {
          previewMode,
        },
      });
    });
  });
};

export default {
  register,
  create,
};