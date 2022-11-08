import { SystemEndpoints, SystemMessageDialogOptions } from './system.types';
import { rq } from '../../services';

const ENDPOINTS: SystemEndpoints = {
  message: '/system/message',
};

export const messageDialog = (options: SystemMessageDialogOptions) => {
  return rq.invoke(ENDPOINTS.message, options);
};

export default {
  messageDialog,
};
