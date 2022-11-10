import {
  SystemEndpoints,
  SystemMessageDialogOptions,
  SystemSaveDialogOptions,
  SystemOpenDialogOptions
} from './system.types';
import { rq } from '../../services';

const ENDPOINTS: SystemEndpoints = {
  message: '/system/message',
  save: '/system/save',
  open: '/system/open',
};

export const messageDialog = (options: SystemMessageDialogOptions) => {
  return rq.invoke(ENDPOINTS.message, options);
};

export const saveDialog = (options: SystemSaveDialogOptions) => {
  return rq.invoke(ENDPOINTS.save, options);
};

export const openDialog = (options: SystemOpenDialogOptions) => {
  return rq.invoke(ENDPOINTS.save, options);
};

export default {
  messageDialog,
  saveDialog,
  openDialog,
};
