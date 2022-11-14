import { MenuItemConstructorOptions } from 'electron';
import { Projects } from '../../../../models';

export interface NewResourceItem extends Omit<Projects.ProjectResource, 'type'> {
  isNew: true;
  type?: Projects.AssetType;
}

export interface ExistingResourceItem extends Projects.ProjectResource {
  isNew: false;
}

export type ResourceItem = NewResourceItem | ExistingResourceItem;

export type ContextMenuResult = {
  data: {
    resource: ResourceItem;
  };
  position: [number, number];
  item: MenuItemConstructorOptions;
};
