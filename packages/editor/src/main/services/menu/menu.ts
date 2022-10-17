import {
  Menu,
  BrowserWindow,
  IpcMainInvokeEvent
} from 'electron';
import { rq } from '../';
import { MenuApi, ContextMenuItem, ContextMenuPosition } from './menu.types';

export const contextMenu = (ev: rq.RequestEvent, items: Array<ContextMenuItem>, position: ContextMenuPosition) => {
  return new Promise<rq.ApiResult>((resolve) => {
    if (!items || !items.length) {
      resolve({
        error: true,
        message: 'Unable to create context menu: Items are required',
        data: {
          items,
          position,
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

export const API: MenuApi = {
  contextMenu: {
    name: '/context-menu',
    type: 'invoke',
    fn: contextMenu,
  },
};

export const init = () => {
  rq.registerEndpointAll(API);
};

export default {
  contextMenu,
  API,
  init,
};
