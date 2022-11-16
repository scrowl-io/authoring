import { rq } from '../services';

export interface WindowApiUnsaved
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/window/unsaved/send';
}

export interface WindowApiOnUnsaved
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/window/unsaved/on';
}

export type WindowApi = {
  unsaved: WindowApiUnsaved;
  onUnsaved: WindowApiOnUnsaved;
};

export type WindowEndpoints = {
  unsaved: WindowApiUnsaved['name'];
  onUnsaved: WindowApiOnUnsaved['name'];
};