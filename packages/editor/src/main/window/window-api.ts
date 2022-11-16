import { WindowApi } from './';
import { rq } from '../services';

export const unsaved = () => {
  rq.send(API.unsaved.name);
};

export const onUnsaved = (listener) => {
  rq.registerEndpoint({
    ...API.onUnsaved,
    fn: listener,
  });
};

export const offUnsaved = () => {
  rq.removeListener(API.onUnsaved.name);
};

export const API: WindowApi = {
  unsaved: {
    name: '/window/unsaved/send',
    type: 'send',
  },
  onUnsaved: {
    name: '/window/unsaved/on',
    type: 'on',
  }
};

export const init = () => {
  rq.registerEndpoint(API.unsaved);
}

export default {
  unsaved,
  onUnsaved,
}