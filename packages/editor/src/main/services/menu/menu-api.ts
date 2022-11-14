import {
  Menu,
  BrowserWindow,
  IpcMainInvokeEvent
} from 'electron';
import { rq } from '../';
import { MenuApi, ContextMenuItem, ContextMenuPosition } from './menu.types';

export const contextMenu = (ev: rq.RequestEvent, items: Array<ContextMenuItem>, position: ContextMenuPosition, data: any) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!items || !items.length) {
      resolve({
        error: true,
        message: 'Unable to create context menu: Items are required',
        data: {
          items,
          position,
          data,
        }
      });
      return;
    }

    const template = items.map((item: ContextMenuItem) => {
      if (item.type) {
        return { type: item.type };
      }

      const action: ContextMenuItem = {
        ...item,
        click: () => {
          resolve({
            error: false,
            data: {
              item,
              position,
              data,
            },
          });
        }
      };

      if (item.hasOwnProperty('checked')) {
        action.type = 'checkbox';
      }

      if (item.icon) {
        // TODO: get asset path
      }

      return action;
    });
    const menu = Menu.buildFromTemplate(template);
    const event = ev as IpcMainInvokeEvent;
    const window = BrowserWindow.fromWebContents(event.sender);

    if (!window) {
      resolve({
        error: true,
        message: 'Unable to create context menu: Window not found',
        data: {
          items,
          position,
        }
      });
      return;
    }

    if (!position || position.length !== 2) {
      menu.popup({ window });
      return;
    }

    const [x, y] = position;

    menu.popup({ window, x, y, });
  });
};

export const toggleMenu = (ev: IpcMainInvokeEvent, id?: Array<string> | string, isEnabled?: boolean) => {
  const setMenu = (appMenu, menuId: string) => {
    try {
      const menuItem = appMenu.getMenuItemById(menuId);

      if (!menuItem) {
        return {
          error: true,
          message: `Unable to toggle menu: ${menuId} - menu not found`,
        };
      }

      if (isEnabled !== null && isEnabled !== undefined) {
        menuItem.enabled = isEnabled;
      } else {
        menuItem.enabled = !menuItem.enabled;
      }

      return {
        error: false,
        data: {
          menu: {
            id: menuItem.id,
            enabled: menuItem.enabled,
          },
        }
      };
    } catch (e) {
      return {
        error: true,
        message: `Failed to toggle item: ${menuId}`,
        data: {
          trace: e,
        },
      };
    }
  }

  return new Promise<rq.ApiResult>(resolve => {
    try {
      if (!id) {
        resolve({
          error: true,
          message: 'Unable to toggle menu - menu id required',
        });
        return;
      }

      const appMenu = Menu.getApplicationMenu();
  
      if (!appMenu) {
        resolve({
          error: true,
          message: `Unable to toggle menu: ${id} - menu not initialized`,
        });
        return;
      }

      let result;

      const setMenus = (menuId) => {
        return setMenu(appMenu, menuId);
      };
  
      if (Array.isArray(id)) {
        result = id.map(setMenus);
      } else {
        result = setMenu(appMenu, id);
      }

      resolve({
        error: false,
        data: {
          id,
          result,
        },
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to toggle menu',
        data: {
          id,
          isEnabled,
          trace: e,
        },
      })
    }
  });
};

export const API: MenuApi = {
  contextMenu: {
    name: '/context-menu',
    type: 'invoke',
    fn: contextMenu,
  },
  toggleMenu: {
    name: '/toggle-menu',
    type: 'invoke',
    fn: toggleMenu,
  },
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export default {
  contextMenu,
  API,
  register,
};
