import {
  ContextMenuItem,
} from '../../../main/services/menu/menu.types';
import { JSON_DATA } from '../requester';

export type {
  MenuEndpoints,
  ContextMenuItem,
  ContextMenuPosition,
  MenuItemEndpointFile,
  MenuItemEndpointPreview,
  PreviewTypes,
  MenuItemEndpointOutline,
  MenuItemEndpointPublish
} from '../../../main/services/menu/menu.types';

export type ContextMenuPayload = {
  menuItems: Array<ContextMenuItem>;
  position: [number, number];
  payload: JSON_DATA;
}
