import { MenuItemConstructorOptions } from 'electron';
import { Projects } from '../../../../models';

export interface NewResourceItem extends Omit<Projects.ProjectResource, 'type'> {
  isNew: true;
  type?: Projects.AssetType;
}

export interface NewGlossaryItem
  extends Omit<Projects.ProjectGlossaryItem, 'type'> {
  isNew: true;
  type?: Projects.AssetType;
}

export interface ExistingResourceItem extends Projects.ProjectResource {
  isNew: false;
}

export interface ExistingGlossaryItem extends Projects.ProjectGlossaryItem {
  isNew: false;
}

export type ResourceItem = NewResourceItem | ExistingResourceItem;

export type GlossaryItem = NewGlossaryItem | ExistingGlossaryItem;

export type ContextMenuResult = {
  data: {
    resource: ResourceItem;
    term: GlossaryItem;
  };
  position: [number, number];
  item: MenuItemConstructorOptions;
};
