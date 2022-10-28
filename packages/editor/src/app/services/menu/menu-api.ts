import {
  MenuEndpoints,
  ContextMenuItem,
  ContextMenuPosition
} from './menu.types';
import { rq } from '../../services';

const ENDPOINTS: MenuEndpoints = {
  contextMenu: '/context-menu',
  toggleMenu: '/toggle-menu',
};

export const contextMenu = (items: Array<ContextMenuItem>, position?: ContextMenuPosition) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const menuItemMap = {};
    const menuItems = items.map((item, idx) => {
      const { click, ...data } = item;
      const id = item.id || idx.toString();

      menuItemMap[id] = click;
      data.id = id;
      return data;
    });

    rq.invoke(ENDPOINTS.contextMenu, menuItems, position)
      .then((result) => {
        if (!result.error) {
          const id = result.data.item.id;

          menuItemMap[id](result.data);
        }

        resolve(result);
      }).
      catch((e) => {
        console.error('Context Menu Failed', e);
        resolve({
          error: true,
          message: 'Context Menu Failed',
          data: {
            trace: e,
          },
        });
      });
  });
};

export const toggleMenu = (id: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    rq.invoke(ENDPOINTS.toggleMenu, id).then((result) => {
      resolve(result);
    }).
    catch((e) => {
      console.error('Toggling Menu Failed', e);
      resolve({
        error: true,
        message: 'Context Menu Failed',
        data: {
          trace: e,
        },
      });
    });
  });
};

export default {
  contextMenu,
  toggleMenu,
};
