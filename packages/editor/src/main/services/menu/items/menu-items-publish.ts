import { MenuItemConstructorOptions } from 'electron';
import { MenuItemApiPublish } from '../menu.types';
import { rq } from '../..';

export const create = (isMac: boolean, isRebuild?: boolean) => {
  const menuId = 'publish-menu';
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Publish",
    submenu: [
      {
        id: `${menuId}-advanced`,
        label: "Publish Project",
        enabled: isRebuild ? true : false,
        click: () => {
          rq.send(API.publish.name);
        },
      },
      { type: "separator" },
      {
        id: `${menuId}-quick`,
        label: "Quick Publish",
        accelerator: "CmdorCtrl+Alt+P",
        enabled: isRebuild ? true : false,
        click: () => {
          rq.send(API.publishQuick.name);
        },
      },
    ],
  };

  return template;
};

export const API: MenuItemApiPublish = {
  publish: {
    name: '/publish',
    type: 'send',
  },
  publishQuick: {
    name: '/publish/quick',
    type: 'send',
  },
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export default {
  create,
};