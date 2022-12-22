import { MenuItemConstructorOptions, MenuItem, Menu } from 'electron';
import { MenuItemApiPreview, PreviewTypes, MenuReqUpdatePreviewMenu } from '../menu.types';
import { rq, log } from '../..';
import { get as getSettings, set as setSetting } from '../../../models/settings';

const menuId = 'preview-menu';

export const create = (isMac: boolean, isRebuild?: boolean) => {
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Preview",
    submenu: [
      {
        id: `${menuId}-open`,
        label: 'Preview...',
        accelerator: 'CmdorCtrl+Shift+P',
        click: (menuItem) => {
          let selectedItem: MenuItem | undefined = undefined;

          for (var i = 0,  ii = menuItem.menu.items.length; i < ii; i++) {
            if (menuItem.menu.items[i].type === 'radio' && menuItem.menu.items[i].checked) {
              selectedItem = menuItem.menu.items[i];
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
        enabled: isRebuild ? true : false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'slide';
          const settingsPayload = {
            key: 'previewMode',
            value: type,
          };

          rq.send(API.open.name, type);
          setSetting(ev, settingsPayload).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-lesson`,
        type: 'radio',
        label: "Current Lesson",
        checked: false,
        enabled: isRebuild ? true : false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'lesson';
          const settingsPayload = {
            key: 'previewMode',
            value: type,
          };

          rq.send(API.open.name, type);
          setSetting(ev, settingsPayload).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-module`,
        type: 'radio',
        label: "Current Module",
        checked: false,
        enabled: isRebuild ? true : false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'module';
          const settingsPayload = {
            key: 'previewMode',
            value: type,
          };

          rq.send(API.open.name, type);
          setSetting(ev, settingsPayload).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-project`,
        type: 'radio',
        label: "Entire Project",
        checked: false,
        enabled: isRebuild ? true : false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'project';
          const settingsPayload = {
            key: 'previewMode',
            value: type,
          };

          rq.send(API.open.name, type);
          setSetting(ev, settingsPayload).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
    ],
  };

  return template;
};

const updateMenuItems = (menu: Menu, previewMode: PreviewTypes): rq.ApiResult => {
  const menuItem = menu.getMenuItemById(menuId);

  if (!menuItem || !menuItem.submenu) {
    return {
      error: true,
      message: 'Unable to find preview menu',
    };
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
    return {
      error: true,
      message: 'Unable to find preview mode items',
      data: {
        previewMode,
      },
    };
  }

  if (currentItem.id === selectedItem.id) {
    return {
      error: false,
      data: {
        previewMode,
      },
    };
  }

  currentItem.checked = false;
  selectedItem.checked = true;

  return {
    error: false,
    data: {
      previewMode,
    },
  };
};

export const updatePreviewMenu = (ev: rq.RequestEvent, req: MenuReqUpdatePreviewMenu) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const menu = Menu.getApplicationMenu();

    if (!menu) {
      resolve({
        error: true,
        message: `Unable to update preview menu - application menu not initialized`,
      });
      return;
    }

    const updateRes = updateMenuItems(menu, req.type);

    resolve(updateRes);
  });
};

export const API: MenuItemApiPreview = {
  open: {
    name: '/preview/open',
    type: 'send',
  },
  update: {
    name: '/preview/update',
    type: 'invoke',
    fn: updatePreviewMenu,
  },
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export const loadSettings = () => {
  return new Promise<rq.ApiResult>((resolve) => {
    const internalEvent: rq.RequestEvent = {};
    const settingsPayload = {
      key: 'previewMode',
      defaultValue: 'slide',
    };

    getSettings(internalEvent, settingsPayload).then(resolve);
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
      const updateRes = updateMenuItems(menu, previewMode);

      resolve(updateRes);
    });
  });
};

export default {
  register,
  create,
};