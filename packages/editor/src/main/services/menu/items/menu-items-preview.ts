import { MenuItemConstructorOptions } from 'electron';
import { MenuItemApiPreview } from '../menu.types';
import { rq } from '../..';

export const API: MenuItemApiPreview = {
  slide: {
    name: '/preview/slide',
    type: 'send',
  },
  lesson: {
    name: '/preview/lesson',
    type: 'send',
  },
  module: {
    name: '/preview/module',
    type: 'send',
  },
  project: {
    name: '/preview/project',
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
        id: `${menuId}-slide`,
        type: "checkbox",
        label: "Current Slide",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.slide.name);
        },
      },
      {
        id: `${menuId}-lesson`,
        type: "checkbox",
        label: "Current Lesson",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.lesson.name);
        },
      },
      {
        id: `${menuId}-module`,
        type: "checkbox",
        label: "Current Module",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.module.name);
        },
      },

      { type: "separator" },
      {
        id: `${menuId}-project`,
        type: "checkbox",
        label: "Entire Project",
        checked: false,
        enabled: false,
        click: () => {
          rq.send(API.project.name);
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