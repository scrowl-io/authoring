import {
  Menu,
  BrowserWindow,
  IpcMainInvokeEvent
} from 'electron';
import { rq, log } from '../';
import { MenuApi, ContextMenuItem, MenuReqContextMenu, MenuReqToggleMenu } from './menu.types';

export const contextMenu = (ev: rq.RequestEvent, req: MenuReqContextMenu) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!req.menuItems || !req.menuItems.length) {
      log.error('Unable to create context menu: Items are required', req);
      resolve({
        error: true,
        message: 'Unable to create context menu: Items are required',
        data: req,
      });
      return;
    }

    const template = req.menuItems.map((item: ContextMenuItem) => {
      if (item.type && item.type === 'separator') {
        return { type: item.type };
      }

      const action: ContextMenuItem = {
        ...item,
        click: () => {
          resolve({
            error: false,
            data: {
              item,
              ...req
            },
          });
        }
      };

      if (item.hasOwnProperty('checked') && (!item.type || item.type !== 'radio')) {
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
      log.warn('Unable to create context menu: Window not found', req);
      resolve({
        error: true,
        message: 'Unable to create context menu: Window not found',
        data: req,
      });
      return;
    }

    if (!req.position || req.position.length !== 2) {
      menu.popup({ window });
      return;
    }

    const [x, y] = req.position;

    menu.popup({ window, x, y, });
  });
};

export const toggleMenu = (ev: IpcMainInvokeEvent, req: MenuReqToggleMenu) => {
  const setMenu = (appMenu, menuId: string) => {
    try {
      const menuItem = appMenu.getMenuItemById(menuId);

      if (!menuItem) {
        return {
          error: true,
          message: `Unable to toggle menu: ${menuId} - menu not found`,
        };
      }

      if (req.isEnabled !== null && req.isEnabled !== undefined) {
        menuItem.enabled = req.isEnabled;
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
      if (!req.id) {
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
          message: `Unable to toggle menu: ${req.id} - menu not initialized`,
        });
        return;
      }

      let result;

      const setMenus = (menuId) => {
        return setMenu(appMenu, menuId);
      };
  
      if (Array.isArray(req.id)) {
        result = req.id.map(setMenus);
      } else {
        result = setMenu(appMenu, req.id);
      }

      resolve({
        error: false,
        data: {
          id: req.id,
          result,
        },
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to toggle menu',
        data: {
          id: req.id,
          isEnabled: req.isEnabled,
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
